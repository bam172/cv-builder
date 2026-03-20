/* eslint-disable react/prop-types */
// Template: Inter Clean — satu kolom, header dengan foto bulat kiri, dates di kiri, font Inter
export default function InterClean({ data, withPhoto, fontOverride, colorOverride }) {
  const { name, job_title, email, phone, address, summary, skills, experience, education, links, photo } = data
  const bgColor = colorOverride ? lighten(colorOverride, 0.9) : '#fff'
  return (
    <div id="cv-preview" style={{
      width: '956px', minHeight: '1100px', height: 'auto', background: bgColor,
      fontFamily: fontOverride || '"Inter",sans-serif', fontSize: '14px', lineHeight: '1.5',
      color: 'rgba(0,0,0,0.87)',
    }}>
      <main style={{ display: 'flex', maxWidth: '956px', padding: '48px 56px', flexDirection: 'column', alignItems: 'flex-start', gap: '24px', margin: '0 auto' }}>
        {/* Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', gap: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {withPhoto && photo && (
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '1px solid rgba(0,0,0,0.15)' }}>
                <img src={photo} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
              </div>
            )}
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: 700, lineHeight: '38px', letterSpacing: '0.65px', textTransform: 'uppercase' }}>{name}</h1>
              <p style={{ fontSize: '16px', lineHeight: '24px', marginTop: '4px' }}>{job_title}</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right', gap: '2px', fontSize: '14px', color: 'rgba(0,0,0,0.6)' }}>
            {address && <div>{address}</div>}
            <div style={{ display: 'flex', gap: '4px', justifyContent: 'flex-end' }}>
              {phone && <a href={`tel:${phone}`} style={{ color: 'rgba(0,0,0,0.6)' }}>{phone}</a>}
              {phone && email && <span>•</span>}
              {email && <a href={`mailto:${email}`} style={{ color: 'rgba(0,0,0,0.6)' }}>{email}</a>}
            </div>
          </div>
        </header>

        {/* Summary */}
        {summary && (
          <section style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h2 style={secTitle}>Professional Summary</h2>
            <p style={{ lineHeight: '22px' }}>{summary}</p>
          </section>
        )}

        {/* Experience */}
        <section style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h2 style={secTitle}>Work Experience</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {experience.map((exp) => (
              <article key={exp.id} style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: '40px' }}>
                <div style={{ color: 'rgba(0,0,0,0.6)', fontSize: '16px', lineHeight: '24px', paddingTop: '2px' }}>
                  {exp.startDate}{exp.endDate ? ` – ${exp.endDate}` : ''}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div>
                    <h3 style={{ fontWeight: 700, fontSize: '16px', lineHeight: '24px' }}>{exp.position}</h3>
                    <p style={{ color: 'rgba(0,0,0,0.6)', fontSize: '14px' }}>{exp.company}</p>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {exp.responsibilities.filter(Boolean).map((r, i) => (
                      <li key={i} style={{ lineHeight: '22px' }}>• {r}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Education */}
        <section style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h2 style={secTitle}>Education</h2>
          {education.map((edu) => (
            <div key={edu.id} style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: '40px' }}>
              <div style={{ color: 'rgba(0,0,0,0.6)', fontSize: '16px' }}>
                {edu.startDate || edu.endDate ? `${edu.startDate}${edu.endDate ? ` – ${edu.endDate}` : ''}` : ''}
              </div>
              <div>
                <h3 style={{ fontWeight: 700, fontSize: '16px' }}>{edu.degree}</h3>
                <p style={{ color: 'rgba(0,0,0,0.6)' }}>{edu.institution}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Skills */}
        <section style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h2 style={secTitle}>Skills</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: '40px' }}>
            <div />
            <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '12px 40px', listStyle: 'none', padding: 0, margin: 0 }}>
              {skills.map((s) => (
                <li key={s.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 700 }}>{s.name}</span>
                  {s.category && <span style={{ color: 'rgba(0,0,0,0.6)' }}>{s.category}</span>}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {links.length > 0 && (
          <section style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h2 style={secTitle}>Links</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: '40px' }}>
              <div />
              <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '12px 40px', listStyle: 'none', padding: 0, margin: 0 }}>
                {links.map((l) => <li key={l.id}><a href={l.url} style={{ textDecoration: 'underline', fontWeight: 500 }}>{l.label}</a></li>)}
              </ul>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
const secTitle = {
  fontSize: '16px', fontWeight: 700, lineHeight: '24px',
  paddingBottom: '12px', borderBottom: '1px solid rgba(0,0,0,0.12)',
  textTransform: 'uppercase', width: '100%',
}
function lighten(hex, f) {
  if (!hex?.startsWith('#')) return '#fff'
  const n = parseInt(hex.slice(1), 16)
  const r = Math.min(255, Math.round(((n>>16)&0xff) + (255-((n>>16)&0xff))*f))
  const g = Math.min(255, Math.round(((n>>8)&0xff) + (255-((n>>8)&0xff))*f))
  const b = Math.min(255, Math.round((n&0xff) + (255-(n&0xff))*f))
  return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`
}
