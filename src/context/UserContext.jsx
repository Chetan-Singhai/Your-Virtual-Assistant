import React, {createContext, useState} from 'react'
import run from '../gemini';

// creating context.
export const dataContext = createContext();

const UserContext = ({children}) => {
    // state variables
    const [speaking, setSpeaking] = useState(false);
    const [inputText, setInputText] = useState('listening...');
    const [response, setResponse] = useState(false);


    // function by which AI is speaking and giving response
    const speak = (text)=>{
        let text_speak = new SpeechSynthesisUtterance(text);
        text_speak.volume = 1;
        text_speak.rate = 1;
        text_speak.pich = 1;
        text_speak.lang = "hi-GB"
        window.speechSynthesis.speak(text_speak)
    }

    // function to which we are giving text input and AI is responding by speak function.
    const aiResponse = async (prompt) => {
      let text = await run(prompt)
      console.log(text)
      let newText = text.split("**")&& text.split("*") && text.replace("Google", "Chetan Jain")&& text.replace("google", "Chetan Jain")&& text.replace("Google.", "Chetan Jain")
      console.log(newText)
      setInputText(newText)
      speak(newText)
      setResponse(true)
      setTimeout(() => {
          setSpeaking(false)
      }, 5000);
    }

    // logic to recognize webspeech.
    let speechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
      let recognition = new speechRecognition();
      recognition.onresult = (e)=>{
          let currentIndex = e.resultIndex
          let transcript = e.results[currentIndex][0].transcript
          setInputText(transcript)
          takeCommand(transcript.toLowerCase())
      }


    // taking user input and responding according to given input.
    const takeCommand = (command) =>{

      // for opening youtube.
      if ( (command.includes("open") || command.includes("kholo") || command.includes("chalu") ) && command.includes("youtube") ){
        window.open("https://www.youtube.com/", "_blank")
        speak("Opening Youtube....")
        setInputText("Opening Youtube....")
        setResponse(true)
        setTimeout(() => {
          setSpeaking(false)
      }, 5000);
      }

      // for opening google
      else if ((command.includes("open") || command.includes("kholo") || command.includes("chalu") ) && command.includes("google") ){
        window.open("https://www.google.com/", "_blank")
        speak("Opening Google....")
        setInputText("Opening Google....")
        setResponse(true)
        setTimeout(() => {
          setSpeaking(false)
      }, 5000);
      }

      // for opening whatsapp
      else if ((command.includes("open") || command.includes("kholo") || command.includes("chalu") ) && command.includes("whatsapp") ){
        window.open("https://web.whatsapp.com/", "_blank")
        speak("Opening whatsapp....")
        setInputText("Opening whatsapp....")
        setResponse(true)
        setTimeout(() => {
          setSpeaking(false)
      }, 5000);
      }

      // for opening instagram
      else if ((command.includes("open") || command.includes("kholo") || command.includes("chalu") ) && command.includes("instagram") ){
        window.open("https://www.instagram.com/", "_blank")
        speak("Opening instagram....")
        setInputText("Opening instagram....")
        setResponse(true)
        setTimeout(() => {
          setSpeaking(false)
      }, 5000);
      }

      // to show time  and date
      else if ((command.includes("time") || command.includes("samay") ) && (command.includes("date") || command.includes("tarikh") || command.includes("tarik") )){
        let time = new Date().toLocaleString(undefined, {hour:"numeric", minute:"numeric"})
        let date = new Date().toLocaleString(undefined, {day:"numeric", month:"short"})
        speak(`Date is ${date} and time is ${time}`)
        setInputText(`Date is ${date} and time is ${time}`)
        setResponse(true)
        setTimeout(() => {
          setSpeaking(false)
      }, 5000);
    }
      // to show time 
      else if (command.includes("time") || command.includes("samay")){
        let time = new Date().toLocaleString(undefined, {hour:"numeric", minute:"numeric"})
        speak(time)
        setInputText(time)
        setResponse(true)
        setTimeout(() => {
          setSpeaking(false)
      }, 5000);

      }
      // to show date
      else if (command.includes("date") || command.includes("tarikh") || command.includes("tarik")){
        let date = new Date().toLocaleString(undefined, {day:"numeric", month:"short"})
        speak(date)
        setInputText(date)
        setResponse(true)
        setTimeout(() => {
          setSpeaking(false)
      }, 5000);

      }
      
      else{
        // for default response by AI.
        aiResponse(command)
      }
    }

    // an object to provide the context
    const value = { speak, recognition, speaking, setSpeaking, inputText,setInputText, response, setResponse }

  return (
    // context provider.
    <dataContext.Provider value={value}>
      {children}
    </dataContext.Provider>
  ) 
}

export default UserContext
