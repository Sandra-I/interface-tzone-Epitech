import * as React from "react";

export default function Result(params: {text: string, translatedText: string, translatLanguage: string}) {

    return (
        <>
            <h3 className="tz-title">Résultat</h3>
            <div className="tz-small-text">                
                <div>
                    <span>Texte Original:</span>
                    <span>{params.text}</span>
                </div>
            </div>
        </>
    );
}
