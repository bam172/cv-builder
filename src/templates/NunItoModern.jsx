/* eslint-disable react/prop-types */
// Template: Nunito Modern — sidebar kiri dashed, header dengan blob kuning, skill pills, Nunito/Lato
export default function NunItoModern({ data, withPhoto, fontOverride, colorOverride }) {
  const { name, job_title, email, phone, address, summary, skills, experience, education, links, photo } = data
  const green = colorOverride || 'rgba(33,76,65,1)'
  return (
    <div id="cv-preview" style={{
      width: '956px', minHeight: '1100px', height: 'auto', background: '#fff',
      fontFamily: fontOverride || '"Lato",sans-serif', fontSize: '14px', fontWeight: 500,
      lineHeight: '22px', color: 'rgba(0,0,0,0.87)',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', padding: '48px 48px 80px', gap: '32px', maxWidth: '956px', margin: '0 auto' }}>
        {/* Header */}
        <header style={{
          display: 'flex', alignItems: 'center', gap: '16px',
          minHeight: '100px', padding: '16px 0 16px',
          paddingLeft: withPhoto ? '0' : '24px',
          backgroundImage: (() => {
            const blobColor = colorOverride ? hexToRgb(colorOverride, 0.25) : 'rgb(243,245,118)'
            return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='177' height='128' viewBox='0 0 177 128' fill='none'%3E%3Cpath d='M177 90C177 137.773 140.773 126 93 126C45.2274 126 0 120.273 0 72.5C0 24.7274 16.7274 0 64.5 0C112.273 0 177 42.2274 177 90Z' fill='${encodeURIComponent(blobColor)}'/%3E%3C/svg%3E")`
          })(),
          backgroundRepeat: 'no-repeat', backgroundSize: 'contain',
          backgroundPosition: withPhoto ? '40px 0' : '0 0',
        }}>
          {withPhoto && photo && (
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
              <img src={photo} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
            </div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <h1 style={{ fontFamily: 'Nunito,"Tinos",serif', fontSize: '30px', fontWeight: 800, lineHeight: '34px', margin: 0, wordBreak: 'break-word' }}>{name}</h1>
            <p style={{ fontSize: '15px', fontWeight: 600, margin: 0 }}>{job_title}</p>
          </div>
        </header>

        <div style={{ display: 'flex', flex: 1 }}>
          {/* Sidebar */}
          <aside style={{ flex: '0 1 260px', width: '260px', display: 'flex', flexDirection: 'column', gap: '32px', paddingRight: '32px', borderRight: '3px dashed rgba(0,0,0,0.12)' }}>
            <section style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h2 style={{ fontFamily: 'Nunito', fontSize: '20px', fontWeight: 800, color: green }}>Contacts</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {email && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={iconBox}>✉</div>
                    <a href={`mailto:${email}`} style={{ fontSize: '14px', wordBreak: 'break-all' }}>{email}</a>
                  </div>
                )}
                {address && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={iconBox}>📍</div>
                    <span style={{ fontSize: '14px' }}>{address}</span>
                  </div>
                )}
                {phone && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={iconBox}>📱</div>
                    <a href={`tel:${phone}`} style={{ fontSize: '14px' }}>{phone}</a>
                  </div>
                )}
              </div>
            </section>
            <section style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h2 style={{ fontFamily: 'Nunito', fontSize: '20px', fontWeight: 800, color: green }}>Skills</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {skills.map((s) => (
                  <div key={s.id} style={{
                    display: 'inline-flex', alignItems: 'center', padding: '4px 16px',
                    borderRadius: '40px', background: green, color: '#fff',
                    fontFamily: '"Nunito Sans","Tinos",sans-serif', fontSize: '14px', fontWeight: 600, lineHeight: '22px',
                  }}>
                    {s.name}
                  </div>
                ))}
              </div>
            </section>
          </aside>

          {/* Main */}
          <main style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '32px', paddingLeft: '32px' }}>
            {summary && (
              <section style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <h2 style={{ fontFamily: 'Nunito', fontSize: '20px', fontWeight: 800, color: green }}>Professional Summary</h2>
                <p style={{ lineHeight: '22px' }}>{summary}</p>
              </section>
            )}
            <section style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h2 style={{ fontFamily: 'Nunito', fontSize: '20px', fontWeight: 800, color: green }}>Work Experience</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {experience.map((exp) => (
                  <div key={exp.id} style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '32px' }}>
                    <div style={{ fontFamily: '"Nunito Sans"', fontSize: '16px', fontWeight: 700, lineHeight: '24px', paddingTop: '2px' }}>
                      {exp.startDate}{exp.endDate ? ` – ${exp.endDate}` : ''}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div>
                        <p style={{ fontFamily: '"Nunito Sans"', fontSize: '16px', fontWeight: 700 }}>{exp.position}</p>
                        <p style={{ color: 'rgba(0,0,0,0.6)', fontSize: '14px', fontWeight: 400 }}>{exp.company}</p>
                      </div>
                      <ul style={{ listStyle: 'disc', listStylePosition: 'inside', display: 'flex', flexDirection: 'column', gap: '4px', padding: 0, margin: 0 }}>
                        {exp.responsibilities.filter(Boolean).map((r, i) => (
                          <li key={i} style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>{r}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <section style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h2 style={{ fontFamily: 'Nunito', fontSize: '20px', fontWeight: 800, color: green }}>Education</h2>
              {education.map((edu) => (
                <div key={edu.id} style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '32px' }}>
                  <div style={{ fontFamily: '"Nunito Sans"', fontSize: '16px', fontWeight: 700 }}>
                    {edu.startDate || edu.endDate ? `${edu.startDate}${edu.endDate ? ` – ${edu.endDate}` : ''}` : ''}
                  </div>
                  <div>
                    <p style={{ fontFamily: '"Nunito Sans"', fontSize: '16px', fontWeight: 700 }}>{edu.degree}</p>
                    {edu.institution && <p style={{ color: 'rgba(0,0,0,0.6)', fontSize: '14px', fontWeight: 400 }}>{edu.institution}</p>}
                  </div>
                </div>
              ))}
            </section>
            {links.length > 0 && (
              <section style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h2 style={{ fontFamily: 'Nunito', fontSize: '20px', fontWeight: 800, color: green }}>Links</h2>
                <ul style={{ display: 'flex', alignItems: 'center', gap: '12px', listStyle: 'disc', listStylePosition: 'inside', padding: 0 }}>
                  {links.map((l) => (
                    <li key={l.id}><a href={l.url} style={{ fontFamily: '"Nunito Sans"', fontSize: '16px', textDecoration: 'underline' }}>{l.label}</a></li>
                  ))}
                </ul>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
const iconBox = {
  flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
  borderRadius: '8px', background: '#f3f576', width: '28px', height: '28px', fontSize: '14px',
}

function hexToRgb(hex, alpha) {
  if (!hex?.startsWith('#')) return 'rgb(243,245,118)'
  const n = parseInt(hex.slice(1), 16)
  const r = (n>>16)&0xff, g = (n>>8)&0xff, b = n&0xff
  // Lighten for blob background
  const lr = Math.min(255, Math.round(r + (255-r)*0.75))
  const lg = Math.min(255, Math.round(g + (255-g)*0.75))
  const lb = Math.min(255, Math.round(b + (255-b)*0.75))
  return alpha ? `rgba(${lr},${lg},${lb},${alpha*4})` : `rgb(${r},${g},${b})`
}
