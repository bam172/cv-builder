/* eslint-disable react/prop-types */
export default function Classic({ data, withPhoto, fontOverride, colorOverride }) {
  const { name, job_title, email, phone, address, summary, skills, experience, education, links } = data
  const accent = colorOverride || '#2d4a8a'

  return (
    <div
      id="cv-preview"
      className="cv-scope"
      style={{
        width: '956px',
        minHeight: '1100px', height: 'auto',
        background: '#fff',
        fontFamily: fontOverride || '"Tinos", serif',
        fontSize: '14px',
        lineHeight: '18px',
        color: 'rgba(0,0,0,0.87)',
        padding: '56px 64px',
      }}
    >
      {/* Header */}
      <header style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '42px', fontWeight: 700, color: 'rgba(0,0,0,0.87)', margin: 0, lineHeight: '52px' }}>{name}</h1>
        <p style={{ fontSize: '18px', color: 'rgba(0,0,0,0.6)', fontWeight: 700, margin: '6px 0 16px' }}>{job_title}</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', fontSize: '12px', color: 'rgba(0,0,0,0.6)' }}>
          {email && <span>{email}</span>}
          {phone && <span>{phone}</span>}
          {address && <span>{address}</span>}
        </div>
      </header>

      <hr style={{ border: 'none', borderTop: `2px solid ${accent}`, margin: '0 0 24px' }} />

      {/* Summary */}
      {summary && (
        <section style={{ marginBottom: '24px' }}>
          <SectionTitle title="Professional Summary" accent={accent} />
          <p style={{ lineHeight: '22px' }}>{summary}</p>
        </section>
      )}

      {/* Experience */}
      <section style={{ marginBottom: '24px' }}>
        <SectionTitle title="Work Experience" accent={accent} />
        {experience.map((exp) => (
          <div key={exp.id} style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <p style={{ fontWeight: 700, fontSize: '15px', margin: 0 }}>{exp.position}</p>
              <span style={{ fontSize: '12px', color: 'rgba(0,0,0,0.5)' }}>
                {exp.startDate}{exp.endDate ? ` – ${exp.endDate}` : ''}
              </span>
            </div>
            <p style={{ color: accent, margin: '2px 0 8px', fontSize: '13px' }}>{exp.company}</p>
            <ul style={{ margin: 0, paddingLeft: '16px' }}>
              {exp.responsibilities.filter(Boolean).map((r, i) => (
                <li key={i} style={{ marginBottom: '4px', lineHeight: '20px' }}>{r}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Education */}
      <section style={{ marginBottom: '24px' }}>
        <SectionTitle title="Education" accent={accent} />
        {education.map((edu) => (
          <div key={edu.id} style={{ marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p style={{ fontWeight: 700, margin: 0 }}>{edu.degree}</p>
              <span style={{ fontSize: '12px', color: 'rgba(0,0,0,0.5)' }}>
                {edu.startDate}{edu.endDate ? ` – ${edu.endDate}` : ''}
              </span>
            </div>
            <p style={{ color: accent, margin: '2px 0', fontSize: '13px' }}>{edu.institution}</p>
          </div>
        ))}
      </section>

      {/* Skills */}
      <section style={{ marginBottom: '24px' }}>
        <SectionTitle title="Skills" accent={accent} />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {skills.map((s) => (
            <span key={s.id} style={{
              background: `${accent}15`,
              color: accent,
              border: `1px solid ${accent}30`,
              borderRadius: '4px',
              padding: '4px 10px',
              fontSize: '13px',
            }}>
              {s.name}
            </span>
          ))}
        </div>
      </section>

      {/* Links */}
      {links.length > 0 && (
        <section>
          <SectionTitle title="Links" accent={accent} />
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {links.map((l) => (
              <a key={l.id} href={l.url} style={{ color: accent, textDecoration: 'underline', fontSize: '13px' }}>{l.label}</a>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function SectionTitle({ title, accent }) {
  return (
    <div style={{ marginBottom: '12px' }}>
      <h2 style={{
        fontSize: '13px',
        fontWeight: 700,
        letterSpacing: '1.5px',
        textTransform: 'uppercase',
        color: accent,
        margin: '0 0 6px',
      }}>{title}</h2>
      <div style={{ height: '1px', background: `${accent}40` }} />
    </div>
  )
}
