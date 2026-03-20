/* eslint-disable react/prop-types */
export default function SimpleTimeline({ data, fontOverride, colorOverride }) {
  const { name, job_title, email, phone, address, summary, skills, experience, education, links } = data
  // Soft background: lighten color 88% toward white
  const bgColor = colorOverride ? lighten(colorOverride, 0.88) : '#f8f9fa'
  const accentColor = colorOverride || 'rgba(0,0,0,0.87)'

  return (
    <div id="cv-preview" style={{
      width: '956px', minHeight: '1100px', height: 'auto',
      background: bgColor,
      fontFamily: fontOverride || '"Tinos", serif', fontSize: '14px', lineHeight: '16px',
      color: 'rgba(0,0,0,0.87)',
    }}>
      <div style={{ maxWidth: '956px', margin: '0 auto', padding: '48px 56px' }}>
        {/* Header */}
        <div style={{ paddingBottom: '20px' }}>
          <h1 style={{ fontSize: '26px', fontWeight: 700, letterSpacing: '0.58px', margin: '0 0 4px', lineHeight: '30px' }}>{name}</h1>
          <p style={{ fontSize: '16px', fontWeight: 600, color: accentColor, margin: '0 0 6px', opacity: 0.85 }}>{job_title}</p>
          <address style={{ fontStyle: 'normal', fontSize: '12px', color: 'rgba(0,0,0,0.55)', lineHeight: '18px' }}>
            {[address, phone, email].filter(Boolean).map((item, i) => (
              <span key={i}>{i > 0 && <span style={{ margin: '0 6px', opacity: 0.4 }}>·</span>}{item}</span>
            ))}
          </address>
        </div>

        <Divider color={accentColor} />

        {summary && (
          <div style={{ display: 'flex', gap: '24px', paddingBottom: '16px' }}>
            <div style={{ flex: '0 1 195px' }}><h2 style={subtitle(accentColor)}>Professional Summary</h2></div>
            <div style={{ flex: 1 }}><p style={{ lineHeight: '20px' }}>{summary}</p></div>
          </div>
        )}

        <Divider color={accentColor} />

        <div style={{ paddingBottom: '8px' }}>
          <h2 style={{ ...subtitle(accentColor), marginBottom: '12px' }}>Work Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} style={{ display: 'flex', gap: '24px', paddingBottom: '16px' }}>
              <div style={{ flex: '0 1 195px', fontSize: '14px', paddingTop: '2px' }}>
                <p>{exp.startDate}{exp.endDate ? ` — ${exp.endDate}` : ''}</p>
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontWeight: 700, fontSize: '16px', marginBottom: '6px' }}>
                  {exp.position}{exp.company ? `, ${exp.company}` : ''}
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {exp.responsibilities.filter(Boolean).map((r, i) => (
                    <li key={i} style={{ display: 'flex', marginBottom: '4px' }}>
                      <span style={{ marginRight: '4px' }}>•</span><div>{r}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <Divider color={accentColor} />

        <div style={{ paddingBottom: '8px' }}>
          <h2 style={{ ...subtitle(accentColor), marginBottom: '12px' }}>Education</h2>
          {education.map((edu) => (
            <div key={edu.id} style={{ display: 'flex', gap: '24px', paddingBottom: '16px' }}>
              <div style={{ flex: '0 1 195px', fontSize: '14px' }}>
                {edu.startDate || edu.endDate ? `${edu.startDate}${edu.endDate ? ` — ${edu.endDate}` : ''}` : ''}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 700 }}>{edu.degree}{edu.institution ? `, ${edu.institution}` : ''}</p>
              </div>
            </div>
          ))}
        </div>

        <Divider color={accentColor} />

        <div style={{ display: 'flex', gap: '24px', paddingBottom: '16px' }}>
          <div style={{ flex: '0 1 195px' }}><h2 style={subtitle(accentColor)}>Skills</h2></div>
          <div style={{ flex: 1 }}>
            <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '8px 40px', listStyle: 'none', padding: 0, margin: 0 }}>
              {skills.map((s) => (
                <li key={s.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 700 }}>{s.name}</span>
                  {s.category && <span style={{ color: 'rgba(0,0,0,0.6)' }}>{s.category}</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {links.length > 0 && (<>
          <Divider color={accentColor} />
          <div style={{ display: 'flex', gap: '24px' }}>
            <div style={{ flex: '0 1 195px' }}><h2 style={subtitle(accentColor)}>Links</h2></div>
            <div style={{ flex: 1 }}>
              <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '12px 40px', listStyle: 'none', padding: 0, margin: 0 }}>
                {links.map((l) => <li key={l.id}><a href={l.url} style={{ textDecoration: 'underline', color: accentColor }}>{l.label}</a></li>)}
              </ul>
            </div>
          </div>
        </>)}
      </div>
    </div>
  )
}

function Divider({ color }) {
  return <div style={{ width: '100%', height: '2px', background: color || 'rgba(0,0,0,0.87)', margin: '0 0 16px', opacity: 0.35 }} />
}
const subtitle = (color) => ({ fontSize: '16px', textTransform: 'uppercase', letterSpacing: '0.58px', fontWeight: 700, margin: 0, color: color || 'rgba(0,0,0,0.87)' })
function lighten(hex, f) {
  if (!hex?.startsWith('#')) return '#f8f9fa'
  const n = parseInt(hex.slice(1), 16)
  const r = Math.min(255, Math.round(((n>>16)&0xff) + (255-((n>>16)&0xff))*f))
  const g = Math.min(255, Math.round(((n>>8)&0xff) + (255-((n>>8)&0xff))*f))
  const b = Math.min(255, Math.round((n&0xff) + (255-(n&0xff))*f))
  return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`
}
