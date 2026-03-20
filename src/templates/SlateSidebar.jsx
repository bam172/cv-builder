/* eslint-disable react/prop-types */
// Template: Slate Gray Sidebar — sidebar abu muda, header abu gelap, Tinos
export default function SlateSidebar({ data, withPhoto, fontOverride, colorOverride }) {
  const { name, job_title, email, phone, address, summary, skills, experience, education, links, photo } = data
  const slate = colorOverride || 'rgba(91,107,121,1)'
  // Sidebar: soft version — 85% lightened to be readable
  const sidebarBg = colorOverride ? softBg(colorOverride, 0.82) : 'rgba(231,233,235,1)'
  return (
    <div id="cv-preview" style={{ width: '956px', minHeight: '1100px', background: '#fff', fontFamily: fontOverride || '"Tinos",serif', fontSize: '14px', lineHeight: '16px', color: 'rgba(0,0,0,0.87)' }}>
      {/* Header full width */}
      <header style={{
        background: slate, color: '#fff',
        padding: withPhoto ? '32px 48px 32px 32px' : '32px 56px',
        display: 'flex', alignItems: 'center', gap: '18px',
        justifyContent: withPhoto ? 'space-between' : 'center',
        position: 'relative', minHeight: '100px',
      }}>
        {withPhoto ? (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, minWidth: 0 }}>
              <h1 style={{ fontSize: '40px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '-0.3px', lineHeight: '46px', wordBreak: 'break-word' }}>{name}</h1>
              <h2 style={{ fontSize: '18px', fontWeight: 500, letterSpacing: '-0.2px', opacity: 0.85 }}>{job_title}</h2>
            </div>
            {photo && (
              <div style={{ width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                <img src={photo} alt="photo" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
              </div>
            )}
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '44px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '-0.3px', lineHeight: '50px', wordBreak: 'break-word' }}>{name}</h1>
            <h2 style={{ fontSize: '18px', fontWeight: 500, marginTop: '6px', opacity: 0.85 }}>{job_title}</h2>
          </div>
        )}
        <div style={{ position: 'absolute', bottom: '0', left: 0, width: '100%', height: '4px', background: '#fff' }} />
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr' }}>
        {/* Sidebar */}
        <aside style={{ background: sidebarBg, padding: '40px 40px 48px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <section style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingBottom: '32px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-0.58px' }}>Contacts</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {address && (
                <li style={{ display: 'flex', gap: '6px' }}>
                  <span style={{ fontWeight: 700, fontSize: '16px' }}>Address:</span>
                  <span>{address}</span>
                </li>
              )}
              {phone && (
                <li style={{ display: 'flex', gap: '6px' }}>
                  <span style={{ fontWeight: 700, fontSize: '16px' }}>Phone:</span>
                  <a href={`tel:${phone}`} style={{ color: 'inherit' }}>{phone}</a>
                </li>
              )}
              {email && (
                <li style={{ display: 'flex', gap: '6px' }}>
                  <span style={{ fontWeight: 700, fontSize: '16px' }}>Email:</span>
                  <a href={`mailto:${email}`} style={{ color: 'inherit', wordBreak: 'break-all' }}>{email}</a>
                </li>
              )}
            </ul>
          </section>
          <section style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingBottom: '32px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-0.58px' }}>Education</h2>
            {education.map((edu) => (
              <div key={edu.id} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <p style={{ fontWeight: 700, fontSize: '16px' }}>{edu.degree}{edu.institution ? `, ${edu.institution}` : ''}</p>
                {(edu.startDate || edu.endDate) && <p style={{ fontSize: '12px', color: 'rgba(0,0,0,0.6)' }}>{edu.startDate}{edu.endDate ? ` – ${edu.endDate}` : ''}</p>}
              </div>
            ))}
          </section>
          <section style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-0.58px' }}>Skills</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {skills.map((s) => (
                <li key={s.id} style={{ display: 'flex', gap: '4px' }}>
                  <span style={{ marginRight: '4px' }}>•</span>
                  <div>{s.name}{s.category ? ` — ${s.category}` : ''}</div>
                </li>
              ))}
            </ul>
          </section>
        </aside>

        {/* Main */}
        <main style={{ padding: '40px 56px 48px 40px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {summary && (
            <section style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <h2 style={mainH(slate)}>Professional Summary</h2>
              <p style={{ lineHeight: '20px' }}>{summary}</p>
            </section>
          )}
          <section style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h2 style={mainH(slate)}>Work Experience</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '6px' }}>
                    <p>
                      <span style={{ fontWeight: 700, fontSize: '16px', lineHeight: '18px' }}>{exp.position},</span>{' '}
                      <span style={{ color: 'rgba(0,0,0,0.6)' }}>{exp.startDate}{exp.endDate ? ` – ${exp.endDate}` : ''}</span>
                    </p>
                    <p style={{ fontWeight: 700, fontSize: '16px' }}>{exp.company}</p>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {exp.responsibilities.filter(Boolean).map((r, i) => (
                      <li key={i} style={{ display: 'flex' }}><span style={{ marginRight: '4px' }}>•</span><div>{r}</div></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
          {links.length > 0 && (
            <section>
              <h2 style={mainH(slate)}>Links</h2>
              <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '16px 40px', listStyle: 'none', padding: 0 }}>
                {links.map((l) => <li key={l.id}><a href={l.url} style={{ textDecoration: 'underline' }}>{l.label}</a></li>)}
              </ul>
            </section>
          )}
        </main>
      </div>
    </div>
  )
}
const mainH = (color) => ({
  fontSize: '20px', fontWeight: 700, textTransform: 'uppercase',
  letterSpacing: '-0.58px', color, borderBottom: `2px solid ${color}30`, paddingBottom: '6px',
})

function softBg(hex, f) {
  if (!hex?.startsWith('#')) return 'rgba(231,233,235,1)'
  const n = parseInt(hex.slice(1), 16)
  const r = Math.min(255, Math.round(((n>>16)&0xff) + (255-((n>>16)&0xff))*f))
  const g = Math.min(255, Math.round(((n>>8)&0xff) + (255-((n>>8)&0xff))*f))
  const b = Math.min(255, Math.round((n&0xff) + (255-(n&0xff))*f))
  return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`
}
