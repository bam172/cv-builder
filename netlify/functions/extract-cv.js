// Netlify Function — proxy ke Groq API
// API key tersimpan aman di environment variable Netlify, tidak terlihat user

export default async (request) => {
  // Only allow POST
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const GROQ_API_KEY = process.env.GROQ_API_KEY
  if (!GROQ_API_KEY) {
    return new Response(JSON.stringify({ error: 'Server tidak terkonfigurasi.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const { pdfText } = await request.json()

    if (!pdfText || pdfText.length < 50) {
      return new Response(JSON.stringify({ error: 'Teks PDF terlalu pendek atau kosong.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const PROMPT = `Ekstrak semua data dari teks CV/resume berikut dan kembalikan HANYA sebagai JSON valid (tanpa markdown, tanpa penjelasan) dengan struktur:
{
  "name": "nama lengkap",
  "job_title": "jabatan/title",
  "email": "email",
  "phone": "nomor telepon",
  "address": "alamat",
  "summary": "ringkasan profesional",
  "skills": [{"id": 1, "name": "nama skill", "category": "kategori"}],
  "experience": [{"id": 1, "position": "jabatan", "company": "perusahaan", "startDate": "bulan tahun", "endDate": "bulan tahun atau Present", "responsibilities": ["tanggung jawab"]}],
  "education": [{"id": 1, "degree": "gelar", "institution": "institusi", "startDate": "tahun", "endDate": "tahun", "notes": ""}],
  "links": [{"id": 1, "label": "label", "url": "url"}]
}
Kembalikan HANYA JSON.

Teks CV:
${pdfText.slice(0, 8000)}`

    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: PROMPT }],
        temperature: 0.1,
        max_tokens: 4096,
      }),
    })

    if (!groqRes.ok) {
      const err = await groqRes.json()
      throw new Error(err?.error?.message || `Groq error ${groqRes.status}`)
    }

    const groqData = await groqRes.json()
    const text = groqData?.choices?.[0]?.message?.content || ''

    return new Response(JSON.stringify({ text }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

export const config = { path: '/api/extract-cv' }
