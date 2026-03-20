import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCVStore } from '../store/cvStore'
import {
  User, Briefcase, GraduationCap, Zap, Link, ArrowRight, ArrowLeft, Plus, Trash2,
} from 'lucide-react'

const SECTIONS = [
  { id: 'profile', label: 'Profil', icon: User },
  { id: 'experience', label: 'Pengalaman', icon: Briefcase },
  { id: 'education', label: 'Pendidikan', icon: GraduationCap },
  { id: 'skills', label: 'Skills', icon: Zap },
  { id: 'links', label: 'Links', icon: Link },
]

export default function FormPage() {
  const navigate = useNavigate()
  const [active, setActive] = useState('profile')
  const {
    cvData, updateCV,
    addSkill, updateSkill, removeSkill,
    addExperience, updateExperience, removeExperience,
    addEducation, updateEducation, removeEducation,
    addLink, updateLink, removeLink,
  } = useCVStore()

  const inputCls =
    'w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent'
  const textareaCls = inputCls + ' resize-none'
  const labelCls = 'block text-xs font-medium text-slate-500 mb-1'

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar nav */}
      <aside className="w-56 bg-white border-r border-slate-200 flex flex-col py-8 px-4 shrink-0">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-slate-400 hover:text-slate-700 text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={16} /> Kembali
        </button>
        <h1 className="text-sm font-bold text-slate-800 mb-6 px-2">Edit CV</h1>
        <nav className="flex flex-col gap-1">
          {SECTIONS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                active === id
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </nav>
        <div className="mt-auto">
          <button
            onClick={() => navigate('/templates')}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 py-3 text-sm font-semibold transition-colors"
          >
            Pilih Template <ArrowRight size={16} />
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto py-10 px-8">
        <div className="max-w-2xl mx-auto">

          {/* ── PROFILE ── */}
          {active === 'profile' && (
            <Section title="Informasi Profil">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className={labelCls}>Nama Lengkap</label>
                  <input className={inputCls} value={cvData.name} onChange={(e) => updateCV({ name: e.target.value })} />
                </div>
                <div className="col-span-2">
                  <label className={labelCls}>Jabatan / Job Title</label>
                  <input className={inputCls} value={cvData.job_title} onChange={(e) => updateCV({ job_title: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>Email</label>
                  <input className={inputCls} value={cvData.email} onChange={(e) => updateCV({ email: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>Telepon</label>
                  <input className={inputCls} value={cvData.phone} onChange={(e) => updateCV({ phone: e.target.value })} />
                </div>
                <div className="col-span-2">
                  <label className={labelCls}>Alamat</label>
                  <input className={inputCls} value={cvData.address} onChange={(e) => updateCV({ address: e.target.value })} />
                </div>
                <div className="col-span-2">
                  <label className={labelCls}>Ringkasan Profesional</label>
                  <textarea className={textareaCls} rows={5} value={cvData.summary} onChange={(e) => updateCV({ summary: e.target.value })} />
                </div>
              </div>
            </Section>
          )}

          {/* ── EXPERIENCE ── */}
          {active === 'experience' && (
            <Section title="Pengalaman Kerja">
              {cvData.experience.map((exp, idx) => (
                <div key={exp.id} className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-4">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                      Pengalaman #{idx + 1}
                    </span>
                    <button onClick={() => removeExperience(exp.id)} className="text-red-400 hover:text-red-600">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelCls}>Jabatan</label>
                      <input className={inputCls} value={exp.position} onChange={(e) => updateExperience(exp.id, 'position', e.target.value)} />
                    </div>
                    <div>
                      <label className={labelCls}>Perusahaan</label>
                      <input className={inputCls} value={exp.company} onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} />
                    </div>
                    <div>
                      <label className={labelCls}>Mulai (cth: Jan 2022)</label>
                      <input className={inputCls} value={exp.startDate} onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)} />
                    </div>
                    <div>
                      <label className={labelCls}>Selesai (atau "Present")</label>
                      <input className={inputCls} value={exp.endDate} onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)} />
                    </div>
                    <div className="col-span-2">
                      <label className={labelCls}>Tanggung Jawab (satu per baris)</label>
                      <textarea
                        className={textareaCls}
                        rows={4}
                        value={exp.responsibilities.join('\n')}
                        onChange={(e) => updateExperience(exp.id, 'responsibilities', e.target.value.split('\n'))}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <AddButton onClick={addExperience} label="Tambah Pengalaman" />
            </Section>
          )}

          {/* ── EDUCATION ── */}
          {active === 'education' && (
            <Section title="Pendidikan">
              {cvData.education.map((edu, idx) => (
                <div key={edu.id} className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-4">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                      Pendidikan #{idx + 1}
                    </span>
                    <button onClick={() => removeEducation(edu.id)} className="text-red-400 hover:text-red-600">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelCls}>Gelar / Jenjang</label>
                      <input className={inputCls} value={edu.degree} onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} />
                    </div>
                    <div>
                      <label className={labelCls}>Institusi</label>
                      <input className={inputCls} value={edu.institution} onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)} />
                    </div>
                    <div>
                      <label className={labelCls}>Tahun Masuk</label>
                      <input className={inputCls} value={edu.startDate} onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)} />
                    </div>
                    <div>
                      <label className={labelCls}>Tahun Lulus</label>
                      <input className={inputCls} value={edu.endDate} onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)} />
                    </div>
                    <div className="col-span-2">
                      <label className={labelCls}>Keterangan (opsional)</label>
                      <input className={inputCls} value={edu.notes} onChange={(e) => updateEducation(edu.id, 'notes', e.target.value)} />
                    </div>
                  </div>
                </div>
              ))}
              <AddButton onClick={addEducation} label="Tambah Pendidikan" />
            </Section>
          )}

          {/* ── SKILLS ── */}
          {active === 'skills' && (
            <Section title="Skills">
              {cvData.skills.map((skill) => (
                <div key={skill.id} className="flex gap-3 items-center mb-3">
                  <input
                    className={inputCls}
                    placeholder="Nama skill (cth: Python)"
                    value={skill.name}
                    onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                  />
                  <input
                    className={inputCls}
                    placeholder="Kategori (cth: Programming)"
                    value={skill.category}
                    onChange={(e) => updateSkill(skill.id, 'category', e.target.value)}
                  />
                  <button onClick={() => removeSkill(skill.id)} className="text-red-400 hover:text-red-600 shrink-0">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              <AddButton onClick={addSkill} label="Tambah Skill" />
            </Section>
          )}

          {/* ── LINKS ── */}
          {active === 'links' && (
            <Section title="Links">
              {cvData.links.map((link) => (
                <div key={link.id} className="flex gap-3 items-center mb-3">
                  <input
                    className={inputCls}
                    placeholder="Label (cth: LinkedIn)"
                    value={link.label}
                    onChange={(e) => updateLink(link.id, 'label', e.target.value)}
                  />
                  <input
                    className={inputCls}
                    placeholder="URL (cth: https://...)"
                    value={link.url}
                    onChange={(e) => updateLink(link.id, 'url', e.target.value)}
                  />
                  <button onClick={() => removeLink(link.id)} className="text-red-400 hover:text-red-600 shrink-0">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              <AddButton onClick={addLink} label="Tambah Link" />
            </Section>
          )}
        </div>
      </main>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-slate-800 mb-6">{title}</h2>
      {children}
    </div>
  )
}

function AddButton({ onClick, label }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium mt-2 transition-colors"
    >
      <Plus size={16} /> {label}
    </button>
  )
}
