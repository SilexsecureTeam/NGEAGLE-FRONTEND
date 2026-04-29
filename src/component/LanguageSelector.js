import React, { useState } from 'react'
import '../style/languageSelector.css'

// const languages = ['en', 'yo', 'ha', 'ig']
const languages = [
  {
    language: 'English',
    value: 'en',
  },
  {
    language: 'Yoruba',
    value: 'yo',
  },
  {
    language: 'Hausa',
    value: 'ha',
  },
  {
    language: 'Igbo',
    value: 'ig',
  },
]

const LanguageSelector = () => {
  const [selectedLang, setSelectedLang] = useState(
    document.querySelector('#google_translate_element select:last-child')?.value ?? 'en'
  )

  const handleTranslate = (e) => {
    if (window.google && window.google.translate) {
      const selectElement = document.querySelector(
        '#google_translate_element select:last-child'
      )
      if (selectElement) {
        for (let index = 0; index < selectElement.children.length; index++) {
          const element = selectElement.children[index]
          if (element.value === e) {
            selectElement.value = e
            selectElement.dispatchEvent(new Event('change'))
            setSelectedLang(e)
          }
        }
      }
    }
  }
  return (
    <select
      className="language_container"
      onChange={(e) => handleTranslate(e.target.value)}
    >
      {languages.map(({ language, value }, index) => (
        <option
          value={value}
          className={selectedLang === value ? 'active' : ''}
          key={index}
        >
          {language}
        </option>
      ))}
    </select>
  )
}

export default LanguageSelector
