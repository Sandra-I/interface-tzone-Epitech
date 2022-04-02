import * as React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ReadMore = ({ children }: any) => {
  let text = children;
  const minimumCharacter = 10;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  if (text.length > minimumCharacter) {
    if (isReadMore) {
      text = text.slice(0, 10);
    }
    return (
      <p>
        {text}
        <span role="button" tabIndex={0} onClick={toggleReadMore} onKeyPress={toggleReadMore} className="read-or-hide">
          {isReadMore ? '...voir plus' : ' voir moins'}
        </span>
      </p>
    );
  }
  return text;
};

const History = ({ user } : any) => {
  const { t } = useTranslation();
  let content;
  const { history } = user;
  if (Object.keys(user).length) {
    content = Object.keys(history).map((keyName) => (
      <div key={keyName}>
        <h4>{history[keyName].date}</h4>
        <ReadMore>{history[keyName].text}</ReadMore>
      </div>
    ));
  } else {
    content = <h4>Votre historique est vide.</h4>;
  }
  return (
    <>
      <h1>{t('history')}</h1>
      <Link to="/index.html">
        <button type="submit">Retour</button>
      </Link>
      <div className="containerHistory">
        {content}
      </div>
    </>
  );
};

export default History;
