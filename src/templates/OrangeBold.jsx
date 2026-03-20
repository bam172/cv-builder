/* eslint-disable react/prop-types */
// Template: Orange Bold — header orange, sidebar gelap, foto bulat, Poppins/Lato
export default function OrangeBold({ data, withPhoto, fontOverride, colorOverride }) {
  const { name, job_title, email, phone, address, summary, skills, experience, education, links, photo } = data
  const orange = colorOverride || 'rgba(239,108,0,1)'
  const sidebarDark = '#424242'
  const baseFont = fontOverride || "'Lato', sans-serif"

  return (
    <div id="cv-preview" style={{
      display: 'grid',
      gridTemplateColumns: '32px 260px 1fr',
      width: '956px',
      minHeight: '1100px',
      background: '#fff',
      fontFamily: baseFont,
      fontSize: '14px',
      fontWeight: 500,
      color: 'rgba(0,0,0,0.87)',
    }}>
      {/* Thin left orange column */}
      <div style={{ background: orange, height: '176px' }} />

      {/* ── SIDEBAR ── */}
      <aside style={{
        background: sidebarDark,
        display: 'flex',
        flexDirection: 'column',
        padding: '48px 32px',
        gap: '24px',
      }}>
        {/* Avatar */}
        {withPhoto && photo && (
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
            <div style={{
              width: '140px', height: '140px',
              borderRadius: '50%',
              overflow: 'hidden',
              flexShrink: 0,
              border: '3px solid rgba(255,255,255,0.3)',
            }}>
              <img src={photo} alt="avatar" style={{
                width: '100%', height: '100%',
                objectFit: 'cover', objectPosition: 'center top',
                display: 'block',
              }} />
            </div>
          </div>
        )}

        {/* Contacts */}
        <section style={{ borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '24px' }}>
          <h2 style={sidebarTitle}>Contacts</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '12px' }}>
            {email && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <div style={iconCircle}>✉</div>
                <a href={`mailto:${email}`} style={{ color: '#fff', fontSize: '13px', textAlign: 'center', wordBreak: 'break-all' }}>{email}</a>
              </div>
            )}
            {address && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <div style={iconCircle}>📍</div>
                <p style={{ color: '#fff', fontSize: '13px', textAlign: 'center' }}>{address}</p>
              </div>
            )}
            {phone && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <div style={iconCircle}>📱</div>
                <a href={`tel:${phone}`} style={{ color: '#fff', fontSize: '13px', textAlign: 'center' }}>{phone}</a>
              </div>
            )}
          </div>
        </section>

        {/* Education */}
        {education.length > 0 && (
          <section>
            <h2 style={sidebarTitle}>Education</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: '12px 0 0 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {education.map((edu) => (
                <li key={edu.id} style={{ position: 'relative' }}>
                  <div style={{
                    position: 'absolute', top: '8px', left: '-16px',
                    width: '8px', height: '8px', borderRadius: '50%', background: '#fff',
                  }} />
                  <p style={{ color: '#fff', fontSize: '14px', fontWeight: 600, lineHeight: '20px' }}>{edu.degree}</p>
                  {edu.institution && <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px' }}>{edu.institution}</p>}
                  {(edu.startDate || edu.endDate) && (
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px' }}>
                      {edu.startDate}{edu.endDate ? ` – ${edu.endDate}` : ''}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 style={sidebarTitle}>Skills</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: '12px 0 0', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {skills.map((s) => (
                <li key={s.id} style={{ color: 'rgba(255,255,255,0.85)', fontSize: '13px', lineHeight: '20px' }}>
                  • {s.name}{s.category ? ` — ${s.category}` : ''}
                </li>
              ))}
            </ul>
          </section>
        )}
      </aside>

      {/* ── MAIN ── */}
      <main style={{ display: 'flex', flexDirection: 'column' }}>
        {/* Orange header */}
        <header style={{
          background: orange,
          height: '176px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 40px',
        }}>
          <div>
            <p style={{ color: '#fff', fontFamily: "'Libre Franklin', 'Inter', sans-serif", fontSize: '16px', fontWeight: 600, letterSpacing: '1px', marginBottom: '6px', opacity: 0.9 }}>
              {job_title}
            </p>
            <h1 style={{
              color: '#fff',
              fontFamily: "'Libre Franklin', 'Inter', sans-serif",
              fontSize: '36px', fontWeight: 700, lineHeight: '42px',
              textTransform: 'uppercase', letterSpacing: '1px',
              wordBreak: 'break-word',
            }}>
              {name}
            </h1>
          </div>
        </header>

        {/* Content sections */}
        <div style={{ padding: '32px 40px 48px', display: 'flex', flexDirection: 'column', gap: '0' }}>

          {/* Summary */}
          {summary && (
            <section style={mainSection}>
              <h2 style={mainTitle}>Professional Summary</h2>
              <p style={{ lineHeight: '22px', color: 'rgba(0,0,0,0.75)' }}>{summary}</p>
            </section>
          )}

          {/* Experience */}
          <section style={mainSection}>
            <h2 style={mainTitle}>Work Experience</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {experience.map((exp) => (
                <div key={exp.id}>
                  <p style={{ fontSize: '12px', color: 'rgba(0,0,0,0.5)', marginBottom: '3px' }}>
                    {exp.startDate}{exp.endDate ? ` – ${exp.endDate}` : ''}
                  </p>
                  <p style={{ fontSize: '15px', fontWeight: 500, lineHeight: '22px', marginBottom: '6px' }}>
                    <strong>{exp.position}</strong>
                    {exp.company && <span style={{ color: 'rgba(0,0,0,0.6)', fontWeight: 400 }}> — {exp.company}</span>}
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    {exp.responsibilities.filter(Boolean).map((r, i) => (
                      <li key={i} style={{ fontSize: '13px', lineHeight: '20px', color: 'rgba(0,0,0,0.75)' }}>• {r}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Links */}
          {links.length > 0 && (
            <section style={{ ...mainSection, borderBottom: 'none' }}>
              <h2 style={mainTitle}>Links</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '8px 24px' }}>
                {links.map((l) => (
                  <a key={l.id} href={l.url} style={{ color: orange, textDecoration: 'underline', fontSize: '14px' }}>{l.label}</a>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  )
}

const sidebarTitle = {
  color: '#fff',
  fontFamily: "Poppins, 'Inter', sans-serif",
  fontSize: '14px', fontWeight: 600, letterSpacing: '1px',
  textTransform: 'uppercase',
}

const iconCircle = {
  width: '28px', height: '28px', borderRadius: '50%',
  background: '#fff', display: 'flex', alignItems: 'center',
  justifyContent: 'center', fontSize: '14px', flexShrink: 0,
}

const mainSection = {
  display: 'flex', flexDirection: 'column', gap: '10px',
  paddingBottom: '20px', marginBottom: '20px',
  borderBottom: '2px solid rgba(0,0,0,0.08)',
}

const mainTitle = {
  fontFamily: "Poppins, 'Inter', sans-serif",
  fontSize: '16px', fontWeight: 600, letterSpacing: '1px',
  textTransform: 'uppercase', color: 'rgba(0,0,0,0.87)',
}
