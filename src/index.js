import './css/styles.css';
import 'simplelightbox/dist/simple-lightbox.min.css'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// Notify.failure('Sorry, there are no images matching your search query. Please try again.');
// Notify.success('Hooray! We found 500 images.');
// Notify.warning('Please enter your search query.');
// Notify.warning('We're sorry, but you've reached the end of search results.');
import SimpleLightbox from "simplelightbox";
import fetchImages from './js/fetchImages.js';

const inputRef = document.querySelector('.search-form input');
const renderBtn = document.querySelector('.search-form button');
const galleryContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const notifyOptions = { position: "right-bottom" };
const gallery = new SimpleLightbox('.gallery a');

let page = 1;

renderBtn.addEventListener('click', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(e) {
    e.preventDefault();

    window.scrollTo(0, 0);

    page = 1;
    const searchQuery = inputRef.value.toLowerCase();
    if (!searchQuery) {
        Notify.warning('Please enter your search query.', notifyOptions);
        cleanOutput();
        return;
    }

    try {
        const images = await fetchImages(searchQuery);
        toggleLoadMoreBtn(images);
        if (images.totalHits === 0) {
            Notify.failure('Sorry, there are no images matching your search query. Please try again.', notifyOptions);
            cleanOutput();
            return;
        };
                
        Notify.success(`Hooray! We found ${images.totalHits} images.`, notifyOptions);
        galleryContainer.innerHTML = renderGalleryOfSearchingImages(images);
        
        gallery.refresh();
        
    } catch (error) {
        onFetchError(error)
    }
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

async function onLoadMore(event) {

    const searchQuery = inputRef.value.toLowerCase();

    if (!searchQuery) {
        Notify.warning('Please enter your search query.', notifyOptions);
        cleanOutput();
        return;
    }
    page += 1;

    const images = await fetchImages(searchQuery, page);
    
    toggleLoadMoreBtn(images);

    if (images.hits.length === 0) {
        Notify.warning("We're sorry, but you've reached the end of search results.", notifyOptions);
        return;
    };
    const renderedGallery = renderGalleryOfSearchingImages(images);
    galleryContainer.insertAdjacentHTML("beforeend", renderedGallery);

    gallery.refresh();

    const { height: cardHeight } = document
        .querySelector(".gallery")
        .firstElementChild.getBoundingClientRect();

    window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
    });
}

function toggleLoadMoreBtn(images) {
    if (images.hits.length < 40) {
        loadMoreBtn.classList.add("is-hidden");
        Notify.warning("We're sorry, but you've reached the end of search results.", notifyOptions);
    } else {
        loadMoreBtn.classList.remove("is-hidden");
    }
}

function onFetchError(error) {
    cleanOutput();
    Notify.failure('Sorry, there are no images matching your search query. Please try again.', notifyOptions);
}

function cleanOutput() {
    galleryContainer.innerHTML = '';
}