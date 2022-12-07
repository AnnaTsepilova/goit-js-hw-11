const axios = require('axios').default;

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '31882982-4157c5a40df977384753c9618';
const searchParams = new URLSearchParams({
    "image_type": "photo",
    "orientation": "horizontal",
    "safesearch": "true",
    "per_page": "40",
});

export default async function fetchImages(searchQuery, page = 1) {
    const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${searchQuery}&${searchParams}&page=${page}`);
    return response.data;
}



// export default function fetchImages(searchQuery) {
//     return fetch(`${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`)
//         .then(response => {
             
//             return response.json();
//         })
// }

