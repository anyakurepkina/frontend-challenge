import { LikeButton } from '../like-button/like-button';
import s from './card.module.css';

export function Card({ isFavorite, onLikeClick, url }) {
    return (
        <article className={s.card}>
            <img className={s.img} src={url} />
            <LikeButton onClick={onLikeClick} className={s.button} isActive={isFavorite} />
        </article>
    );
}
