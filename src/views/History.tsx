import * as React from 'react';
import {Link} from 'react-router-dom';
import {useState} from "react";

const ReadMore = ({children}: any) => {
    let text = children;
    const minimumCharacter = 10;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };

    if (text.length > minimumCharacter) {
        if (isReadMore) {
            text = text.slice(0, 10)
        }
        return (
            <p>
                {text}
                <span onClick={toggleReadMore} className="read-or-hide">
                {isReadMore ? "...voir plus" : " voir moins"}
            </span>
            </p>
        );

    }
    return text
};

const History = () =>
    (
        <>
            <h1>Historique</h1>
            <Link to="/index.html">
                <button type="submit">Retour</button>
            </Link>
            <div className='containerHistory'>
                <h4>Votre text</h4>
                    <ReadMore>blablabblblaablabblblablabblblablabblblablabblblablabblblablabblblablabblblablabblblablabblblablabblblablabbl</ReadMore>
                <h4>Votre text</h4>
                <ReadMore>blablabblblaablabblblablabblblablabblblablabblblablabblblablabblblablabblblablabblblablabblblablabblblablabbl</ReadMore>
                <h4>Votre text</h4>
                <ReadMore>blablabblblaablabblblablabblblablabblblablabblblablabblblablabblblablabblblablabblblablabblblablabblblablabbl</ReadMore>
                <h4>Votre text</h4>
                <ReadMore>blablabblblaablabblblablabblblablabblblablabblblablabblblablabblblablabblblablabblblablabblblablabblblablabbl</ReadMore>
                <h4>Votre text</h4>
                <ReadMore>blablabblblaablabblblablabblblablabblblablabblblablabblblablabblblablabblblablabblblablabblblablabblblablabbl</ReadMore>
                <h4>Votre text</h4>
                <ReadMore>blablabblblaablabblblablabblblablabblblablabblblablabblblablabblblablabblblablabblblablabblblablabblblablabbl</ReadMore>
                <h4>Votre text</h4>
                <ReadMore>blablabblblaablabblblablabblblablabblblablabblblablabblblablabblblablabblblablabblblablabblblablabblblablabbl</ReadMore>
                <h4>Votre text</h4>
                <ReadMore>blablabblblaablabblblablabblblablabblblablabblblablabblblablabblblablabblblablabblblablabblblablabblblablabbl</ReadMore>
                <h4>Votre text</h4>
                <ReadMore>blablabblblaablabblblablabblblablabblblablabblblablabblblablabblblablabblblablabblblablabblblablabblblablabbl</ReadMore>
                <h4>Votre text</h4>
                <ReadMore>blablabblblaablabblblablabblblablabblblablabblblablabblblablabblblablabblblablabblblablabblblablabblblablabbl</ReadMore>
                <h4>Votre text</h4>
                <ReadMore>blablabblblaablabblblablabblblablabblblablabblblablabblblablabblblablabblblablabblblablabblblablabblblablabbl</ReadMore>
                <h4>Votre text</h4>
                <ReadMore>blablabblblaablabblblablabblblablabblblablabblblablabblblablabblblablabblblablabblblablabblblablabblblablabbl</ReadMore>
                <h4>Votre text</h4>
                <ReadMore>blablabblblaablabblblablabblblablabblblablabblblablabblblablabblblablabblblablabblblablabblblablabblblablabbl</ReadMore>
                <h4>Votre text</h4>
                <ReadMore>blablabblblaablabblblablabblblablabblblablabblblablabblblablabblblablabblblablabblblablabblblablabblblablabbl</ReadMore>

            </div>
        </>
    );
export default History;
