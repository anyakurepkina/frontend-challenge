import { FAVORITE_CATS_KEY, useFavorites } from '../../store/favorites';
import { Card } from '../card/card';
import s from './gallery.module.css';

export function Gallery({ data }) {
    const favorites = useFavorites(state => state.favorites);

    function toggleLike(cat) {
        let newFavorites;

        if (favorites.find(fav => fav.id === cat.id)) {
            newFavorites = favorites.filter(image => cat.id !== image.id);
        } else {
            newFavorites = [...favorites, cat];
        }

        useFavorites.setState({ favorites: newFavorites });
        localStorage.setItem(FAVORITE_CATS_KEY, JSON.stringify(newFavorites));
    }

    return (
        <ul className={s.gallery}>
            {data.map(cat => (
                <li key={cat.id}>
                    <Card
                        onLikeClick={() => toggleLike(cat)}
                        isFavorite={favorites.find(({ id }) => id === cat.id)}
                        url={cat.url}
                    />
                </li>
            ))}
        </ul>
    );
}
