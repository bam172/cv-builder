// CVStyleInjector: only handles FONT override via CSS injection
// Color changes are now handled directly in each template via colorOverride prop
import { useEffect } from 'react'
import { getFontValue } from './FontColorPanel'
import { useCVStore } from '../store/cvStore'

export default function CVStyleInjector() {
  const { selectedFont } = useCVStore()

  useEffect(() => {
    const styleId = 'cv-override-style'
    let el = document.getElementById(styleId)
    if (!el) {
      el = document.createElement('style')
      el.id = styleId
      document.head.appendChild(el)
    }
    const fontVal = getFontValue(selectedFont)
    el.textContent = fontVal
      ? `#cv-preview, #cv-preview * { font-family: ${fontVal} !important; }`
      : ''
  }, [selectedFont])

  return null
}
