import React, { useEffect } from 'react'

const GoogleTranslate = () => {
  const googleTranslateElementInit = () => {
    const supportedLanguages = ['en', 'yo', 'ha', 'ig']
    const includedLanguages = supportedLanguages.join(',')
    new window.google.translate.TranslateElement(
      {
        pageLanguage: 'en',
        autoDisplay: false,
        includedLanguages,
      },
      'google_translate_element'
    )
  }

  useEffect(() => {
    if (!window.google || !window.google.translate) {
      const addScript = document.createElement('script')
      addScript.setAttribute(
        'src',
        '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
      )
      addScript.async = true
      document.body.appendChild(addScript)
      window.googleTranslateElementInit = googleTranslateElementInit
    }
  }, [])

  return <div id="google_translate_element"></div>
}

export default GoogleTranslate
