import React from "react";
import "./Input.css";

const Input = (props) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const inputPrompt = document.getElementById("input");
        props.handleResult(inputPrompt.value);
        inputPrompt.value = "";
    };

    return (
        <div className="input-container">
            <form className="form-container" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder={props.message}
                    className="input-text"
                    id="input"
                />
                <button className="input-button" type="submit"></button>
            </form>
        </div>
    );
};

export default Input;
