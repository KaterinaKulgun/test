import React, { useState, useEffect, useCallback } from "react";
import "./styles.css";
import Modal from "./Modal";
import { useSelector, useDispatch, useStore } from "react-redux";
import Spinner from "./Spinner.js";

function AppTest() {
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState(() => {
    const saved = localStorage.getItem("text");
    const initialValue = JSON.parse(saved);
    return initialValue || "all-meat";
  });
  const [countP, setCountP] = useState(() => {
    const saved = localStorage.getItem("countP");
    const initialValue = JSON.parse(saved);
    return initialValue || "1";
  });
  const [countS, setCountS] = useState(() => {
    const saved = localStorage.getItem("countS");
    const initialValue = JSON.parse(saved);
    return initialValue || "0";
  });
  const [format, setFormat] = useState(() => {
    const saved = localStorage.getItem("format");
    const initialValue = JSON.parse(saved);
    return initialValue || "json";
  });
  const [startWith, setStartWith] = useState(() => {
    const saved = localStorage.getItem("startWith");
    const initialValue = JSON.parse(saved);
    return initialValue || false;
  });
  useEffect(() => {
    localStorage.setItem("startWith", JSON.stringify(startWith));
  }, [startWith]);
  useEffect(() => {
    localStorage.setItem("text", JSON.stringify(text));
  }, [text]);
  useEffect(() => {
    localStorage.setItem("countP", JSON.stringify(countP));
  }, [countP]);
  useEffect(() => {
    localStorage.setItem("countS", JSON.stringify(countS));
  }, [countS]);
  useEffect(() => {
    localStorage.setItem("format", JSON.stringify(format));
  }, [format]);
  const [data, setData] = useState("");

  const dispatch = useDispatch();
  const handler = useCallback(() => {
    dispatch({ type: "DATA_TYPE", payload: data });
  }, [data]);

  const handler1 = useCallback(() => {
    setShowModal(true);
  }, [data]);
  function validation(p) {
    if (Number(p) != p) {
      setShowModal(false);
      return <p>Введите число</p>;
    }
  }
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState("");
  const funcGetDate = async () => {
    setLoading(true);
    await fetch(
      "https://baconipsum.com/api/?type=" +
        text +
        "&paras=" +
        countP +
        "&sentences=" +
        countS +
        (startWith ? "&start-with-lorem=1" : "") +
        "&format=" +
        format
    )
      .then((response) => {
        if (format == "json") {
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
    setValid(validation(countP));
    setValid(validation(countS));
    dispatch({ type: "FORMAT_TYPE", payload: format })
  };

  return (
    <div>
      <div id="main">
        <div class="span">type </div>
        <select
          class="inp"
          value={text}
          onChange={(event) => setText(event.target.value)}
        >
          <option>all-meat</option>
          <option>meat-and-filler</option>
        </select>
        <div class="span">paras </div>
        <input
          class="inp"
          value={countP}
          placeholder="paras"
          onChange={(event) => {
            setCountP(event.target.value);
          }}
        />
        {valid}
        <div class="span">sentences </div>
        <input
          class="inp"
          value={countS}
          placeholder="sentences"
          onChange={(event) => {
            setCountS(event.target.value);
          }}
        />
        {valid}
        <div class="span1">
          <input
            class="inp1"
            id="check1"
            type="checkbox"
            checked={startWith}
            onChange={(event) => {
              setStartWith(!startWith);
            }}
          />
          <label for="check1">start-with-lorem</label>
        </div>

        <div class="span">format </div>
        <select
          class="inp"
          value={format}
          onChange={(event) => setFormat(event.target.value)}
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
