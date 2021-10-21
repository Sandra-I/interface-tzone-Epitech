import * as React from "react";

export default function Result(params: {text: string, translatedText: string, translatLanguage: string}) {

    return (
        <>
            <h3>Résultat</h3>
            <div>
                
                <div className="shortCut">
                    <span>Texte Original:</span>
                    <span className="short">{params.text}</span>
                </div>
                <div className="shortCut">
                    <span>Texte Traduit({params.translatLanguage}):</span>
                    <span className="short">{params.text}</span>
                </div>
            </div>
        
        </>
    );
}