/* eslint-disable react/prop-types */
export default function Minimal({ data, withPhoto, fontOverride, colorOverride }) {
  const { name, job_title, email, phone, address, summary, skills, experience, education, links, photo } = data
  const dark = colorOverride || '#1e293b'

  return (
    <div id="cv-preview" className="cv-scope" style={{
      width: '956px', minHeight: '1100px', height: 'auto', background: '#fff',
      fontFamily: fontOverride || '"Tinos", serif', fontSize: '14px', lineHeight: '18px',
      color: 'rgba(0,0,0,0.87)',
    }}>
      {/* Dark header */}
      <header className="minimal-header" style={{
        background: dark, color: '#fff', padding: '40px 64px 36px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {withPhoto && photo && (
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '3px solid rgba(255,255,255,0.3)' }}>
              <img src={photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
            </div>
          )}
          <div>
            <h1 style={{ fontSize: '40px', fontWeight: 700, margin: '0 0 6px', color: '#fff', lineHeight: '46px', wordBreak: 'break-word' }}>{name}</h1>
            <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.7)', margin: '0 0 14px', lineHeight: '24px' }}>{job_title}</p>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', fontSize: '12px', color: 'rgba(255,255,255,0.55)', lineHeight: '18px' }}>
              {email && <span>✉ {email}</span>}
              {phone && <span>📱 {phone}</span>}
              {address && <span>📍 {address}</span>}
            </div>
          </div>
        </div>
      </header>

      <div style={{ padding: '40px 64px' }}>
        {summary && (
          <section style={{ marginBottom: '32px' }}>
            <SectionTitle title="Summary" dark={dark} />
            <p style={{ lineHeight: '22px', color: 'rgba(0,0,0,0.75)' }}>{summary}</p>
          </section>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 240px', gap: '48px' }}>
          <div>
            <section style={{ marginBottom: '28px' }}>
              <SectionTitle title="Experience" dark={dark} />
              {experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                    <p style={{ fontWeight: 700, fontSize: '15px', margin: 0 }}>{exp.position}</p>
                    <span style={{ fontSize: '11px', color: 'rgba(0,0,0,0.4)', whiteSpace: 'nowrap' }}>
                      {exp.startDate}{exp.endDate ? ` – ${exp.endDate}` : ''}
                    </span>
                  </div>
                  <p style={{ color: dark, margin: '0 0 8px', fontSize: '13px', opacity: 0.7 }}>{exp.company}</p>
                  <ul style={{ margin: 0, paddingLeft: '14px' }}>
                    {exp.responsibilities.filter(Boolean).map((r, i) => (
                      <li key={i} style={{ marginBottom: '3px', lineHeight: '20px', color: 'rgba(0,0,0,0.75)' }}>{r}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            <section>
              <SectionTitle title="Education" dark={dark} />
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '12px' }}>
                  <p style={{ fontWeight: 700, margin: 0 }}>{edu.degree}</p>
                  <p style={{ color: dark, opacity: 0.7, margin: '2px 0', fontSize: '13px' }}>{edu.institution}</p>
                  {(edu.startDate || edu.endDate) && (
                    <span style={{ fontSize: '12px', color: 'rgba(0,0,0,0.4)' }}>
                      {edu.startDate}{edu.endDate ? ` – ${edu.endDate}` : ''}
                    </span>
                  )}
                </div>
              ))}
            </section>
          </div>

          <div>
            <section style={{ marginBottom: '28px' }}>
              <SectionTitle title="Skills" dark={dark} />
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {skills.map((s) => (
                  <li key={s.id} style={{ fontSize: '13px', color: 'rgba(0,0,0,0.75)', borderLeft: `3px solid ${dark}`, paddingLeft: '8px' }}>
                    <strong>{s.name}</strong>{s.category ? ` — ${s.category}` : ''}
                  </li>
                ))}
              </ul>
            </section>

            {links.length > 0 && (
              <section>
                <SectionTitle title="Links" dark={dark} />
                {links.map((l) => (
                  <a key={l.id} href={l.url} style={{ display: 'block', color: dark, textDecoration: 'underline', fontSize: '13px', marginBottom: '6px' }}>{l.label}</a>
                ))}
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function SectionTitle({ title, dark }) {
  return (
    <div style={{ marginBottom: '12px', borderBottom: `2px solid ${dark}30`, paddingBottom: '6px' }}>
      <h2 style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: dark, margin: 0 }}>{title}</h2>
    </div>
  )
}
