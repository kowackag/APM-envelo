import './../css/style.css';

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
    console.log('handlesubmit')
    let isFormActive = formFields.getAttribute('active');
    console.log(isFormActive);
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

function resetValue() {
    phoneEl.value = '';
    codeEl.value='';
}

// --------- WALIDACJA DANYCH --------

function initialValidate(num1, num2) {
    const regNum1 = /([0-9]{9})/;
    const regNum2 = /[0-9]{4}/;
    return (regNum1.test(num1) && regNum2.test(num2)) ? true : false; 
}

// ---------założenie: telefony komórkowe w Polsce------
// ---------50, 51, 53, 57, 60, 66, 69, 72, 73, 78, 79, 88

function validateData(phone, code) {
    // ------ const db - tylko do CodePen ------
    const db = [
        {phone: 500000000, code: 5000},
        {phone: 510000000, code: 5100},
        {phone: 530000000, code: 5300},
        {phone: 570000000, code: 5711},
        {phone: 600000000, code: 6000},
        {phone: 660000000, code: 6600},
    ]
    
    const validatePhone = (num1) => {
    const regNum = /50[0-9]{7}|51[0-9]{7}|52[0-9]{7}|53[0-9]{7}|60[0-9]{7}|66[0-9]{7}|69[0-9]{7}|72[0-9]{7}|73[0-9]{7}|78[0-9]{7}|79[0-9]{7}|88[0-9]{7}/;
    console.log(regNum.test(Number('500000000')))
    return regNum.test(num1) ? true: false;
    }

    function validateCode(num2) {
        const regNum = /[0-9]{4}/;
        return regNum.test(num2) ? true : false; 
    }

    function isPhoneInDB(num1) {
        return db.some(({phone}) => phone === num1)    
    }

    function validateCompliance(num1, num2) {
        return db.some(({code, phone}) => phone===num1 && code===num2 );
    }
    
    const errors = getErrors(phone, code);

    function getErrors(num1,num2) {
        const err=[]
        if (!validatePhone(num1)) {
            const copyErr = 'Niewłaściwy numer telefonu';
            err.push(copyErr)
        }
    
        if (!validateCode(num2)) {
            const copyErr = 'Błędnie wpisano kod odbioru';
            err.push(copyErr)
        }
    
        if (validatePhone(num1) && !isPhoneInDB(num1)) {
            const copyErr = 'Przesyłka na podany numer nie została zarejestrowana';
            err.push(copyErr)
        }
     
        if (validatePhone(num1) && validateCode(num2) && isPhoneInDB(num1) && !validateCompliance(num1, num2)) {
            const copyErr = 'Niewłaściwy kod odbioru';
            err.push(copyErr)
        }
        return err;
    }

    return errors;
}
