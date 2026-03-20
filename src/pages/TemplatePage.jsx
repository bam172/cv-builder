import { useNavigate } from 'react-router-dom'
import { useCVStore } from '../store/cvStore'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'

export const TEMPLATES = [
  { id: 'modern-sidebar',       name: 'Modern Sidebar',        description: 'Sidebar biru, konten kanan. Classic & profesional.',    color: '#49a2bd', font: 'Tinos',      layout: 'sidebar-left' },
  { id: 'simple-timeline',      name: 'Simple Timeline',       description: 'Satu kolom, tanggal di kiri. Rapi & mudah dibaca.',     color: '#222',    font: 'Tinos',      layout: 'single' },
  { id: 'navy-sidebar',         name: 'Navy Right',            description: 'Main kiri lebar, sidebar navy di kanan.',               color: '#12294a', font: 'Arial',      layout: 'sidebar-right' },
  { id: 'forest-sidebar',       name: 'Forest Green',          description: 'Sidebar hijau gelap, foto bulat, elegan.',              color: '#214c41', font: 'Barlow',     layout: 'sidebar-left' },
  { id: 'slate-sidebar',        name: 'Slate Header',          description: 'Header abu penuh lebar, sidebar abu muda.',             color: '#5b6b79', font: 'Tinos',      layout: 'header-full' },
  { id: 'inter-clean',          name: 'Inter Clean',           description: 'Satu kolom bersih, dates di kiri, modern.',             color: '#1a1a2e', font: 'Inter',      layout: 'single' },
  { id: 'merriweather-elegant', name: 'Merriweather Elegant',  description: 'Banner grey per section, dotted dividers, elegan.',     color: '#333',    font: 'Merriweather', layout: 'single' },
  { id: 'nunito-modern',        name: 'Nunito Modern',         description: 'Sidebar dashed, skill pills, blob kuning, playful.',    color: '#214c41', font: 'Nunito',     layout: 'sidebar-left' },
  { id: 'classic',              name: 'Classic Clean',         description: 'Satu kolom klasik. Cocok semua industri.',              color: '#2d4a8a', font: 'Tinos',      layout: 'single' },
  { id: 'minimal',              name: 'Minimal Dark',          description: 'Header gelap, konten terang. Tampil beda.',             color: '#1e293b', font: 'Tinos',      layout: 'header-full' },
  { id: 'orange-bold',          name: 'Orange Bold',           description: 'Header orange, sidebar gelap, foto bulat. Bold & modern.',  color: '#ef6c00', font: 'Lato',       layout: 'sidebar-left' },
]

