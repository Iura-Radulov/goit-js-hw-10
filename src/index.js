import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from "./fetchCountries";

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector("#search-box");

searchBox.addEventListener("input", debounce(onTextInput, 300));

function onTextInput(e) {
    const inputValue = e.target.value;
    if (inputValue === "") {
        return;
    };
    fetchCountries(inputValue)
        .then((list) => renderCountries(list))
        .catch((error) => console.log(error));
}

function renderCountries(countries) {
    console.log(countries);
    if (countries.length > 10) {
        Notiflix.Notify.failure("Too many matches found. Please enter a more specific name.");
    };
    if (countries.length >= 2 & countries.length <= 10) {
        const countryEl = countries.map(country => {
            const countryName = country.name.official;
            const countryFlag = country.flags.svg;
            return { countryName, countryFlag }
        });
        console.log("find",countryEl);
    }
}
