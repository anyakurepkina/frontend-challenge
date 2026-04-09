import { create } from 'zustand';

export const FAVORITE_CATS_KEY = 'favorite-cats';

function getInitialFavorites() {
    const jsonFavoriteCats = localStorage.getItem(FAVORITE_CATS_KEY);

    if (!jsonFavoriteCats) {
        return [];
    }

    try {
        return JSON.parse(jsonFavoriteCats);
    } catch (error) {
        console.error('Ошибка при получении начальных данных: ', error.message);

        return [];
    }
}

export const useFavorites = create(set => ({
    favorites: getInitialFavorites(),

    add: cat => set(state => ({ favorites: [...state.favorites, cat] })),
    remove: cat => set(state => ({ favorites: state.favorites.filter(({ id }) => id !== cat.id) })),
}));
