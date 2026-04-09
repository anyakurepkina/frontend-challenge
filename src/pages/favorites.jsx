import { Gallery } from '../components/gallery/gallery';
import { useFavorites } from '../store/favorites';

export function Favorites() {
    const favorites = useFavorites(state => state.favorites);

    return <Gallery data={favorites} />;
}