export default function TemplatePage() {
  const navigate = useNavigate()
  const { selectedTemplate, setTemplate } = useCVStore()

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center gap-4">
        <button onClick={() => navigate('/form')} className="flex items-center gap-2 text-slate-400 hover:text-slate-700 text-sm transition-colors">
          <ArrowLeft size={16} /> Kembali ke Form
        </button>
        <span className="text-slate-300">|</span>
        <h1 className="text-sm font-semibold text-slate-700">Pilih Template</h1>
      </header>

      <main className="max-w-6xl mx-auto py-12 px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Pilih Template CV</h2>
          <p className="text-slate-500">{TEMPLATES.length} template. Klik sekali untuk pilih · <strong>Klik 2x</strong> untuk langsung ke editor.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-10">
          {TEMPLATES.map((t) => (
            <div
              key={t.id}
              onClick={() => setTemplate(t.id)}
              onDoubleClick={() => { setTemplate(t.id); navigate('/editor') }}
              title="Klik 2x untuk langsung ke editor"
              className={`cursor-pointer rounded-2xl border-2 overflow-hidden transition-all ${
                selectedTemplate === t.id
                  ? 'border-blue-500 shadow-lg shadow-blue-100 scale-[1.02]'
                  : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
              }`}
            >
              {/* Mini preview */}
              <MiniPreview template={t} />
              <div className="p-3 bg-white">
                <div className="flex items-center justify-between mb-0.5">
                  <h3 className="font-semibold text-slate-800 text-sm">{t.name}</h3>
                  {selectedTemplate === t.id && (
                    <span className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check size={10} className="text-white" />
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 leading-tight">{t.description}</p>
                <div className="flex items-center gap-1.5 mt-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: t.color }} />
                  <span className="text-xs text-slate-400">{t.font}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => navigate('/editor')}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8 py-3.5 font-semibold transition-colors"
          >
            Lanjut ke Editor <ArrowRight size={18} />
          </button>
        </div>
      </main>
    </div>
  )
}

function MiniPreview({ template: t }) {
  const c = t.color
  const layouts = {
    'sidebar-left': (
      <div className="h-40 flex">
        <div className="w-1/3 h-full" style={{ background: c }} />
        <div className="flex-1 bg-white p-2">
          <div className="h-2 rounded mb-1" style={{ background: c, width: '70%' }} />
          <div className="h-1 bg-slate-200 rounded mb-2" style={{ width: '45%' }} />
          <div className="h-1 bg-slate-100 rounded mb-1" />
          <div className="h-1 bg-slate-100 rounded mb-1" style={{ width: '80%' }} />
          <div className="h-1 bg-slate-100 rounded mb-3" style={{ width: '90%' }} />
          <div className="h-1 rounded mb-1" style={{ background: c, width: '40%', opacity: 0.7 }} />
          <div className="h-1 bg-slate-100 rounded mb-1" style={{ width: '70%' }} />
          <div className="h-1 bg-slate-100 rounded" style={{ width: '60%' }} />
        </div>
      </div>
    ),
    'sidebar-right': (
      <div className="h-40 flex">
        <div className="flex-1 bg-white p-2">
          <div className="h-2 rounded mb-1" style={{ background: c, width: '70%' }} />
          <div className="h-1 bg-slate-200 rounded mb-2" style={{ width: '45%' }} />
          <div className="h-1 bg-slate-100 rounded mb-1" />
          <div className="h-1 bg-slate-100 rounded mb-1" style={{ width: '80%' }} />
        </div>
        <div className="w-1/3 h-full" style={{ background: c }} />
      </div>
    ),
    'header-full': (
      <div className="h-40">
        <div className="h-12 flex items-end px-3 pb-2" style={{ background: c }}>
          <div>
            <div className="h-2 rounded bg-white/80 mb-1" style={{ width: '80px' }} />
            <div className="h-1 rounded bg-white/50" style={{ width: '50px' }} />
          </div>
        </div>
        <div className="bg-white p-2">
          <div className="h-1 bg-slate-100 rounded mb-1" />
          <div className="h-1 bg-slate-100 rounded mb-2" style={{ width: '80%' }} />
          <div className="h-1 rounded mb-1" style={{ background: c, width: '40%', opacity: 0.6 }} />
          <div className="h-1 bg-slate-100 rounded mb-1" style={{ width: '70%' }} />
          <div className="h-1 bg-slate-100 rounded" style={{ width: '60%' }} />
        </div>
      </div>
    ),
    single: (
      <div className="h-40 bg-white p-3">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-full bg-slate-200" />
          <div>
            <div className="h-2 rounded" style={{ background: c, width: '80px' }} />
            <div className="h-1 bg-slate-200 rounded mt-1" style={{ width: '50px' }} />
          </div>
        </div>
        <div className="h-px mb-2 bg-slate-200" />
        <div className="h-1 bg-slate-100 rounded mb-1" />
        <div className="h-1 bg-slate-100 rounded mb-2" style={{ width: '85%' }} />
        <div className="h-1 rounded mb-1" style={{ background: c, width: '40%', opacity: 0.6 }} />
        <div className="h-1 bg-slate-100 rounded mb-1" style={{ width: '70%' }} />
        <div className="h-1 bg-slate-100 rounded" style={{ width: '60%' }} />
      </div>
    ),
  }
  return layouts[t.layout] || layouts['single']
}
