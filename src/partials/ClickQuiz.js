import React, { useState } from "react"
import "../templates/quiz.css" // Import the CSS file for styling

const ClickQuiz = (props) => {
  const [clicked, setClicked] = useState(false)
  console.log(props)
  return (
    <li
      className={`quiz-item ${
        clicked ? (props.correct != undefined ? "correct" : "wrong") : ""
      }`} // mdx is weird
      onMouseDown={() => setClicked(true)}
      onMouseUp={() => setClicked(false)} // Reset state when the mouse is released
    >
      {props.children}
      {clicked && (
        <span className="result">{props.correct != undefined ? "✔" : "✘"}</span>
      )}
    </li>
  )
}

export default ClickQuiz
