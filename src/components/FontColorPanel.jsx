import { useCVStore } from '../store/cvStore'
import { Check } from 'lucide-react'

export const FONTS = [
  { id: 'default',     label: 'Default',        value: null },
  { id: 'arial',       label: 'Arial',          value: 'Arial, sans-serif' },
  { id: 'barlow',      label: 'Barlow Semi',    value: '"Barlow Semi Condensed", sans-serif' },
  { id: 'courier',     label: 'Courier New',    value: '"Courier New", monospace' },
  { id: 'georgia',     label: 'Georgia',        value: 'Georgia, serif' },
  { id: 'inter',       label: 'Inter',          value: '"Inter", sans-serif' },
  { id: 'roboto',      label: 'Roboto',         value: '"Roboto", sans-serif' },
  { id: 'source-sans', label: 'Source Sans',    value: '"Source Sans 3", sans-serif' },
  { id: 'segoe',       label: 'Segoe UI',       value: '"Segoe UI", sans-serif' },
  { id: 'tahoma',      label: 'Tahoma',         value: 'Tahoma, sans-serif' },
  { id: 'times',       label: 'Times New R.',   value: '"Times New Roman", serif' },
  { id: 'trebuchet',   label: 'Trebuchet MS',   value: '"Trebuchet MS", sans-serif' },
  { id: 'verdana',     label: 'Verdana',        value: 'Verdana, sans-serif' },
]

export const COLORS = [
  { id: 'default',      label: 'Default',           hex: null },
  { id: 'black',        label: 'Black',             hex: '#1a1a1a' },
  { id: 'blue',         label: 'Blue',              hex: '#1a56db' },
  { id: 'red',          label: 'Red',               hex: '#c81e1e' },
  { id: 'orange',       label: 'Orange',            hex: '#d97706' },
  { id: 'green',        label: 'Green',             hex: '#057a55' },
  { id: 'grey',         label: 'Grey',              hex: '#6b7280' },
  { id: 'purple',       label: 'Purple',            hex: '#7e3af2' },
  { id: 'cyan',         label: 'Cyan',              hex: '#0891b2' },
  { id: 'darkblue-inv', label: 'Dark blue inv.',    hex: '#1e3a5f', inverse: true },
  { id: 'black-inv',    label: 'Black inverse',     hex: '#111827', inverse: true },
]

export default function FontColorPanel({ activeTab, setActiveTab, onBack }) {
  const { selectedFont, setFont, selectedColor, setColor } = useCVStore()

  return (
    <div className="flex flex-col h-full">
      <div className="flex gap-1 p-3 border-b border-slate-100 shrink-0">
        <TabBtn active={activeTab === 'fonts'} onClick={() => setActiveTab('fonts')} label="𝐓 Fonts" />
        <TabBtn active={activeTab === 'colors'} onClick={() => setActiveTab('colors')} label="🎨 Colors" />
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        {activeTab === 'fonts' && (
          <div className="grid grid-cols-2 gap-2">
            {FONTS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFont(f.id)}
                className={`relative p-3 rounded-xl border-2 text-left transition-all ${
                  selectedFont === f.id ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300'
                }`}
                style={{ fontFamily: f.value || 'inherit' }}
              >
                <span className="text-sm text-slate-700 block truncate">{f.label}</span>
                {selectedFont === f.id && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <Check size={10} className="text-white" />
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {activeTab === 'colors' && (
          <div className="grid grid-cols-2 gap-2">
            {COLORS.map((c) => (
              <button
                key={c.id}
                onClick={() => setColor(c.id)}
                className={`relative flex items-center gap-2.5 p-3 rounded-xl border-2 transition-all ${
                  selectedColor === c.id ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden"
                  style={{ background: c.hex || '#e5e7eb', border: !c.hex ? '2px dashed #d1d5db' : 'none' }}>
                  {c.inverse && <div className="w-4 h-4 rounded-full bg-white" />}
                </div>
                <span className="text-xs text-slate-700 leading-tight text-left">{c.label}</span>
                {selectedColor === c.id && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <Check size={10} className="text-white" />
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="p-3 border-t border-slate-100 shrink-0">
        <button onClick={onBack}
          className="w-full flex items-center gap-2 text-slate-500 hover:text-slate-800 text-sm py-2 px-3 rounded-lg hover:bg-slate-50 transition-colors">
          ← Back to editor
        </button>
      </div>
    </div>
  )
}

function TabBtn({ active, onClick, label }) {
  return (
    <button onClick={onClick}
      className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-colors ${
        active ? 'bg-slate-200 text-slate-800' : 'text-slate-500 hover:bg-slate-100'
      }`}>
      {label}
    </button>
  )
}

export function getFontValue(selectedFont) {
  const f = FONTS.find(f => f.id === selectedFont)
  return f?.value || null
}

export function getColorHex(selectedColor) {
  const c = COLORS.find(c => c.id === selectedColor)
  return c?.hex ? { hex: c.hex, inverse: !!c.inverse } : null
}
