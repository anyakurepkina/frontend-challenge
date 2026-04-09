import clsx from 'clsx';
import s from './like-button.module.css';
import Like from './like.svg?react';

export function LikeButton({ className, onClick, isActive }) {
    return (
        <button type="button" onClick={onClick} className={clsx(s.button, className, { [s.active]: isActive })}>
            <Like />
        </button>
    );
}
