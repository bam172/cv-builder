import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCVStore } from '../store/cvStore'
import { TEMPLATE_COMPONENTS, PHOTO_SUPPORTED } from '../templates/index'
import PhotoUploader from '../components/PhotoUploader'
import CVStyleInjector from '../components/CVStyleInjector'
import { getFontValue, getColorHex, FONTS, COLORS } from '../components/FontColorPanel'
import { TEMPLATES } from './TemplatePage'
import {
  ChevronLeft, ChevronRight, Download, Plus, Trash2,
  Loader2, Image, Check, Camera, Share2, LayoutTemplate,
} from 'lucide-react'

// Step-based sections
const STEPS = [
  { id: 'personal',  label: 'Personal details' },
  { id: 'contact',   label: 'Contact info' },
  { id: 'experience',label: 'Work experience' },
  { id: 'skills',    label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'summary',   label: 'Professional summary' },
  { id: 'links',     label: 'Links' },
]

// Right panel modes
const RIGHT_PANEL = { PREVIEW: 'preview', TEMPLATES: 'templates' }

export default function EditorPage() {
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState('personal')
  const [rightPanel, setRightPanel] = useState(RIGHT_PANEL.PREVIEW)
  const [styleTab, setStyleTab] = useState('styles') // styles | fonts | colors
  const [showPhotoUploader, setShowPhotoUploader] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const previewRef = useRef(null)

  const {
    cvData, updateCV,
    selectedTemplate, setTemplate,
    withPhoto, setWithPhoto,
    selectedFont, setFont,
    selectedColor, setColor,
    addSkill, updateSkill, removeSkill,
    addExperience, updateExperience, removeExperience,
    addEducation, updateEducation, removeEducation,
    addLink, updateLink, removeLink,
  } = useCVStore()

  const TemplateComponent = TEMPLATE_COMPONENTS[selectedTemplate] || TEMPLATE_COMPONENTS['modern-sidebar']
  const fontValue = getFontValue(selectedFont)
  const colorData = getColorHex(selectedColor)
  const colorHex = colorData?.hex || null
  const currentStepIdx = STEPS.findIndex(s => s.id === activeStep)
  const completedSteps = new Set(STEPS.slice(0, currentStepIdx).map(s => s.id))

  const handleDownload = async () => {
    setDownloading(true)
    try {
      const { default: html2pdf } = await import('html2pdf.js')
      const element = document.getElementById('cv-preview')
      const pdfH = Math.max(element.scrollHeight + 40, 1100)
      await html2pdf().set({
        margin: 0,
        filename: `CV-${cvData.name.replace(/\s+/g, '-')}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, letterRendering: true, scrollY: 0, width: 956, windowWidth: 956 },
        jsPDF: { unit: 'px', format: [956, pdfH], orientation: 'portrait' },
      }).from(element).save()
    } catch (err) {
      alert('Gagal generate PDF: ' + err.message)
    } finally {
      setDownloading(false)
    }
  }

  const inp = 'w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-slate-400'
  const lbl = 'block text-xs text-slate-500 mb-1.5'

  return (
    <div className="bg-slate-100 flex flex-col" style={{ fontFamily: "'Inter', sans-serif", height: "100vh", overflow: "hidden" }}>
      <CVStyleInjector />

      {/* ── TOP BAR ── */}
      <header className="bg-white border-b border-slate-200 px-6 h-14 flex items-center gap-3 shrink-0">
        <button onClick={() => navigate('/')}
          className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors">
          <ChevronLeft size={16} className="text-slate-500" />
        </button>
        <h1 className="font-bold text-slate-800 text-base flex-1">Your resume</h1>



        <button className="flex items-center gap-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl px-4 py-2 text-sm font-medium transition-colors">
          <Share2 size={15} /> Share
        </button>
        <button onClick={handleDownload} disabled={downloading}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white rounded-xl px-5 py-2 text-sm font-semibold transition-colors">
          {downloading ? <Loader2 size={15} className="animate-spin" /> : <Download size={15} />}
          {downloading ? 'Generating...' : 'Download'}
        </button>
      </header>

      <div className="flex overflow-hidden" style={{ flex: 1, minHeight: 0 }}>
        {/* ── LEFT: STEP FORM ── */}
        <aside className="w-96 bg-white border-r border-slate-200 flex flex-col shrink-0" style={{ height: "100%", overflow: "hidden" }}>

          {/* Step list */}
          <nav className="px-5 pt-5 pb-3 shrink-0" style={{ overflowY: "visible" }}>
            {STEPS.map((step, idx) => {
              const done = completedSteps.has(step.id)
              const active = activeStep === step.id
              return (
                <button key={step.id} onClick={() => setActiveStep(step.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all mb-0.5 ${
                    active ? 'bg-blue-50' : 'hover:bg-slate-50'
                  }`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    active ? 'bg-blue-600 text-white' :
                    done ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {done && !active ? <Check size={12} /> : idx + 1}
                  </div>
                  <span className={`font-medium ${active ? 'text-blue-700' : done ? 'text-slate-600' : 'text-slate-400'}`}>
                    {step.label}
                  </span>
                </button>
              )
            })}

            {/* Add section */}
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:bg-slate-50 transition-all mt-1">
              <div className="w-6 h-6 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center">
                <Plus size={12} />
              </div>
              <span>Add section</span>
            </button>
          </nav>

          <div style={{
            flex: 1,
            minHeight: 0,
            overflowY: 'scroll',
            scrollbarWidth: 'thin',
            scrollbarColor: '#64748b #e2e8f0',
            paddingLeft: '20px',
            paddingRight: '20px',
            paddingBottom: '24px',
          }}>
            {/* ── PERSONAL ── */}
            {activeStep === 'personal' && (
              <FormSection title="Personal details"
                desc="Adding your name and desired job title helps recruiters quickly understand who you are.">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={lbl}>First name</label>
                    <input className={inp} placeholder="First name"
                      value={cvData.name?.split(' ')[0] || ''}
                      onChange={(e) => {
                        const last = cvData.name?.split(' ').slice(1).join(' ') || ''
                        updateCV({ name: (e.target.value + ' ' + last).trim() })
                      }} />
                  </div>
                  <div>
                    <label className={lbl}>Last name</label>
                    <input className={inp} placeholder="Last name"
                      value={cvData.name?.split(' ').slice(1).join(' ') || ''}
                      onChange={(e) => {
                        const first = cvData.name?.split(' ')[0] || ''
                        updateCV({ name: (first + ' ' + e.target.value).trim() })
                      }} />
                  </div>
                </div>
                <div>
                  <label className={lbl}>Desired job title</label>
                  <input className={inp} placeholder="e.g. Senior Engineer"
                    value={cvData.job_title || ''}
                    onChange={(e) => updateCV({ job_title: e.target.value })} />
                </div>
                {/* Photo upload */}
                <div className="flex items-center gap-4 pt-1">
                  {cvData.photo ? (
                    <>
                      <img src={cvData.photo} alt="Profile"
                        className="w-14 h-14 rounded-xl object-cover border-2 border-slate-200" />
                      <div className="flex gap-3">
                        <button onClick={() => setShowPhotoUploader(true)}
                          className="text-sm text-slate-600 hover:text-slate-800 font-medium">Change photo</button>
                        <button onClick={() => updateCV({ photo: null })}
                          className="text-sm text-red-500 hover:text-red-700 font-medium flex items-center gap-1">
                          <Trash2 size={13} /> Delete
                        </button>
                      </div>
                    </>
                  ) : (
                    <button onClick={() => setShowPhotoUploader(true)}
                      className="flex items-center gap-3 border-2 border-dashed border-slate-300 hover:border-blue-400 rounded-xl px-5 py-3 text-sm text-slate-500 transition-colors">
                      <Camera size={18} className="text-slate-400" /> Add photo
                    </button>
                  )}
                </div>
                <NextBtn onClick={() => setActiveStep('contact')} />
              </FormSection>
            )}

            {/* ── CONTACT ── */}
            {activeStep === 'contact' && (
              <FormSection title="Contact info" desc="How recruiters can reach you.">
                <Field label="Email" value={cvData.email} onChange={(v) => updateCV({ email: v })} placeholder="your@email.com" inp={inp} lbl={lbl} />
                <Field label="Phone" value={cvData.phone} onChange={(v) => updateCV({ phone: v })} placeholder="+62 xxx xxxx xxxx" inp={inp} lbl={lbl} />
                <Field label="Address" value={cvData.address} onChange={(v) => updateCV({ address: v })} placeholder="City, Country" inp={inp} lbl={lbl} />
                <NavBtns prev={() => setActiveStep('personal')} next={() => setActiveStep('experience')} />
              </FormSection>
            )}

            {/* ── EXPERIENCE ── */}
            {activeStep === 'experience' && (
              <FormSection title="Work experience" desc="List your most recent positions first.">
                {cvData.experience.map((exp, idx) => (
                  <div key={exp.id} className="border border-slate-200 rounded-2xl p-4 bg-slate-50">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Position {idx + 1}</span>
                      <button onClick={() => removeExperience(exp.id)} className="text-red-400 hover:text-red-600 p-1 rounded-lg hover:bg-red-50">
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="flex flex-col gap-3">
                      <Field label="Job title" value={exp.position} onChange={(v) => updateExperience(exp.id, 'position', v)} placeholder="e.g. Senior Engineer" inp={inp} lbl={lbl} />
                      <Field label="Company" value={exp.company} onChange={(v) => updateExperience(exp.id, 'company', v)} placeholder="Company name" inp={inp} lbl={lbl} />
                      <div className="grid grid-cols-2 gap-3">
                        <Field label="Start date" value={exp.startDate} onChange={(v) => updateExperience(exp.id, 'startDate', v)} placeholder="Jan 2022" inp={inp} lbl={lbl} />
                        <Field label="End date" value={exp.endDate} onChange={(v) => updateExperience(exp.id, 'endDate', v)} placeholder="Present" inp={inp} lbl={lbl} />
                      </div>
                      <div>
                        <label className={lbl}>Responsibilities (one per line)</label>
                        <textarea className={inp + ' resize-none'} rows={4}
                          value={exp.responsibilities.join('\n')}
                          onChange={(e) => updateExperience(exp.id, 'responsibilities', e.target.value.split('\n'))} />
                      </div>
                    </div>
                  </div>
                ))}
                <button onClick={addExperience}
                  className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-slate-300 hover:border-blue-400 text-slate-500 hover:text-blue-600 rounded-2xl py-3 text-sm font-medium transition-colors">
                  <Plus size={16} /> Add position
                </button>
                <NavBtns prev={() => setActiveStep('contact')} next={() => setActiveStep('skills')} />
              </FormSection>
            )}

            {/* ── SKILLS ── */}
            {activeStep === 'skills' && (
              <FormSection title="Skills" desc="Add relevant skills for your target role.">
                <div className="flex flex-col gap-2">
                  {cvData.skills.map((s) => (
                    <div key={s.id} className="flex gap-2 items-center">
                      <input className={inp} placeholder="Skill name" value={s.name}
                        onChange={(e) => updateSkill(s.id, 'name', e.target.value)} />
                      <input className={inp} placeholder="Category" value={s.category}
                        onChange={(e) => updateSkill(s.id, 'category', e.target.value)} />
                      <button onClick={() => removeSkill(s.id)} className="text-red-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 shrink-0">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
                <button onClick={addSkill}
                  className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-slate-300 hover:border-blue-400 text-slate-500 hover:text-blue-600 rounded-2xl py-3 text-sm font-medium transition-colors">
                  <Plus size={16} /> Add skill
                </button>
                <NavBtns prev={() => setActiveStep('experience')} next={() => setActiveStep('education')} />
              </FormSection>
            )}

            {/* ── EDUCATION ── */}
            {activeStep === 'education' && (
              <FormSection title="Education" desc="Your academic background.">
                {cvData.education.map((edu, idx) => (
                  <div key={edu.id} className="border border-slate-200 rounded-2xl p-4 bg-slate-50">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Education {idx + 1}</span>
                      <button onClick={() => removeEducation(edu.id)} className="text-red-400 hover:text-red-600 p-1 rounded-lg hover:bg-red-50">
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="flex flex-col gap-3">
                      <Field label="Degree / Level" value={edu.degree} onChange={(v) => updateEducation(edu.id, 'degree', v)} placeholder="e.g. Bachelor of Science" inp={inp} lbl={lbl} />
                      <Field label="Institution" value={edu.institution} onChange={(v) => updateEducation(edu.id, 'institution', v)} placeholder="University name" inp={inp} lbl={lbl} />
                      <div className="grid grid-cols-2 gap-3">
                        <Field label="Start year" value={edu.startDate} onChange={(v) => updateEducation(edu.id, 'startDate', v)} placeholder="2018" inp={inp} lbl={lbl} />
                        <Field label="End year" value={edu.endDate} onChange={(v) => updateEducation(edu.id, 'endDate', v)} placeholder="2022" inp={inp} lbl={lbl} />
                      </div>
                    </div>
                  </div>
                ))}
                <button onClick={addEducation}
                  className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-slate-300 hover:border-blue-400 text-slate-500 hover:text-blue-600 rounded-2xl py-3 text-sm font-medium transition-colors">
                  <Plus size={16} /> Add education
                </button>
                <NavBtns prev={() => setActiveStep('skills')} next={() => setActiveStep('summary')} />
              </FormSection>
            )}

            {/* ── SUMMARY ── */}
            {activeStep === 'summary' && (
              <FormSection title="Professional summary" desc="A short paragraph about your experience and goals.">
                <div>
                  <label className={lbl}>Summary</label>
                  <textarea className={inp + ' resize-none'} rows={7}
                    placeholder="Experienced professional with X years of experience in..."
                    value={cvData.summary || ''}
                    onChange={(e) => updateCV({ summary: e.target.value })} />
                </div>
                <NavBtns prev={() => setActiveStep('education')} next={() => setActiveStep('links')} />
              </FormSection>
            )}

            {/* ── LINKS ── */}
            {activeStep === 'links' && (
              <FormSection title="Links" desc="LinkedIn, GitHub, portfolio, etc.">
                {cvData.links.map((l) => (
                  <div key={l.id} className="flex gap-2 items-center">
                    <input className={inp} placeholder="Label (e.g. LinkedIn)" value={l.label}
                      onChange={(e) => updateLink(l.id, 'label', e.target.value)} />
                    <input className={inp} placeholder="URL" value={l.url}
                      onChange={(e) => updateLink(l.id, 'url', e.target.value)} />
                    <button onClick={() => removeLink(l.id)} className="text-red-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 shrink-0">
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
                <button onClick={addLink}
                  className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-slate-300 hover:border-blue-400 text-slate-500 hover:text-blue-600 rounded-2xl py-3 text-sm font-medium transition-colors">
                  <Plus size={16} /> Add link
                </button>
                <div className="pt-2">
                  <button onClick={() => setActiveStep('personal')}
                    className="w-full bg-green-500 hover:bg-green-600 text-white rounded-xl py-3 text-sm font-semibold transition-colors">
                    ✓ Selesai — Lihat CV
                  </button>
                </div>
              </FormSection>
            )}
          </div>
        </aside>

        {/* ── RIGHT: PREVIEW + TEMPLATE PANEL ── */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", height: "100%" }}>

          {rightPanel === RIGHT_PANEL.PREVIEW && (
            <>
              {/* Preview toolbar */}
              <div className="bg-slate-300 px-6 py-2 flex items-center gap-3 shrink-0">
                <div className="flex-1" />
                <button
                  onClick={() => setRightPanel(RIGHT_PANEL.TEMPLATES)}
                  className="flex items-center gap-2 bg-white/90 hover:bg-white text-slate-700 rounded-xl px-4 py-2 text-sm font-semibold shadow-sm transition-colors">
                  <LayoutTemplate size={15} /> Change template
                </button>
              </div>

              {/* CV Preview — full scroll, no height clipping */}
              <div
                ref={previewRef}
                style={{
                  flex: 1,
                  minHeight: 0,
                  overflowY: 'scroll',
                  overflowX: 'hidden',
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#64748b #cbd5e1',
                  background: '#cbd5e1',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  padding: '32px',
                }}>
                <div style={{
                  width: '650px',
                  flexShrink: 0,
                  borderRadius: '4px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                  overflow: 'hidden',
                  /* Height = actual CV height * scale — computed dynamically */
                  height: 'auto',
                }}>
                  <CVScaledPreview scale={0.68}>
                    <TemplateComponent
                      data={cvData}
                      withPhoto={withPhoto && PHOTO_SUPPORTED.includes(selectedTemplate)}
                      fontOverride={fontValue}
                      colorOverride={colorHex}
                      style={fontValue ? { fontFamily: fontValue } : {}}
                    />
                  </CVScaledPreview>
                </div>
              </div>

              {/* Saved indicator */}
              <div className="absolute bottom-6 right-8 bg-white rounded-full px-4 py-2 shadow-md text-sm font-medium text-slate-600 flex items-center gap-2">
                <Check size={14} className="text-green-500" /> Saved
              </div>
            </>
          )}

          {rightPanel === RIGHT_PANEL.TEMPLATES && (
            <div style={{ display: "flex", height: "100%", overflow: "hidden" }}>
              {/* Template panel — fixed width */}
              <div style={{ width: "320px", background: "white", display: "flex", flexDirection: "column", overflow: "hidden", flexShrink: 0, borderRight: "1px solid #e2e8f0", height: "100%" }}>
                {/* Panel header */}
                <div className="px-6 pt-5 pb-3 border-b border-slate-100 shrink-0">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-slate-800">Templates</h2>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-500">With photo</span>
                      <button onClick={() => setWithPhoto(!withPhoto)}
                        className={`relative w-12 h-6 rounded-full transition-colors ${withPhoto ? 'bg-blue-500' : 'bg-slate-300'}`}>
                        <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${withPhoto ? 'translate-x-6' : 'translate-x-0.5'}`} />
                      </button>
                    </div>
                  </div>

                  {/* Style/Font/Color tabs */}
                  <div className="flex gap-1">
                    {['styles','fonts','colors'].map((tab) => (
                      <button key={tab} onClick={() => setStyleTab(tab)}
                        className={`flex-1 py-2 px-3 rounded-xl text-sm font-medium capitalize transition-colors ${
                          styleTab === tab ? 'bg-slate-100 text-slate-800' : 'text-slate-400 hover:bg-slate-50'
                        }`}>
                        {tab === 'styles' ? '🎨 Styles' : tab === 'fonts' ? '𝐓 Fonts' : '🖌 Colors'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Panel content */}
                <div style={{
                  flex: 1,
                  minHeight: 0,
                  overflowY: 'scroll',
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#64748b #e2e8f0',
                  padding: '16px',
                }}>
                  {/* STYLES — template grid */}
                  {styleTab === 'styles' && (
                    <div className="grid grid-cols-2 gap-4">
                      {TEMPLATES.map((t) => (
                        <div key={t.id} onClick={() => setTemplate(t.id)}
                          onDoubleClick={() => { setTemplate(t.id); setRightPanel(RIGHT_PANEL.PREVIEW) }}
                          className={`cursor-pointer rounded-2xl border-2 overflow-hidden transition-all hover:shadow-md ${
                            selectedTemplate === t.id ? 'border-blue-500' : 'border-slate-200 hover:border-slate-300'
                          }`}>
                          {/* Mini preview */}
                          <MiniPreview template={t} />
                          <div className="p-3 bg-white">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-slate-700">{t.name}</span>
                              {selectedTemplate === t.id && (
                                <span className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                  <Check size={11} className="text-white" />
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* FONTS */}
                  {styleTab === 'fonts' && (
                    <div className="grid grid-cols-2 gap-2">
                      {FONTS.map((f) => (
                        <button key={f.id} onClick={() => setFont(f.id)}
                          className={`relative p-3 rounded-xl border-2 text-left transition-all ${
                            selectedFont === f.id ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300'
                          }`}
                          style={{ fontFamily: f.value || 'inherit' }}>
                          <span className="text-sm text-slate-700 block">{f.label}</span>
                          {selectedFont === f.id && (
                            <span className="absolute top-2 right-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                              <Check size={10} className="text-white" />
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* COLORS */}
                  {styleTab === 'colors' && (
                    <div className="grid grid-cols-2 gap-2">
                      {COLORS.map((c) => (
                        <button key={c.id} onClick={() => setColor(c.id)}
                          className={`relative flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                            selectedColor === c.id ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300'
                          }`}>
                          <div className="w-9 h-9 rounded-xl flex-shrink-0"
                            style={{ background: c.hex || '#e5e7eb', border: !c.hex ? '2px dashed #d1d5db' : 'none' }}>
                            {c.inverse && <div className="w-full h-full flex items-center justify-center"><div className="w-4 h-4 rounded-full bg-white" /></div>}
                          </div>
                          <span className="text-sm text-slate-700">{c.label}</span>
                          {selectedColor === c.id && (
                            <span className="absolute top-2 right-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                              <Check size={10} className="text-white" />
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Back to editor button */}
                <div className="p-4 border-t border-slate-100 shrink-0">
                  <button onClick={() => setRightPanel(RIGHT_PANEL.PREVIEW)}
                    className="w-full flex items-center gap-2 justify-center text-slate-600 hover:text-slate-800 text-sm font-medium py-2.5 rounded-xl hover:bg-slate-50 border border-slate-200 transition-colors">
                    <ChevronLeft size={16} /> Back to editor
                  </button>
                </div>
              </div>

              {/* Mini CV preview while in template panel */}
              <div style={{
                flex: 1,
                minHeight: 0,
                overflowY: 'scroll',
                overflowX: 'hidden',
                scrollbarWidth: 'thin',
                scrollbarColor: '#64748b #cbd5e1',
                background: '#cbd5e1',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                padding: '24px',
              }}>
                <div style={{
                  width: '526px',
                  flexShrink: 0,
                  borderRadius: '4px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
                  overflow: 'hidden',
                  height: 'auto',
                }}>
                  <CVScaledPreview scale={0.55} noPointer>
                    <TemplateComponent
                      data={cvData}
                      withPhoto={withPhoto && PHOTO_SUPPORTED.includes(selectedTemplate)}
                      fontOverride={fontValue}
                      colorOverride={colorHex}
                    />
                  </CVScaledPreview>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showPhotoUploader && (
        <PhotoUploader
          onSave={(base64) => updateCV({ photo: base64 })}
          onClose={() => setShowPhotoUploader(false)}
        />
      )}
    </div>
  )
}

// ── Sub-components ──

function FormSection({ title, desc, children }) {
  return (
    <div className="pt-4">
      <h2 className="text-xl font-bold text-slate-800 mb-1">{title}</h2>
      {desc && <p className="text-sm text-slate-500 mb-5 leading-relaxed">{desc}</p>}
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  )
}

function Field({ label, value, onChange, placeholder, inp, lbl }) {
  return (
    <div>
      <label className={lbl}>{label}</label>
      <input className={inp} placeholder={placeholder || ''} value={value || ''}
        onChange={(e) => onChange(e.target.value)} />
    </div>
  )
}

function NextBtn({ onClick }) {
  return (
    <div className="pt-2">
      <button onClick={onClick}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-3 text-sm font-semibold transition-colors">
        Next <ChevronRight size={16} />
      </button>
    </div>
  )
}

function NavBtns({ prev, next }) {
  return (
    <div className="flex justify-between pt-2">
      <button onClick={prev}
        className="flex items-center gap-2 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl px-5 py-2.5 text-sm font-medium transition-colors">
        <ChevronLeft size={16} /> Back
      </button>
      <button onClick={next}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-2.5 text-sm font-semibold transition-colors">
        Next <ChevronRight size={16} />
      </button>
    </div>
  )
}

// CVScaledPreview: scales CV without clipping — height follows actual content
function CVScaledPreview({ scale, children, noPointer }) {
  const [height, setHeight] = useState(1100)
  const innerRef = useRef(null)

  useEffect(() => {
    if (!innerRef.current) return
    const observer = new ResizeObserver(() => {
      const h = innerRef.current?.scrollHeight || 1100
      setHeight(h)
    })
    observer.observe(innerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div style={{
      width: `${Math.round(956 * scale)}px`,
      /* Height = scaled content height so parent can scroll to show everything */
      height: `${Math.round(height * scale)}px`,
      position: 'relative',
      flexShrink: 0,
    }}>
      <div
        ref={innerRef}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: '956px',
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: noPointer ? 'none' : 'auto',
        }}
      >
        {children}
      </div>
    </div>
  )
}

function MiniPreview({ template: t }) {
  const c = t.color
  const layouts = {
    'sidebar-left': (
      <div className="h-36 flex">
        <div className="w-1/3 h-full" style={{ background: c }} />
        <div className="flex-1 bg-white p-2">
          <div className="h-2 rounded mb-1" style={{ background: c, width: '70%' }} />
          <div className="h-1 bg-slate-200 rounded mb-2" style={{ width: '45%' }} />
          <div className="h-1 bg-slate-100 rounded mb-1" /><div className="h-1 bg-slate-100 rounded mb-1" style={{ width: '80%' }} />
          <div className="h-1 rounded mt-3 mb-1" style={{ background: c, width: '40%', opacity: 0.7 }} />
          <div className="h-1 bg-slate-100 rounded mb-1" style={{ width: '70%' }} />
        </div>
      </div>
    ),
    'sidebar-right': (
      <div className="h-36 flex">
        <div className="flex-1 bg-white p-2">
          <div className="h-2 rounded mb-1" style={{ background: c, width: '70%' }} />
          <div className="h-1 bg-slate-200 rounded mb-2" style={{ width: '45%' }} />
          <div className="h-1 bg-slate-100 rounded mb-1" /><div className="h-1 bg-slate-100 rounded mb-1" style={{ width: '80%' }} />
        </div>
        <div className="w-1/3 h-full" style={{ background: c }} />
      </div>
    ),
    'header-full': (
      <div className="h-36">
        <div className="h-10 flex items-end px-2 pb-2" style={{ background: c }}>
          <div className="h-1.5 rounded bg-white/80" style={{ width: '70px' }} />
        </div>
        <div className="bg-white p-2">
          <div className="h-1 bg-slate-100 rounded mb-1" /><div className="h-1 bg-slate-100 rounded mb-2" style={{ width: '80%' }} />
          <div className="h-1 rounded mb-1" style={{ background: c, width: '35%', opacity: 0.6 }} />
          <div className="h-1 bg-slate-100 rounded" style={{ width: '65%' }} />
        </div>
      </div>
    ),
    'single': (
      <div className="h-36 bg-white p-3">
        <div className="flex items-center gap-1.5 mb-2">
          <div className="w-5 h-5 rounded-full bg-slate-200 shrink-0" />
          <div className="h-1.5 rounded" style={{ background: c, width: '60px' }} />
        </div>
        <div className="h-px bg-slate-200 mb-2" />
        <div className="h-1 bg-slate-100 rounded mb-1" /><div className="h-1 bg-slate-100 rounded mb-2" style={{ width: '80%' }} />
        <div className="h-1 rounded mb-1" style={{ background: c, width: '35%', opacity: 0.6 }} />
        <div className="h-1 bg-slate-100 rounded" style={{ width: '65%' }} />
      </div>
    ),
  }
  return layouts[t.layout] || layouts['single']
}
