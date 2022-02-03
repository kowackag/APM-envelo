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
const timeEl = document.querySelector('.time');
const errorsEl = document.querySelector('.errors');


function init () {
    formEl.addEventListener('submit', handleSubmit);
    formEl.addEventListener('input', setBtnActive);
    finishBtn.addEventListener('click', finish);
    nextBtn.addEventListener('click', getNextPack);
}

function handleSubmit(e) {
    e.preventDefault();
    let isFormActive = formFields.getAttribute('active');
    isFormActive === 'false' ? startAPM() : handleForm();
}

function startAPM () {
    timer();
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
        timer();
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
    formBtnEl.setAttribute('disabled','');
    resetValue();
    timer();
}

function finish() {
    formFields.classList.add('not-active');
    modalEl.classList.add('not-active');
    resetValue();
    formFields.setAttribute('active', false);
}

// ----aktualnie validacja zrobiona jest tak, że zawsze zwracany jest jeden błąd i mozna było dzięki destrukturyzacji od razu wyłuskac jego treść - wykorzystuje jednak tablicę, na wypadek zmiany sposobu walidacji.

function displayErr(err) {
    errorsEl.innerHTML ='';
    err.forEach(item =>{
        const errInfo = document.createElement('p');
        errInfo.innerText = item;
        errorsEl.appendChild(errInfo);
    })
}
 
// -----------POMOCNICZE--------------

function resetValue() {
    phoneEl.value = '';
    codeEl.value='';
    errorsEl.innerHTML ='';
    time=0;
}

let time = 0;
let id;
let activeTimer = false;
const start = () => {
    time++;
    timeEl.innerText = time;
}

const timer = () => {
    if (!activeTimer) {
        activeTimer = !activeTimer;
        id = setInterval(start,1000)
    } else {
        activeTimer = !activeTimer;
        clearInterval(id)
    } 
}

