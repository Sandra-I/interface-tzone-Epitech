import * as React from "react";
import './SwitchCheckbox.scss'
import {useState} from "react";

const SwitchCheckbox = () => {
    const [value, setValue]: any = useState({
        previous: {name: "Prévisualisation", check: false},
        getWord: {name: "Récupérer la police", check: false},
        getForm: {name: "Récupérer la mise en forme", check: false},
    });

    function handleChange(e: any) {
        const name = e.target.name;
        setValue({...value, [name]: {...value[name], check: !value[name].check}})
    }

    return (
        <>
            {Object.keys(value).map(key =>
                <div>
                    <label htmlFor={key}>{value[key].name}</label>
                    <input
                        name={key}
                        checked={value[key].check}
                        onChange={handleChange}
                        className="react-switch-checkbox"
                        id={key}
                        type="checkbox"
                    />
                    <label
                        className={`react-switch-label ${value[key].check ? "background-color-of-switch" : ""}`}
                        htmlFor={key}>
                        <span className='react-switch-button'/>
                    </label>
                </div>
            )}
        </>
    );
};

export default SwitchCheckbox;