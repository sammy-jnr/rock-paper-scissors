import React, { useRef, useState } from "react";
import "./Friends.css";
import sendIcon from "../../Assets/Icons/sendIcon.svg";

interface InputInterface {
  sendMessage: (message: string) => void
}


function InputTextarea(props:InputInterface) {
  const inputRef: any = useRef(null);
  const inputContainerRef: any = useRef(null);

  const [inputStyle, setinputStyle] = useState<string>("hidden");
  const controlInputHeight = () => {
    if (parseFloat(inputRef.current.scrollHeight) > 126) {
      setinputStyle("scroll");
      return;
    }
    setinputStyle("hidden");
    inputRef.current.style.height = "auto";
    inputRef.current.style.height = inputRef.current.scrollHeight + "px";
    inputContainerRef.current.style.height =
      inputRef.current.scrollHeight + 21 + "px";
  };
  return (
    <section className="inputSection" ref={inputContainerRef} style={{}}>
      <textarea
        placeholder="Write a message"
        ref={inputRef}
        style={{
          overflow: inputStyle,
        }}
        onChange={(e) => {
          setinputStyle("hidden");
          controlInputHeight();
        }}
        name=""
        id=""
        rows={1}
      ></textarea>
      <div
      onClick={()=> {
        if(inputRef.current.value === "")return
        props.sendMessage(inputRef.current.value)
        inputRef.current.value = ""
        setinputStyle("hidden");
        controlInputHeight();
      }}
      >
        <img src={sendIcon} alt="" className="largeIcon" />
      </div>
    </section>
  );
}

export default InputTextarea;
