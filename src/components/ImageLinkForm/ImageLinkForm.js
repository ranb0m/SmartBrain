import React from "react";
import "./ImageLinkForm.css";

export default function ImageLinkForm({ detectUrl, handleOnChange, onButtonSubmit }) {
    
    return (
        <div>
            <p className="description f3">
                {'This Magic Brain will detect faces in your pictures. Give it a try.'}
            </p>
            <div>
                <div className="center form pa4 br3 shadow-5">
                    <input 
                        className="f4 pa2 w-70 center" 
                        type="text"
                        value={detectUrl}
                        onChange={handleOnChange} />
                    <button 
                        className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
                        onClick={onButtonSubmit}>
                            Detect
                    </button>
                </div>
            </div>
        </div>
    )
}