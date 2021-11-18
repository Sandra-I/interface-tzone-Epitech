import * as React from "react";
import OptionsService from "./optionsService"

const langueAvalaible: any = {
    Aucun: "",
    France: 'FR',
    German: 'DE',
    American: 'EN-US',
    British: 'EN-GB',
    Spain: 'ES',
}
function handleSubmit(e: any) {
    OptionsService.getOptions().then( options=>{
        if(e.target.value === "") options.translateLanguage = null;
        else options.translateLanguage = e.target.value;
        OptionsService.updateOptions(options);
    });
}

const Translate = () => {
    return (
        <>
            {
                new Promise( (res,rej)=> OptionsService.getOptions().then( (options)=>{
                    let language = options.translateLanguage
                
                    console.log("language",language)
                    if(!language) language = "";
                    res (
                            <form>
                                <label>
                                    Traduire mon texte en :
                                </label>
                                <select onChange={handleSubmit} defaultValue={language}>
                                    {Object.keys(langueAvalaible).map(key =>
                                        <option key={key} value={langueAvalaible[key]}>{key}</option>
                                    )}
                                </select>
                            </form>
                    )
                    
                }))
            }
        </>
    )
};

export default Translate
