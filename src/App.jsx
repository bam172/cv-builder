import { Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import FormPage from './pages/FormPage'
import TemplatePage from './pages/TemplatePage'
import EditorPage from './pages/EditorPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/form" element={<FormPage />} />
      <Route path="/templates" element={<TemplatePage />} />
      <Route path="/editor" element={<EditorPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
