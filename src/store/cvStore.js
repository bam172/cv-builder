import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const defaultCV = {
  name: '',
  job_title: '',
  email: '',
  phone: '',
  address: '',
  photo: null,
  summary: '',
  skills: [],
  experience: [],
  education: [],
  links: [],
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
