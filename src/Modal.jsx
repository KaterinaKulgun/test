import React from "react";
import './styles.css'
import {useSelector} from 'react-redux'

export default function Modal({ setOpenModal }) {
    const count = useSelector(state => state);
    return (
            <div id='modal'>
                <div>
                    <h4>
                        Сгенерированый текст:
                    </h4>
                    <p>{count}</p>
                    <div id='bb'>
                        <button onClick={() => setOpenModal(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
    );
}
