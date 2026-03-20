/* eslint-disable react/prop-types */
export default function ModernSidebar({ data, withPhoto, fontOverride, colorOverride }) {
  const { name, job_title, email, phone, address, summary, skills, experience, education, links, photo } = data

  return (
    <div
      id="cv-preview"
      className="cv-scope"
      style={{
        display: 'grid',
        gridTemplateColumns: '320px 1fr',
        width: '956px',
        minHeight: '1100px',
        background: '#fff',
        fontFamily: fontOverride || '"Tinos", serif',
        fontSize: '14px',
        lineHeight: '18px',
        color: 'rgba(0,0,0,0.87)',
      }}
    >
      <aside style={{ background: colorOverride || 'rgba(73,162,189,1)', color: '#fff', display: 'flex', flexDirection: 'column', gridRow: '1 / -1' }}>

        <div style={{
          background: '#404040',
          padding: '32px 40px 28px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: withPhoto ? 'center' : 'flex-start',
          gap: '20px',
        }}>

          {withPhoto && (
            <div style={{
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '3px solid rgba(255,255,255,0.8)',
              flexShrink: 0,
            }}>
              {photo ? (
                <img
                  src={photo}
                  alt="Profile"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    display: 'block',
                  }}
                />
              ) : (
                <div style={{ width: '100%', background: '#555', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#aaa', fontSize: '12px' }}>No photo</span>
                </div>
              )}
            </div>
          )}

          <address style={{ fontStyle: 'normal', width: '100%' }}>
            <ContactBlock email={email} phone={phone} address={address} />
          </address>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px 40px 48px' }}>
          <section style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h2 style={subtitleStyle}>Professional Summary</h2>
            <p style={{ lineHeight: '20px' }}>{summary}</p>
          </section>
          <Divider />
          <section style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h2 style={subtitleStyle}>Skills</h2>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {skills.map((s) => (
                <li key={s.id} style={{ display: 'flex' }}>
                  <span style={{ marginRight: '8px' }}>•</span>
                  <div>{s.name}{s.category ? `: ${s.category}` : ''}</div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </aside>

      <main style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '52px 56px 48px 40px', background: '#fff' }}>
        <header style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h1 style={{ fontSize: '48px', lineHeight: '56px', fontWeight: 700, color: 'rgba(73,162,189,1)', margin: 0 }}>{name}</h1>
          <span style={{ fontWeight: 700, fontSize: '20px', lineHeight: '24px', color: 'rgba(0,0,0,0.6)' }}>{job_title}</span>
        </header>

        <MainDivider color={colorOverride || 'rgba(73,162,189,1)'} />
        <section>
          <h2 style={{ ...subtitleMainStyle, marginBottom: '16px' }}>Work Experience</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {experience.map((exp) => (
              <div key={exp.id} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '12px', color: 'rgba(0,0,0,0.6)', lineHeight: '20px' }}>
                    {exp.startDate}{exp.startDate && exp.endDate ? ' — ' : ''}{exp.endDate}
                  </span>
                  <p style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>{exp.position}{exp.company ? `, ${exp.company}` : ''}</p>
                </div>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {exp.responsibilities.filter(Boolean).map((r, i) => (
                    <li key={i} style={{ display: 'flex' }}>
                      <span style={{ marginRight: '4px' }}>•</span>
                      <div>{r}</div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <MainDivider color={colorOverride || 'rgba(73,162,189,1)'} />
        <section style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h2 style={subtitleMainStyle}>Education</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {education.map((edu) => (
              <div key={edu.id} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {(edu.startDate || edu.endDate) && (
                  <span style={{ fontSize: '12px', color: 'rgba(0,0,0,0.6)' }}>
                    {edu.startDate}{edu.startDate && edu.endDate ? ' — ' : ''}{edu.endDate}
                  </span>
                )}
                <p style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>{edu.degree}{edu.institution ? `, ${edu.institution}` : ''}</p>
                {edu.notes && <p style={{ margin: 0, fontSize: '13px', color: 'rgba(0,0,0,0.6)' }}>{edu.notes}</p>}
              </div>
            ))}
          </div>
        </section>

        {links.length > 0 && (
          <>
            <MainDivider color={colorOverride || 'rgba(73,162,189,1)'} />
            <section style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h2 style={subtitleMainStyle}>Links</h2>
              <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px 40px', listStyle: 'none', margin: 0, padding: 0 }}>
                {links.map((l) => (
                  <li key={l.id}><a href={l.url} style={{ textDecoration: 'underline' }}>{l.label}</a></li>
                ))}
              </ul>
            </section>
          </>
        )}
      </main>
    </div>
  )
}

function ContactBlock({ email, phone, address }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <h2 style={{ ...subtitleStyle, color: '#fff', marginBottom: '4px' }}>Contacts</h2>
      {address && (
        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white" style={{ flexShrink: 0, marginTop: '1px' }}>
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          <p style={{ margin: 0, wordBreak: 'break-word', lineHeight: '18px' }}>{address}</p>
        </div>
      )}
      {phone && (
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
            <path d="M7 23C6.45 23 5.975 22.8 5.575 22.4C5.19 22 5 21.55 5 21V3C5 2.45 5.19 1.98 5.575 1.6C5.975 1.2 6.45 1 7 1H17C17.55 1 18.02 1.2 18.4 1.6C18.8 1.98 19 2.45 19 3V21C19 21.55 18.8 22 18.4 22.4C18.02 22.8 17.55 23 17 23H7ZM7 18H17V6H7V18Z" fill="white"/>
          </svg>
          <a href={`tel:${phone}`} style={{ color: '#fff' }}>{phone}</a>
        </div>
      )}
      {email && (
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
            <path d="M4 20C3.45 20 2.975 19.8 2.575 19.4C2.19 19 2 18.55 2 18V6C2 5.45 2.19 4.98 2.575 4.6C2.975 4.2 3.45 4 4 4H20C20.55 4 21.02 4.2 21.4 4.6C21.8 4.98 22 5.45 22 6V18C22 18.55 21.8 19 21.4 19.4C21.02 19.8 20.55 20 20 20H4ZM12 13L20 8H4L12 13Z" fill="white"/>
          </svg>
          <a href={`mailto:${email}`} style={{ color: '#fff' }}>{email}</a>
        </div>
      )}
    </div>
  )
}

function Divider() {
  return <div style={{ height: '2px', width: '240px', background: 'rgba(255,255,255,0.4)', margin: '4px 0' }} />
}

function MainDivider({ color }) {
  return <div style={{ height: '2px', width: '100%', background: color || 'rgba(73,162,189,1)', marginTop: '-8px' }} />
}

const subtitleStyle = {
  fontWeight: 700, fontSize: '13px', lineHeight: '20px',
  letterSpacing: '1.5px', textTransform: 'uppercase', margin: 0,
}

const subtitleMainStyle = {
  fontWeight: 700, fontSize: '18px', lineHeight: '28px',
  letterSpacing: '1.5px', textTransform: 'uppercase', margin: 0,
  color: 'rgba(0,0,0,0.87)',
}
