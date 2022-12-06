import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// Notify.failure('Oops, there is no country with that name');
// Notify.info('Too many matches found. Please enter a more specific name.');

import fetchCountries from './js/fetchCountries.js';

import debounce from 'lodash.debounce';





/*
const DEBOUNCE_DELAY = 300;
const LIMIT_ITEMS = 10;

const inputRef = document.querySelector('#search-box');
const renderList = document.querySelector('.country__list');

inputRef.addEventListener('input', debounce(inputSearch, DEBOUNCE_DELAY));

function inputSearch(e) {
    e.preventDefault();

    const searchQuery = inputRef.value.trim().toLowerCase();
    if (!searchQuery) {
        cleanOutput();
        return;
    }

    fetchCountries(searchQuery)
        .then(country => {
            // additional filter of API results
            country = country.filter(country => {
                return country.name.common.toLowerCase().includes(searchQuery) ? country : false;
            })

            if (country.length > LIMIT_ITEMS) {
                cleanOutput();
                Notify.info('Too many matches found. Please enter a more specific name.');
            }

            if (country.length > 1 && country.length < LIMIT_ITEMS) {
                
                renderList.innerHTML = renderListOfSearchingCountries(country);
            }

            if (country.length === 1) {
                
                renderList.innerHTML = renderCountryFullCard(country);
            }    
        })
        .catch(onFetchError); 
}

function renderListOfSearchingCountries(countries) {
    return countries.map(({ flags: {svg: flagSvg}, name: {common: nameCommon} }) => {
        return `
            <li class="country__item">
                <img class="country__flag country__flag-small" src="${flagSvg}" alt="Flag of ${nameCommon}" />
                <p class="country__name">${nameCommon}</p>
            </li>`   
    })
    .join('');
}

function renderCountryFullCard(country) {
    return country.map((
        {
            flags: { svg: flagSvg },
            name: { common: nameCommon },
            capital,
            population,
            languages
        }) => {
        let langsArray = [];
        for (const lang in languages) {
            langsArray.push(languages[lang]);
        }

        let lang = langsArray.join(', ');
        return `
            <div class="country__name--wrapper">
                <img class="country__flag country__flag-big" src="${flagSvg}" alt="Flag of ${nameCommon}" />
                <h1>${nameCommon}</h1>
            </div>
            <p class="country__descr"><span class="country__text-bold">Capital:</span> ${capital}</p>
            <p class="country__descr"><span class="country__text-bold">Population:</span> ${population}</p>
            <p class="country__descr"><span class="country__text-bold">Languages:</span> ${lang}</p>`   
    })
    .join('');
}


function onFetchError(error) {
    cleanOutput();
    Notify.failure('Oops, there is no country with that name');
}

function cleanOutput() {
    renderList.innerHTML = '';
}
*/