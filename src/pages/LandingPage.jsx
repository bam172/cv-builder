import { useNavigate } from 'react-router-dom'
import { FileText, Upload, Sparkles, ChevronRight } from 'lucide-react'
import { useCVStore } from '../store/cvStore'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

// Extract text from PDF using pdf.js via CDN
async function extractTextFromPDF(file) {
  const pdfjsLib = await import('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.2.67/pdf.min.mjs')
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.2.67/pdf.worker.min.mjs'

  const arrayBuffer = await file.arrayBuffer()
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise

  let fullText = ''
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const content = await page.getTextContent()
    fullText += content.items.map((item) => item.str).join(' ') + '\n'
  }
  return fullText.trim()
}

// Call our secure Netlify Function (di local: dev server proxy)
async function callExtractAPI(pdfText) {
  // Di local pakai Groq langsung dengan key dari env (VITE_GROQ_API_KEY)
  // Di production pakai Netlify Function yang menyembunyikan key
  const isDev = import.meta.env.DEV
  
  if (isDev) {
    // Local dev: pakai env variable VITE_GROQ_API_KEY di file .env
    const devKey = import.meta.env.VITE_GROQ_API_KEY
    if (!devKey) {
      throw new Error('Buat file .env di folder cv-builder dan isi: VITE_GROQ_API_KEY=gsk_...')
    }
    const PROMPT = buildPrompt(pdfText)
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${devKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: PROMPT }],
        temperature: 0.1,
        max_tokens: 4096,
      }),
    })
    if (!res.ok) {
      const err = await res.json()
      throw new Error(err?.error?.message || `Error ${res.status}`)
    }
    const data = await res.json()
    return data?.choices?.[0]?.message?.content || ''
  }

  // Production: Netlify Function (API key aman di server)
  const res = await fetch('/api/extract-cv', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pdfText }),
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err?.error || `Server error ${res.status}`)
  }
  const data = await res.json()
  return data.text || ''
}

function buildPrompt(pdfText) {
  return `You are a CV data extractor. Extract data from the CV text below and return ONLY a valid JSON object. No markdown, no explanation, no extra text before or after the JSON.

Required JSON structure:
{"name":"","job_title":"","email":"","phone":"","address":"","summary":"","skills":[{"id":1,"name":"skill name","category":"category"}],"experience":[{"id":1,"position":"title","company":"company","startDate":"Mon YYYY","endDate":"Mon YYYY or Present","responsibilities":["task 1","task 2"]}],"education":[{"id":1,"degree":"degree","institution":"school","startDate":"YYYY","endDate":"YYYY","notes":""}],"links":[{"id":1,"label":"label","url":"url"}]}

CV TEXT:
${pdfText.slice(0, 8000)}

IMPORTANT: Return ONLY the JSON object, nothing else.`
}

