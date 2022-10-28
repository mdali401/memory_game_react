import {useState, useEffect } from 'react';

const getRandomPage = () => Math.floor(Math.random() * 10 + 1);

const useGetImages = (gameOptions) => {

    const [images, setImages] = useState([])

    const buildURL = () => {
        const url = new URL('https://api.pexels.com/v1/search')

        url.search = new URLSearchParams({
            query: gameOptions.category,
            orientation: 'square',
            size: 'small',
            per_page: gameOptions.cards_count / 2,
            page: getRandomPage(),
        })
        return url;
    }

    const fetchImages = () => {
        fetch(buildURL(), {
            headers: {
                Authorization: process.env.REACT_APP_PEXEL_API
            }
        })
        .then(response => response.json())
        .then(result => setImages(result.photos))
    }

    useEffect(() => {
        fetchImages()
    }, [gameOptions])

    return images
}

export default useGetImages