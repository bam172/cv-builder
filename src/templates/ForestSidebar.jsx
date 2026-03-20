/* eslint-disable react/prop-types */
// Template: Forest Green Sidebar — sidebar hijau gelap, foto bulat, Barlow Semi Condensed
export default function ForestSidebar({ data, withPhoto, fontOverride, colorOverride }) {
  const { name, job_title, email, phone, address, summary, skills, experience, education, links, photo } = data
  const green = colorOverride || 'rgba(33,76,65,1)'
  return (
    <div id="cv-preview" style={{
      display: 'grid', gridTemplateColumns: '320px 1fr',
      width: '956px', minHeight: '1100px', background: '#fff',
      fontFamily: fontOverride || '"Barlow Semi Condensed","Tinos",sans-serif', fontSize: '14px',
      lineHeight: '16px', color: 'rgba(0,0,0,0.87)',
    }}>
      {/* SIDEBAR */}
      <aside style={{ background: green, color: '#fff', padding: '56px 40px 48px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Photo + Name block — always together */}
        <div style={{ textAlign: 'center', marginBottom: '4px' }}>
          {withPhoto && photo && (
            <div style={{ width: '91px', height: '91px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 12px', border: '2px solid #fff', flexShrink: 0 }}>
              <img src={photo} alt="photo" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
            </div>
          )}
          <h1 style={{ fontSize: '26px', fontWeight: 700, letterSpacing: '0.4px', marginBottom: '6px', lineHeight: '30px', wordBreak: 'break-word' }}>{name}</h1>
          <p style={{ fontSize: '14px', opacity: 0.85 }}>{job_title}</p>
        </div>
        <Sdiv />
        {/* Contacts */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingBottom: '32px' }}>
          <h2 style={sTitle}>Details</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px', wordBreak: 'break-word' }}>
            {address && <li>{address}</li>}
            {phone && <li><a href={`tel:${phone}`} style={{ color: '#fff' }}>{phone}</a></li>}
            {email && <li><a href={`mailto:${email}`} style={{ color: '#fff' }}>{email}</a></li>}
          </ul>
        </section>
        {/* Skills */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h2 style={sTitle}>Skills</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {skills.map((s) => (
              <li key={s.id} style={{ fontSize: '12px', lineHeight: '16px' }}>
                <p style={{ fontWeight: 600, marginBottom: '2px' }}>{s.name}</p>
                {s.category && <p style={{ opacity: 0.7, fontSize: '11px' }}>{s.category}</p>}
              </li>
            ))}
          </ul>
        </section>
      </aside>

      {/* MAIN */}
      <main style={{ display: 'flex', padding: '56px 56px 48px 40px', flexDirection: 'column', gap: '24px' }}>
        {summary && (
          <section>
            <h2 style={mTitle(green)}>Professional Summary</h2>
            <p style={{ lineHeight: '20px' }}>{summary}</p>
          </section>
        )}
        <section>
          <h2 style={mTitle(green)}>Work Experience</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {experience.map((exp) => (
              <div key={exp.id}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '10px' }}>
                  <p style={{ fontWeight: 700, fontSize: '16px' }}>
                    {exp.position}{exp.company ? `, ${exp.company}` : ''}
                  </p>
                  <span style={{ fontSize: '12px', color: 'rgba(0,0,0,0.6)' }}>
                    {exp.startDate}{exp.endDate ? ` – ${exp.endDate}` : ''}
                  </span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {exp.responsibilities.filter(Boolean).map((r, i) => (
                    <li key={i} style={{ display: 'flex' }}><span style={{ marginRight: '4px' }}>•</span><div>{r}</div></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h2 style={mTitle(green)}>Education</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {education.map((edu) => (
              <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p style={{ fontWeight: 700, fontSize: '16px' }}>{edu.degree}{edu.institution ? `, ${edu.institution}` : ''}</p>
                {(edu.startDate || edu.endDate) && (
                  <span style={{ fontSize: '12px', color: 'rgba(0,0,0,0.6)' }}>
                    {edu.startDate}{edu.endDate ? ` – ${edu.endDate}` : ''}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
        {links.length > 0 && (
          <section>
            <h2 style={mTitle(green)}>Links</h2>
            <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '16px 40px', listStyle: 'none', padding: 0 }}>
              {links.map((l) => <li key={l.id}><a href={l.url} style={{ textDecoration: 'underline' }}>{l.label}</a></li>)}
            </ul>
          </section>
        )}
      </main>
    </div>
  )
}
function Sdiv() {
  return <div style={{ height: '0.5px', width: '220px', background: 'rgba(255,255,255,0.5)', margin: '0 0 8px' }} />
}
const sTitle = { fontSize: '20px', letterSpacing: '0.58px', fontWeight: 700, color: '#fff', marginBottom: '8px' }
const mTitle = (color) => ({
  fontSize: '20px', fontWeight: 700, marginBottom: '16px',
  letterSpacing: '0.58px', color, borderBottom: '1px solid rgba(0,0,0,0.12)', paddingBottom: '8px',
})
