/* eslint-disable react/prop-types */
// Template: Navy Right Sidebar — sidebar kanan navy, main kiri, font Arimo/Arial
export default function NavySidebar({ data, withPhoto, fontOverride, colorOverride }) {
  const { name, job_title, email, phone, address, summary, skills, experience, education, links, photo } = data
  const accent = colorOverride || '#62A2F8'
  const navy = colorOverride || 'rgba(18,41,74,1)'
  return (
    <div id="cv-preview" style={{
      display: 'grid', gridTemplateColumns: '1fr 320px', alignItems: 'start',
      width: '956px', minHeight: '1100px', background: '#fff',
      fontFamily: fontOverride || "'Arial','Arimo',sans-serif", fontSize: '14px',
      lineHeight: '18px', color: 'rgba(0,0,0,0.87)',
    }}>
      {/* MAIN LEFT */}
      <main style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '52px 40px 48px 56px' }}>
        <header>
          <h1 style={{ fontSize: '36px', fontWeight: 700, textTransform: 'uppercase', lineHeight: '40px', marginBottom: '8px', color: 'rgba(0,0,0,0.87)' }}>{name}</h1>
          <h2 style={{ fontWeight: 700, fontSize: '20px', color: accent, letterSpacing: '1.5px' }}>{job_title}</h2>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '12px', fontSize: '13px', color: 'rgba(0,0,0,0.6)' }}>
            {phone && <span>📱 {phone}</span>}
            {email && <span>✉ {email}</span>}
            {address && <span>📍 {address}</span>}
          </div>
        </header>

        {summary && (
          <section style={{ borderTop: '1px solid rgba(0,0,0,0.12)', paddingTop: '20px' }}>
            <h2 style={mainSubtitle(navy)}>Professional Summary</h2>
            <p style={{ lineHeight: '22px', letterSpacing: '0.28px' }}>{summary}</p>
          </section>
        )}

        <section style={{ borderTop: '1px solid rgba(0,0,0,0.12)', paddingTop: '20px' }}>
          <h2 style={{ ...mainSubtitle(navy), marginBottom: '16px' }}>Work Experience</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {experience.map((exp) => (
              <div key={exp.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', marginBottom: '4px' }}>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '16px', color: accent }}>{exp.position}</p>
                    <p style={{ fontWeight: 700, fontSize: '16px' }}>{exp.company}</p>
                  </div>
                  <span style={{ fontSize: '12px', color: 'rgba(0,0,0,0.6)', whiteSpace: 'nowrap', textAlign: 'right' }}>
                    {exp.startDate}{exp.endDate ? ` – ${exp.endDate}` : ''}
                  </span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {exp.responsibilities.filter(Boolean).map((r, i) => (
                    <li key={i} style={{ display: 'flex', marginBottom: '6px', letterSpacing: '0.28px' }}>
                      <span style={{ marginRight: '5px' }}>•</span><div>{r}</div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section style={{ borderTop: '1px solid rgba(0,0,0,0.12)', paddingTop: '20px' }}>
          <h2 style={{ ...mainSubtitle(navy), marginBottom: '12px' }}>Education</h2>
          {education.map((edu) => (
            <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div>
                <p style={{ fontWeight: 700, fontSize: '16px', color: accent }}>{edu.degree}</p>
                <p style={{ fontWeight: 700 }}>{edu.institution}</p>
              </div>
              {(edu.startDate || edu.endDate) && (
                <span style={{ fontSize: '12px', color: 'rgba(0,0,0,0.6)' }}>
                  {edu.startDate}{edu.endDate ? ` – ${edu.endDate}` : ''}
                </span>
              )}
            </div>
          ))}
        </section>

        {links.length > 0 && (
          <section style={{ borderTop: '1px solid rgba(0,0,0,0.12)', paddingTop: '20px' }}>
            <h2 style={{ ...mainSubtitle(navy), marginBottom: '12px' }}>Links</h2>
            <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '16px 40px', listStyle: 'none', padding: 0 }}>
              {links.map((l) => <li key={l.id}><a href={l.url} style={{ textDecoration: 'underline' }}>{l.label}</a></li>)}
            </ul>
          </section>
        )}
      </main>

      {/* SIDEBAR RIGHT */}
      <aside style={{ background: navy, color: '#fff', padding: '40px 40px 48px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {withPhoto && photo && (
          <div style={{ textAlign: 'center', marginBottom: '8px' }}>
            <div style={{ width: '128px', height: '128px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto' }}>
              <img src={photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
            </div>
          </div>
        )}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h2 style={{ fontSize: '16px', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>Skills</h2>
          <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.3)', marginBottom: '8px' }} />
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', opacity: 0.85 }}>
            {skills.map((s) => (
              <li key={s.id} style={{ display: 'flex' }}>
                <span style={{ marginRight: '8px' }}>•</span>
                <div>{s.name}{s.category ? `: ${s.category}` : ''}</div>
              </li>
            ))}
          </ul>
        </section>
      </aside>
    </div>
  )
}
const mainSubtitle = (color) => ({
  fontSize: '20px', textTransform: 'uppercase', letterSpacing: '1.5px',
  lineHeight: '28px', fontWeight: 700, marginBottom: '8px', color,
})
