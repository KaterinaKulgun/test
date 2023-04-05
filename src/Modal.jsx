import React from "react";
import "./styles.css";
import { useSelector } from "react-redux";

export default function Modal({ setOpenModal }) {
  let text = useSelector((state) => state.text);
  let format = useSelector((state) => state.type);
  if (format != "json") {
    text = text.split("\n");
  }
  return (
    <div id="modal">
      <div>
        <h4>Сгенерированый текст:</h4>
        {text.map(function (item) {
          return <p>{item}</p>;
        })}
        <div id="bb">
          <button onClick={() => setOpenModal(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
