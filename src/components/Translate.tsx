import * as React from "react";

const langueAvalaible: any = {
    France: 'FR',
    German: 'DE',
    American: 'EN-US',
    British: 'EN-GB',
    Spain: 'ES',
}
function handleSubmit(e: any) {
    localStorage.setItem('translate', e.target.value);
}

const Translate = () => {
    return (
        <>
            <form>
                <label>
                    Traduire mon texte en :
                </label>
                <select onChange={handleSubmit}>
                    {Object.keys(langueAvalaible).map(key =>
                        <option key={key} value={langueAvalaible[key]}>{key}</option>
                    )}
                </select>
            </form>
        </>
    )
};

export default Translate
