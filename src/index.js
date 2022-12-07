import './css/styles.css';
import 'simplelightbox/dist/simple-lightbox.min.css'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// Notify.failure('Sorry, there are no images matching your search query. Please try again.');
// Notify.success('Hooray! We found 500 images.');
import SimpleLightbox from "simplelightbox";
import fetchImages from './js/fetchImages.js';

const inputRef = document.querySelector('.search-form input');
const renderBtn = document.querySelector('.search-form button');
const renderGallery = document.querySelector('.gallery');

renderBtn.addEventListener('click', inputSearch);

function inputSearch(e) {
    e.preventDefault();

    const searchQuery = inputRef.value.toLowerCase();
    if (!searchQuery) {
        cleanOutput();
        return;
    }

    fetchImages(searchQuery)
        .then(images => {
            Notify.success(`Hooray! We found ${images.totalHits} images.`);
            renderGallery.innerHTML = renderGalleryOfSearchingImages(images);

            new SimpleLightbox('.gallery a');
        })
        .catch(onFetchError);
}

function renderGalleryOfSearchingImages(images) {
    return images.hits.map((image) => {
        return `            
            <div class="photo-card gallery__item">
                <a class="gallery__link" href="${image.largeImageURL}">
                    <img class="gallery__image" src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
                    <div class="info">
                        <p class="info-item">
                        <b>Likes</b> ${image.likes}
                        </p>
                        <p class="info-item">
                        <b>Views</b> ${image.views}
                        </p>
                        <p class="info-item">
                        <b>Comments</b> ${image.comments}
                        </p>
                        <p class="info-item">
                        <b>Downloads</b> ${image.downloads}
                        </p>
                    </div>
                </a>
            </div>
            `   
    })
    .join('');
}

function onFetchError(error) {
    cleanOutput();
    Notify.failure('Sorry, there are no images matching your search query. Please try again.');
}

function cleanOutput() {
    renderGallery.innerHTML = '';
}