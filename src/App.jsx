import React, { useContext } from "react";
import "./App.css";
import sa from "./assets/ai.png";
import speakImg from "./assets/speak.gif";
import responseImg from "./assets/aiVoice.gif";
import { CiMicrophoneOn } from "react-icons/ci";
import { dataContext } from "./context/UserContext";

const App = () => {
  
  // Consuming datacontext.
  let {
    speaking,
    setSpeaking,
    recognition,
    inputText,
    setInputText,
    response,
    setResponse,
  } = useContext(dataContext);

  return (
    <div className="main">
      <img src={sa} id="ai" />
      <span>Hello I'm your Advanced virtual assistant</span>

      {!speaking ? (
        <button
          onClick={() => {
            setInputText("Listening...");
            setSpeaking(true);
            setResponse(false);
            recognition.start();
          }}
        >
          Click here <CiMicrophoneOn />{" "}
        </button>
      ) : (
        <div className="respoceDiv">
          {!response ? (
            <img src={speakImg} id="speakImg" />
          ) : (
            <img src={responseImg} id="responseImg" />
          )}

          <p>{inputText}</p>
        </div>
      )}
    </div>
  );
};

export default App;
