import React from 'react';
import { useState } from 'react';
import style from './Card.module.scss';

const Card = ({ imageLink, description, stars, repoName, language }) => {
    const [showDescription, setShowDescription] = useState(false);

    return (<>
        <div className={style.cardContainer}>
            <div className={style.avatar}>
                <div className={style.img}>
                    <img src={imageLink} className={style.imgName} />
                </div>
            </div>
            <div className={style.content}>
                <div onClick={() => setShowDescription(!showDescription)} className={style.arrow}>
                    {!showDescription && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="gray" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6l-6-6l1.41-1.41z" /></svg>}
                    {showDescription && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="gray" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6l-6 6l1.41 1.41z" /></svg>}
                    
                </div>
                <div className={style.title}>
                    {repoName}
                </div>
                <div className={style.language}>
                    <b style={{ fontSize: "14px" }} >Language:</b> {language}
                </div>
                <div className={style.stars}>
                    <b style={{ fontSize: "14px" }} >Stars:</b> {stars}
                </div>
                {showDescription && <div className={style.description}>
                    <b style={{ fontSize: "14px" }} >Description:</b> {description}
                </div>}
            </div>

        </div>
    </>)
}

export default Card;
