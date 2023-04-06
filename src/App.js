import React, { useState, useEffect, useCallback } from "react";
import "./styles.css";
import Modal from "./Modal";
import { useDispatch } from "react-redux";
import Spinner from "./Spinner.js";

let objData1 = {
  text: "all-meat",
  countP: "1",
  countS: "0",
  startWith: false,
  format: "json",
};
function AppTest() {
  const [showModal, setShowModal] = useState(false);
  const [objData, setObjData] = useState(() => {
    const initialValue = JSON.parse(localStorage["text1"]);
    return initialValue || objData1;
  });

  useEffect(() => {
    localStorage["text1"] = JSON.stringify(objData);
  }, [objData]);

  const [data, setData] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState("");

  const handler1 = useCallback(() => {
    setShowModal(true);
  }, [data]);

  function validation(p) {
    if (Number(p) != p) {
      setShowModal(false);
      return <p>Введите число</p>;
    }
  }

  const funcGetDate = async () => {
    setLoading(true);
    await fetch(
      "https://baconipsum.com/api/?type=" +
        objData.text +
        "&paras=" +
        objData.countP +
        "&sentences=" +
        objData.countS +
        (objData.startWith ? "&start-with-lorem=1" : "") +
        "&format=" +
        objData.format
    )
      .then((response) => {
        if (objData.format == "json") {
          return response.json();
        } else {
          return response.text();
        }
      })
      .then((result) => {
        setData(result);
        dispatch({ type: "DATA_TYPE", payload: result });
      });
    setLoading(false);
    handler1();
    setValid(validation(objData.countP));
    setValid(validation(objData.countS));
    dispatch({ type: "FORMAT_TYPE", payload: objData.format });
  };

  function changeNote(index, event) {
    objData[index] = event.target.value;
    setObjData({ ...objData });
  }

  return (
    <div>
      <div id="main">
        <div className="span">type </div>
        <select
          className="inp"
          value={objData.text}
          onChange={(event) => changeNote("text", event)}
        >
          <option>all-meat</option>
          <option>meat-and-filler</option>
        </select>
        <div className="span">paras </div>
        <input
          className="inp"
          value={objData.countP}
          placeholder="paras"
          onChange={(event) => changeNote("countP", event)}
        />
        {valid}
        <div className="span">sentences </div>
        <input
          className="inp"
          value={objData.countS}
          placeholder="sentences"
          onChange={(event) => changeNote("countS", event)}
        />
        {valid}
        <div className="span1">
          <input
            className="inp1"
            id="check1"
            type="checkbox"
            checked={objData.startWith}
            onChange={(event) => {
              objData["startWith"] = !objData.startWith;
              setObjData({ ...objData });
            }}
          />
          <label htmlFor="check1">start-with-lorem</label>
        </div>

        <div className="span">format </div>
        <select
          className="inp"
          value={objData.format}
          onChange={(event) => changeNote("format", event)}
        >
          <option>json</option>
          <option>text</option>
          <option>html</option>
        </select>
        <br />
        <button id="clickDate" onClick={funcGetDate}>
          Получить данные
        </button>
      </div>
      {showModal && <Modal setOpenModal={setShowModal} />}
      {loading ? <Spinner></Spinner> : <p></p>}
    </div>
  );
}

export default AppTest;
