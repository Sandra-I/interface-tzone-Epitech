import * as React from 'react';

const Result: React.FC<{text: string, /** translatedText: string, translatLanguage: string */ }> = ({ text }) => (
  <>
    <h3 className="tz-title">Résultat</h3>
    <div className="tz-small-text">
      <div>
        <span>Texte Original :</span>
        <span>{text}</span>
      </div>
    </div>
  </>
);

export default Result;