export default function LandingPage() {
  const navigate = useNavigate()
  const updateCV = useCVStore((s) => s.updateCV)
  const [loading, setLoading] = useState(false)
  const [loadingMsg, setLoadingMsg] = useState('')
  const [error, setError] = useState('')

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0]
      if (!file) return

      setLoading(true)
      setError('')

      try {
        // Step 1: Extract text from PDF in browser
        setLoadingMsg('Membaca PDF...')
        const pdfText = await extractTextFromPDF(file)

        if (!pdfText || pdfText.length < 50) {
          throw new Error('PDF tidak mengandung teks. Pastikan PDF bukan hasil scan gambar.')
        }

        // Step 2: Send to AI
        setLoadingMsg('AI menganalisis CV...')
        const rawText = await callExtractAPI(pdfText)

        // Step 3: Parse JSON
        const clean = rawText
          .replace(/^```json\s*/i, '')
          .replace(/^```\s*/i, '')
          .replace(/\s*```$/i, '')
          .trim()

        console.log('=== RAW RESPONSE ===', rawText.slice(0, 500))

        // Robust JSON extraction — handle various formats Groq might return
        let parsed = null
        const attempts = [
          // 1. Try direct parse of cleaned text
          () => JSON.parse(clean),
          // 2. Find first { to last } 
          () => {
            const start = clean.indexOf('{')
            const end = clean.lastIndexOf('}')
            if (start === -1 || end === -1) throw new Error('No JSON object found')
            return JSON.parse(clean.slice(start, end + 1))
          },
          // 3. Try raw text directly
          () => JSON.parse(rawText.trim()),
          // 4. Find JSON in raw text
          () => {
            const start = rawText.indexOf('{')
            const end = rawText.lastIndexOf('}')
            if (start === -1 || end === -1) throw new Error('No JSON in raw')
            return JSON.parse(rawText.slice(start, end + 1))
          },
        ]

        for (const attempt of attempts) {
          try {
            parsed = attempt()
            if (parsed && parsed.name !== undefined) break
          } catch (e) {
            console.log('Parse attempt failed:', e.message)
          }
        }

        if (!parsed) {
          console.error('All parse attempts failed. Raw response:', rawText)
          throw new Error('AI tidak mengembalikan format yang diharapkan. Coba upload ulang.')
        }

        const normalize = (arr) =>
          (arr || []).map((item, i) => ({
            ...item,
            id: item.id || `gen-${i}-${Date.now()}`,
          }))

        updateCV({
          name: parsed.name || '',
          job_title: parsed.job_title || '',
          email: parsed.email || '',
          phone: parsed.phone || '',
          address: parsed.address || '',
          summary: parsed.summary || '',
          skills: normalize(parsed.skills),
          experience: normalize(parsed.experience).map((e) => ({
            ...e,
            responsibilities: Array.isArray(e.responsibilities) ? e.responsibilities : [],
          })),
          education: normalize(parsed.education),
          links: normalize(parsed.links),
        })

        navigate('/editor')
      } catch (err) {
        console.error(err)
        setError(err.message)
      } finally {
        setLoading(false)
        setLoadingMsg('')
      }
    },
    [updateCV, navigate]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false,
    disabled: loading,
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex flex-col items-center justify-center px-4 py-16">
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm px-4 py-1.5 rounded-full mb-6">
          <Sparkles size={14} />
          CV Builder + AI Extractor
        </div>
        <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
          Buat CV Profesional
          <span className="text-blue-400"> dalam Menit</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-md mx-auto">
          Isi manual atau upload CV lama — AI akan mengekstrak datanya otomatis.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl mb-10">

        {/* Manual */}
        <button
          onClick={() => navigate('/editor')}
          className="group bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-white/10 rounded-2xl p-8 text-left transition-all duration-200"
        >
          <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-5">
            <FileText className="text-blue-400" size={24} />
          </div>
          <h2 className="text-white font-semibold text-xl mb-2">Isi Form Manual</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Isi data profil, pengalaman, pendidikan, dan skill satu per satu. Cocok untuk CV baru.
          </p>
          <div className="flex items-center gap-1 text-blue-400 text-sm mt-5 group-hover:gap-2 transition-all">
            Mulai <ChevronRight size={16} />
          </div>
        </button>

        {/* AI Upload */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center mb-5">
            <Upload className="text-teal-400" size={24} />
          </div>
          <h2 className="text-white font-semibold text-xl mb-1">Upload CV PDF</h2>
          <p className="text-slate-500 text-xs mb-5 flex items-center gap-2">
            AI akan mengisi form secara otomatis
            <span className="bg-teal-500/20 text-teal-400 text-xs px-2 py-0.5 rounded-full">Gratis</span>
          </p>

          {error && (
            <div className="mb-4 text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 leading-relaxed">
              {error}
            </div>
          )}

          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
              loading
                ? 'border-teal-500/40 bg-teal-500/5 cursor-wait'
                : isDragActive
                  ? 'border-teal-400 bg-teal-500/10'
                  : 'border-white/15 hover:border-teal-500/50 hover:bg-white/5'
            }`}
          >
            <input {...getInputProps()} />
            {loading ? (
              <div className="text-teal-400">
                <div className="animate-spin w-6 h-6 border-2 border-teal-400 border-t-transparent rounded-full mx-auto mb-3" />
                <p className="text-sm font-medium">{loadingMsg || 'Memproses...'}</p>
              </div>
            ) : (
              <div>
                <Upload className="text-slate-500 mx-auto mb-3" size={28} />
                <p className="text-slate-300 text-sm font-medium">
                  {isDragActive ? 'Lepas file di sini...' : 'Drag & drop atau klik untuk pilih'}
                </p>
                <p className="text-slate-600 text-xs mt-1.5">Format PDF • Maks 10MB</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <p className="text-slate-600 text-xs">
        Data tersimpan di browser lokal. Tidak ada server yang menyimpan CV kamu.
      </p>
    </div>
  )
}
