import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { Gallery } from '../components/gallery/gallery';
import { Loader } from '../components/loader/loader';

const LIMIT = 20;

const fetchImages = async ({ pageParam }) => {
    const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=${LIMIT}&page=${pageParam}`, {
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
    const loadMoreRef = useRef(null);

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } = useInfiniteQuery({
        queryKey: ['images'],
        queryFn: fetchImages,
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
            if (lastPage.length === 0) {
                return undefined;
            }

            return lastPageParam + 1;
        },
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    useEffect(() => {
        if (!loadMoreRef.current) {
            return;
        }

        const observer = new IntersectionObserver(entries => {
            const [target] = entries;

            if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
            }
        });

        observer.observe(loadMoreRef.current);

        return () => {
            observer.disconnect();
        };
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    if (isLoading) {
        return <Loader text="Загрузка изображений..." />;
    }

    if (isError) {
        return <div>Произошла ошибка: {error.message}</div>;
    }

    const allImages = data?.pages.flatMap(page => page) ?? [];

    return (
        <>
            <Gallery data={allImages} />
            <div ref={loadMoreRef} style={{ minHeight: 20 }}>
                {isFetchingNextPage && <Loader text="Загружаем ещё котиков..." />}
                {!hasNextPage && <div>Больше изображений нет</div>}
            </div>
        </>
    );
}
