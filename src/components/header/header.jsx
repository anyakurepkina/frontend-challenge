import { NavLink } from 'react-router';
import s from './header.module.css';

export function Header() {
    return (
        <header className={s.header}>
            <nav>
                <NavLink className={s.link} to="/">
                    Все котики
                </NavLink>
                <NavLink className={s.link} to="/favorites">
                    Любимые котики
                </NavLink>
            </nav>
        </header>
    );
}
