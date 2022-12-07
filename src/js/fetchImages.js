const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '31882982-4157c5a40df977384753c9618';

export default function fetchImages(searchQuery) {
    return fetch(`${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`)
        .then(response => {
             if (!response.ok) {
                throw new Error(Notify.failure('Sorry, there are no images matching your search query. Please try again.'))  
            }
            return response.json();
        })
}

