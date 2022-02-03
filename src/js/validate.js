import * as data from './../data/db.json';

const {db} = data;

export const initialValidate = (num1, num2) => {
    const regNum1 = /([0-9]{9})/;
    const regNum2 = /[0-9]{4}/;
    return (regNum1.test(num1) && regNum2.test(num2) && num1.toString().length === 9 && num2.toString().length ===4) ? true : false; 
}

// ---------założenie: telefony komórkowe w Polsce------
// ---------50, 51, 53, 57, 60, 66, 69, 72, 73, 78, 79, 88

export const validateData = (phone, code) => {
          
    const validatePhone = (num1) => {
    const regNum = /50[0-9]{7}|51[0-9]{7}|52[0-9]{7}|53[0-9]{7}|60[0-9]{7}|66[0-9]{7}|69[0-9]{7}|72[0-9]{7}|73[0-9]{7}|78[0-9]{7}|79[0-9]{7}|88[0-9]{7}/;
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

