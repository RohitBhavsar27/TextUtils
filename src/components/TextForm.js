import React, { useState } from "react";

export default function TextForm(props) {
  const [text, setText] = useState("");
  const [stateStack, setStateStack] = useState([]);

  const updateText = (newText) => {
    setStateStack((prevStack) => [...prevStack, text]);
    setText(newText);
  };

  const handleUndo = () => {
    if (stateStack.length > 0) {
      const lastState = stateStack[stateStack.length - 1]; // Pop the last state
      setStateStack(stateStack.slice(0, -1));
      setText(lastState);
      props.displayAlert("Changes reverted successfully!", "success");
    } else {
      props.displayAlert("Nothing to revert.", "warning");
    }
  };

  const handleUpClick = () => {
    let newText = text.toUpperCase();
    updateText(newText);
    props.displayAlert("Text converted to uppercase!", "success");
  };

  const handleLoClick = () => {
    let newText = text.toLowerCase();
    updateText(newText);
    props.displayAlert("Text converted to lowercase!", "success");
  };

  const handleClearClick = () => {
    let newText = "";
    updateText(newText);
    props.displayAlert("Text cleared!", "success");
  };

  const handleCopy = () => {
    var textElement = document.getElementById("myBox");
    textElement.select();
    navigator.clipboard.writeText(textElement.value);
    props.displayAlert("Text copied to clipboard!", "success");
  };

  const handleExtraSpaces = () => {
    let newText = text.split(/[ ]+/).join(" ");
    updateText(newText);
    props.displayAlert("Extra spaces removed from text!", "success");
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  return (
    <>
      <div
        className="container"
        style={{ color: props.mode === "dark" ? "white" : "#042743" }}
      >
        <h1>{props.heading}</h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            value={text}
            onChange={handleOnChange}
            style={{
              backgroundColor: props.mode === "dark" ? "#042743" : "white",
              color: props.mode === "dark" ? "white" : "#042743",
            }}
            id="myBox"
            rows="8"
          ></textarea>
        </div>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleUpClick}
        >
          Convert To Uppercase
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleLoClick}
        >
          Convert To Lowercase
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleClearClick}
        >
          Clear Text
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleCopy}
        >
          Copy
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleExtraSpaces}
        >
          Remove Extra Spaces
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleUndo}
        >
          Undo
        </button>
      </div>
      <div
        className="container my-3"
        style={{ color: props.mode === "dark" ? "white" : "#042743" }}
      >
        <h1>Your Text Summary</h1>
        <p>
          {text.split(/\s+/).filter((word) => word.length > 0).length} Words and{" "}
          {text.length} Characters
        </p>
        <p>
          {0.008 * text.split(" ").filter((word) => word.length > 0).length}{" "}
          Minutes Read
        </p>
        <h2>Preview</h2>
        <p>{text.length > 0 ? text : "Nothing to Preview"}</p>
      </div>
    </>
  );
}
