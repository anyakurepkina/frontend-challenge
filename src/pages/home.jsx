import { useQuery } from '@tanstack/react-query';
import { Gallery } from '../components/gallery/gallery';

const fetchImages = async () => {
    const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=100', {
        headers: {
            'x-api-key': 'live_K23R96Ap9AX98b3ppq0WwvMiT8669C8uh2P097A1fLbjabIlAKnAE05jdBhPyqbt',
        },
    });
    if (!response.ok) {
        throw new Error('Ошибка сети');
    }
    return response.json();
};

export function Home() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['images'],
        queryFn: fetchImages,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    if (isLoading) {
        return <div>Загрузка изображений...</div>;
    }

    if (isError) {
        return <div>Произошла ошибка: {error.message}</div>;
    }

    return <Gallery data={data} onCardClick={() => {}} />;
}
