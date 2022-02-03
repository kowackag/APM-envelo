import './../css/style.css';
import {initialValidate, validateData} from './validate';

document.addEventListener('DOMContentLoaded', init);

const formEl = document.querySelector('.form');
const formFields = document.querySelector('.form-fields');
const formBtnEl = document.querySelector('[name="get-pack"]');
const phoneEl = document.querySelector('[name="phone"]');
const codeEl = document.querySelector('[name="code"]');
const modalEl = document.querySelector('.modal');
const finishBtn = document.querySelector('[name="finish"]');
const nextBtn = document.querySelector('[name="next"]');

function init () {
    formEl.addEventListener('submit', handleSubmit);
    formEl.addEventListener('input', setBtnActive);
    finishBtn.addEventListener('click', finish);
    nextBtn.addEventListener('click', getNextPack);
}

function handleSubmit(e) {
    e.preventDefault();
    let isFormActive = formFields.getAttribute('active');
    isFormActive === 'false' ? setIsFormActive():handleForm();
}

function setIsFormActive () {
    formFields.classList.remove('not-active');
    formFields.setAttribute('active', true);
    formBtnEl.setAttribute('disabled','');
}

function handleForm() {
    const phoneNum = Number(phoneEl.value.replace(/\s/g, ''));
    const codeNum = Number(codeEl.value.replace(/\s/g, ''));
    const err = validateData(phoneNum, codeNum);
    if (err.length === 0) {
        modalEl.classList.remove('not-active');
    } 
    displayErr(err);
}

function setBtnActive(e) {
    e.preventDefault();
    const phoneNum = Number(phoneEl.value.replace(/\s/g, ''));
    const codeNum = Number(codeEl.value.replace(/\s/g, ''));
    if (initialValidate(phoneNum, codeNum)) {
        formBtnEl.removeAttribute('disabled');
    } else {formBtnEl.setAttribute('disabled','');}
}

function getNextPack() {
    modalEl.classList.add('not-active');
    resetValue();
}

function finish() {
    formFields.classList.add('not-active');
    modalEl.classList.add('not-active');
    resetValue();
    formFields.setAttribute('active', false);
}

// ----aktualnie validacja zrobiona jest tak, że zawsze zwracany jest jeden błąd i mozna było dzięki destrukturyzacji od razu wyłuskac jego treść - wykorzystuje jednak tablicę, na wypadek zmiany sposobu walidacji.

function displayErr(err) {
    err.forEach(item =>{
        const infoEl = document.createElement('p');
        infoEl.innerText = item;
        infoEl.classList.add('errors')
        formFields.appendChild(infoEl);
    })
}


function resetValue() {
    phoneEl.value = '';
    codeEl.value='';
}

