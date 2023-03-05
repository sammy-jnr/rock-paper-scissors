import React, { useRef, useState } from "react";
import "./Friends.css";
import sendIcon from "../../Assets/Icons/sendIcon.svg";

function InputTextarea() {
  const inputRef: any = useRef(null);
  const inputContainerRef: any = useRef(null);

  const [inputStyle, setinputStyle] = useState<string>("hidden");
  const controlInputHeight = () => {
    if (parseFloat(inputRef.current.scrollHeight) > 126) {
      console.log("wahala");
      setinputStyle("scroll");
      return;
    }
    setinputStyle("hidden");
    inputRef.current.style.height = "auto";
    inputRef.current.style.height = inputRef.current.scrollHeight + "px";
    inputContainerRef.current.style.height =
      inputRef.current.scrollHeight + 61 + "px";
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
          console.log(inputRef.current?.scrollHeight);
          setinputStyle("hidden");
          controlInputHeight();
          console.log(inputStyle);
        }}
        name=""
        id=""
        rows={1}
      ></textarea>
      <div>
        <img src={sendIcon} alt="" className="largeIcon" />
      </div>
    </section>
  );
}

export default InputTextarea;
