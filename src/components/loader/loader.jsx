import loaderCat from './loader.gif';
import s from './loader.module.css';

export function Loader({ text }) {
    return (
        <div className={s.wrapper}>
            <img className={s.image} src={loaderCat} alt="" />
            <p className={s.text}>{text}</p>
        </div>
    );
}
