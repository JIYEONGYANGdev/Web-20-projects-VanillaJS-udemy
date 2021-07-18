const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//Show input error message
function showError(input, message) {
    const formControl = input.parentElement; // 상위(부모)태그 가져오기
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

//Show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

//Check email is valid
function checkEmail(input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // return re.test(String(input).toLowerCase());
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, `Email is not valid`)
    }
}

//check required fields
function checkRequired(inputArr) {
    inputArr.forEach(function (input) {
        // console.log(input.value)
        if (input.value.trim() === '') {
            // console.log(input.id)
            // showError(input, `${input.id} is required`)
            showError(input, `${getFieldName(input)} is required`)
        } else {
            showSuccess(input);
        }
    });
}

//Check input length
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`)
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`)
    } else {
        showSuccess(input);
    }
}

//Check passwords match
function checkPasswordsMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, 'Passwords do not match');
    }
}

//Get fieldname
function getFieldName(input) {
    // return input.id.toUpperCase();
    return input.id.charAt(0).toUpperCase() + input.id.slice(1); // 첫번째 문자(앞 글자 하나)
}

//Event listners
//* refactoring ver.
form.addEventListener('submit', function(e) {
    e.preventDefault();

    checkRequired([username, email, password, password2])

    checkLength(username, 3, 15);
    checkLength(password, 6, 25);

    checkEmail(email);

    checkPasswordsMatch(password, password2);
});
