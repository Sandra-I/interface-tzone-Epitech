import * as React from "react";

export default function Result(params: {text: string, translatedText: string, translatLanguage: string}) {

    return (
        <>
            <h3>Résultat</h3>
            <div>                
                <div>
                    <span>Texte Original:</span>
                    <span className="short">{params.text}</span>
                </div>
                <div>
                    <span>Texte Traduit({params.translatLanguage}):</span>
                    <span className="short">{params.text}</span>
                </div>
            </div>
        
        </>
    );
}
