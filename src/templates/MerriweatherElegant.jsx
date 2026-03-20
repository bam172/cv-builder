/* eslint-disable react/prop-types */
// Template: Merriweather Elegant — centered header, grey title banners, dotted dividers
export default function MerriweatherElegant({ data, withPhoto, fontOverride, colorOverride }) {
  const { name, job_title, email, phone, address, summary, skills, experience, education, links, photo } = data
  const accent = colorOverride || '#555555'
  const bannerBg = colorOverride ? lighten(colorOverride, 0.85) : '#EEE'
  return (
    <div id="cv-preview" style={{
      width: '956px', minHeight: '1100px', height: 'auto', background: '#fff',
      fontFamily: fontOverride || '"Merriweather",serif', fontSize: '14px', lineHeight: '1.5',
      color: 'rgba(0,0,0,0.87)',
    }}>
      <main style={{ display: 'flex', maxWidth: '956px', padding: '32px 56px', flexDirection: 'column', alignItems: 'flex-start', gap: '28px', margin: '0 auto' }}>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '3px' }}>
          {/* Header */}
          <header style={{
            display: 'flex', alignItems: withPhoto ? 'center' : 'flex-start',
            justifyContent: 'space-between', gap: '40px',
            paddingBottom: '24px', borderBottom: '1px solid rgba(0,0,0,0.64)',
            width: '100%',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              {withPhoto && photo && (
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '1px solid rgba(0,0,0,0.15)' }}>
                  <img src={photo} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
                </div>
              )}
              <div>
                <h1 style={{ fontSize: '32px', fontWeight: 900, lineHeight: '36px', letterSpacing: '0.5px', textAlign: withPhoto ? 'left' : 'center' }}>{name}</h1>
                <p style={{ fontSize: '16px', fontWeight: 900, lineHeight: '22px', marginTop: '4px' }}>{job_title}</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
              {address && <p style={{ color: 'rgba(0,0,0,0.6)', fontSize: '14px' }}>{address}</p>}
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                {phone && <a href={`tel:${phone}`} style={{ color: 'rgba(0,0,0,0.6)', fontSize: '14px' }}>{phone}</a>}
                {phone && email && <span style={{ color: 'rgba(0,0,0,0.6)' }}>•</span>}
                {email && <a href={`mailto:${email}`} style={{ color: 'rgba(0,0,0,0.6)', fontSize: '14px' }}>{email}</a>}
              </div>
            </div>
          </header>

          {/* Summary */}
          {summary && (
            <section style={{ paddingTop: '24px', width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <BannerTitle title="Professional Summary" bannerBg={bannerBg} accent={accent} />
              <p style={{ fontSize: '14px', lineHeight: '22px' }}>{summary}</p>
            </section>
          )}
        </div>

        {/* Experience */}
        <section style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <BannerTitle title="Work Experience" bannerBg={bannerBg} accent={accent} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {experience.map((exp) => (
              <div key={exp.id} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 700, fontSize: '16px' }}>{exp.company}</span>
                  </div>
                  <div style={{ flex: 1, height: '1px', borderBottom: '1px dashed rgba(0,0,0,0.12)' }} />
                  <span style={{ color: 'rgba(0,0,0,0.6)', fontSize: '16px', whiteSpace: 'nowrap' }}>
                    {exp.startDate}{exp.endDate ? ` – ${exp.endDate}` : ''}
                  </span>
                </div>
                <div style={{ paddingLeft: '28px' }}>
                  <p style={{ color: 'rgba(0,0,0,0.6)', fontSize: '14px', fontWeight: 300, marginBottom: '6px' }}>{exp.position}</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {exp.responsibilities.filter(Boolean).map((r, i) => (
                      <li key={i} style={{ position: 'relative', paddingLeft: '12px', fontSize: '14px', lineHeight: '22px' }}>
                        <span style={{ position: 'absolute', left: 0 }}>•</span>{r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <BannerTitle title="Education" bannerBg={bannerBg} accent={accent} />
          {education.map((edu) => (
            <div key={edu.id} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: 700, fontSize: '16px' }}>{edu.degree}</span>
                <div style={{ flex: 1, height: '1px', borderBottom: '1px dashed rgba(0,0,0,0.12)' }} />
                {(edu.startDate || edu.endDate) && (
                  <span style={{ color: 'rgba(0,0,0,0.6)', fontSize: '16px' }}>{edu.startDate}{edu.endDate ? ` – ${edu.endDate}` : ''}</span>
                )}
              </div>
              {edu.institution && <p style={{ paddingLeft: '28px', color: 'rgba(0,0,0,0.6)', fontSize: '14px', fontWeight: 300 }}>{edu.institution}</p>}
            </div>
          ))}
        </section>

        {/* Skills */}
        <section style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <BannerTitle title="Skills" bannerBg={bannerBg} accent={accent} />
          <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '10px 32px', listStyle: 'none', padding: 0 }}>
            {skills.map((s) => (
              <li key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ fontSize: '14px' }}>{s.name}</span>
                <div style={{ flex: 1, height: '1px', borderBottom: '1px dashed rgba(0,0,0,0.12)' }} />
                {s.category && <span style={{ color: 'rgba(0,0,0,0.6)', fontSize: '14px', textAlign: 'end' }}>{s.category}</span>}
              </li>
            ))}
          </ul>
        </section>

        {links.length > 0 && (
          <section style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <BannerTitle title="Links" bannerBg={bannerBg} accent={accent} />
            <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '10px 32px', listStyle: 'none', padding: 0 }}>
              {links.map((l) => <li key={l.id}><a href={l.url} style={{ textDecoration: 'underline', fontSize: '14px' }}>{l.label}</a></li>)}
            </ul>
          </section>
        )}
      </main>
    </div>
  )
}
function BannerTitle({ title, bannerBg, accent }) {
  return (
    <div style={{ display: 'flex', padding: '8px 0', justifyContent: 'center', background: bannerBg || '#EEE', width: '100%' }}>
      <h2 style={{ fontSize: '15px', fontWeight: 900, lineHeight: '22px', letterSpacing: '1px', textTransform: 'uppercase', color: accent || '#555' }}>{title}</h2>
    </div>
  )
}

function lighten(hex, f) {
  if (!hex?.startsWith('#')) return '#EEE'
  const n = parseInt(hex.slice(1), 16)
  const r = Math.min(255, Math.round(((n>>16)&0xff) + (255-((n>>16)&0xff))*f))
  const g = Math.min(255, Math.round(((n>>8)&0xff) + (255-((n>>8)&0xff))*f))
  const b = Math.min(255, Math.round((n&0xff) + (255-(n&0xff))*f))
  return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`
}
