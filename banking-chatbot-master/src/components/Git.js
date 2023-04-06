import React, { useEffect } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

const Dictaphone1 = () => {
  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition()

  useEffect(() => {
    SpeechRecognition.startListening({ continuous: true })
    return SpeechRecognition.stopListening
  }, [])

  if (!browserSupportsSpeechRecognition) {
    return <span>No browser support</span>
  }
  console.log("Drfd",transcript)
  return <span>{transcript}</span>
}

export default Dictaphone1