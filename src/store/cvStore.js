import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const defaultCV = {
  // Personal
  name: 'Bambang Priambodo',
  job_title: 'Senior OSS Engineer',
  email: 'bpriambodo17@gmail.com',
  phone: '+62 821 3476 9104',
  address: 'Jln.Beringin Asri Barat, Kota Semarang, ID',
  photo: null, // base64 string

  // Summary
  summary:
    'Telecommunications Data Analyst with 8+ years of experience in network performance analysis, OSS operations, and KPI monitoring across major telecom projects including Telkomsel and XL. Skilled in SQL, MySQL, Excel automation, Python scripting, and Tableau dashboards.',

  // Skills
  skills: [
    { id: 1, name: 'SQL', category: 'Database' },
    { id: 2, name: 'MySQL', category: 'Database' },
    { id: 3, name: 'Python', category: 'Programming' },
    { id: 4, name: 'Excel', category: 'Analytics' },
    { id: 5, name: 'Tableau', category: 'Analytics' },
    { id: 6, name: 'Excel Macro', category: 'Automation' },
  ],

  // Experience
  experience: [
    {
      id: 1,
      position: 'Senior OSS Engineer',
      company: 'PT Nexwave',
      startDate: 'Feb 2025',
      endDate: 'Present',
      responsibilities: [
        'Designed automated dashboards for 2G/4G/5G network performance monitoring',
        'Developed Telegram Bot integrated with MySQL database to automate KPI reporting',
        'Performed signaling trace analysis to diagnose network performance issues',
      ],
    },
    {
      id: 2,
      position: 'Senior OSS Engineer',
      company: 'PT Poca Jaringan Solusi',
      startDate: 'Jun 2023',
      endDate: 'Jan 2025',
      responsibilities: [
        'Conducted Network Performance Testing (NPT) for telecom sites',
        'Developed Excel Macro automation to consolidate multiple network reports',
        'Built SQL data ingestion pipeline to process CSV telecom datasets',
      ],
    },
    {
      id: 3,
      position: 'OSS Engineer',
      company: 'Lintas Media Telekomunikasi',
      startDate: 'Dec 2015',
      endDate: 'Mar 2020',
      responsibilities: [
        'Processed telecom raw data using SQL databases',
        'Developed Excel dashboards for network KPI performance analysis',
        'Monitored drive test data and network site activity',
      ],
    },
  ],

  // Education
  education: [
    {
      id: 1,
      degree: 'Diploma Degree',
      institution: 'AMIKOM Cipta Darma',
      startDate: '',
      endDate: '',
      notes: '',
    },
  ],

  // Links
  links: [
    { id: 1, label: 'Email', url: 'mailto:bpriambodo17@gmail.com' },
    { id: 2, label: 'LinkedIn', url: 'https://linkedin.com/in/' },
  ],
}

export const useCVStore = create(
  persist(
    (set, get) => ({
      cvData: defaultCV,
      selectedTemplate: 'modern-sidebar',
      selectedFont: 'default',
      selectedColor: 'default',
      withPhoto: false,

      updateCV: (updates) =>
        set((state) => ({ cvData: { ...state.cvData, ...updates } })),

      setTemplate: (templateId) => set({ selectedTemplate: templateId }),
      setFont: (font) => set({ selectedFont: font }),
      setColor: (color) => set({ selectedColor: color }),
      setWithPhoto: (val) => set({ withPhoto: val }),

      // Skills
      addSkill: () =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            skills: [
              ...state.cvData.skills,
              { id: Date.now(), name: '', category: '' },
            ],
          },
        })),
      updateSkill: (id, field, value) =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            skills: state.cvData.skills.map((s) =>
              s.id === id ? { ...s, [field]: value } : s
            ),
          },
        })),
      removeSkill: (id) =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            skills: state.cvData.skills.filter((s) => s.id !== id),
          },
        })),

      // Experience
      addExperience: () =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            experience: [
              ...state.cvData.experience,
              {
                id: Date.now(),
                position: '',
                company: '',
                startDate: '',
                endDate: '',
                responsibilities: [''],
              },
            ],
          },
        })),
      updateExperience: (id, field, value) =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            experience: state.cvData.experience.map((e) =>
              e.id === id ? { ...e, [field]: value } : e
            ),
          },
        })),
      removeExperience: (id) =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            experience: state.cvData.experience.filter((e) => e.id !== id),
          },
        })),

      // Education
      addEducation: () =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            education: [
              ...state.cvData.education,
              { id: Date.now(), degree: '', institution: '', startDate: '', endDate: '', notes: '' },
            ],
          },
        })),
      updateEducation: (id, field, value) =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            education: state.cvData.education.map((e) =>
              e.id === id ? { ...e, [field]: value } : e
            ),
          },
        })),
      removeEducation: (id) =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            education: state.cvData.education.filter((e) => e.id !== id),
          },
        })),

      // Links
      addLink: () =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            links: [...state.cvData.links, { id: Date.now(), label: '', url: '' }],
          },
        })),
      updateLink: (id, field, value) =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            links: state.cvData.links.map((l) =>
              l.id === id ? { ...l, [field]: value } : l
            ),
          },
        })),
      removeLink: (id) =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            links: state.cvData.links.filter((l) => l.id !== id),
          },
        })),

      resetCV: () => set({ cvData: defaultCV }),
    }),
    { name: 'cv-builder-storage' }
  )
)
