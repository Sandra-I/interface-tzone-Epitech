import * as React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { User } from '../models/user';

const ReadMore = ({ children }: any) => {
  const { t } = useTranslation();
  let text = children;
  const minimumCharacter = 20;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  if (text.length > minimumCharacter) {
    if (isReadMore) {
      text = text.slice(0, 20);
    }
    return (
      <p>
        {text}
        <span role="button" tabIndex={0} onClick={toggleReadMore} onKeyPress={toggleReadMore} className="read-or-hide">
          {isReadMore ? t('seeMore') : t('seeLess')}
        </span>
      </p>
    );
  }
  return text;
};

const History: React.FC<{ user: User }> = ({ user }) => {
  const { t } = useTranslation();
  let content;
  const { history } = user;
  if (history.length) {
    content = history.map((current, i) => (
      <div key={`history_${i + 1}`}>
        <h4>{new Date(current.date).toLocaleDateString()}</h4>
        <ReadMore>{current.text}</ReadMore>
      </div>
    ));
  } else {
    content = <h4>{t('emptyHistory')}</h4>;
  }
  return (
    <div className="card">
      <h1>{t('history')}</h1>
      <div className="containerHistory">
        {content}
      </div>
    </div>
  );
};

export default History;
