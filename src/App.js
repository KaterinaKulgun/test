import React, {useState, useEffect,useCallback} from "react";
import './styles.css';
import Modal from "./Modal";
import { useSelector, useDispatch, useStore} from 'react-redux'
import Spinner from './Spinner.js'

function AppTest() {

  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState(() => {
    const saved = localStorage.getItem("text");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });
  const [countP, setCountP] = useState(() => {
    const saved = localStorage.getItem("countP");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });
  const [countS, setCountS] = useState(() => {
    const saved = localStorage.getItem("countS");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });
  const [format, setFormat] = useState(() => {
    const saved = localStorage.getItem("format");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });
  const [startWith, setStartWith] = useState(() => {
    const saved = localStorage.getItem("startWith");
    const initialValue = JSON.parse(saved);
    return initialValue || false;
  });
  useEffect(() => {
    localStorage.setItem('startWith',JSON.stringify(startWith));
  }, [startWith]);
  useEffect(() => {
    localStorage.setItem('text',JSON.stringify(text));
  }, [text]);
  useEffect(() => {
    localStorage.setItem('countP',JSON.stringify(countP));
  }, [countP]);
  useEffect(() => {
    localStorage.setItem('countS',JSON.stringify(countS));
  }, [countS]);
  useEffect(() => {
    localStorage.setItem('format',JSON.stringify(format));
  }, [format]);
  const [data, setData] = useState('');

  const dispatch = useDispatch();
  const handler = useCallback(() => {
    dispatch({ type: 'DATA_TYPE', payload: data });
  }, [data]);

  const handler1 = useCallback(() => {
    setShowModal(true);  
  }, [data]);

  const [loading,setLoading]=useState(false);
  const funcGetDate = 
    async () => {
    setLoading(true);
    await fetch('https://baconipsum.com/api/?type='+text+'&paras='+countP+'&sentences='+countS+(startWith?'&start-with-lorem=1':'')+'&format=json')
      .then((response) => response.json())
      .then((result) => {setData(result);dispatch({ type: 'DATA_TYPE', payload: result });})
  setLoading(false);
  handler1();
  }

  return (
    <div>
      <select value={text} onChange={event=>setText(event.target.value)}>
			<option>all-meat</option>
			<option>meat-and-filler</option>
		</select><br/>
      <input value={countP} placeholder='paras' onChange={event=>{setCountP(event.target.value);}}/><br/>
      <input value={countS} placeholder='sentences' onChange={event=>{setCountS(event.target.value);}}/><br/>
      <span>start-with-lorem:</span><input type="checkbox" checked={startWith} onChange={event=>{setStartWith(!startWith);}}/> <br/>
     <select value={format} onChange={event=>setFormat(event.target.value)}>
			<option>json</option>
			<option>text</option>
      <option>html</option>
		</select><br/>
      <button onClick={funcGetDate}>Получить данные</button>
      {showModal && <Modal setOpenModal={setShowModal} />}
      {loading?<Spinner></Spinner>:<p></p>}
    </div>
  );
}

export default AppTest;