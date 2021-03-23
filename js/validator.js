//đối tượng validator
function Validator(options) {
    // hàm thực hiện validate
    function validate(inputElement, rule) {
        var errorMessage = rule.test(inputElement.value);
        var errorElement = inputElement.parentElement.querySelector('.form-message');

        if (errorMessage) {
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid');
        } else {
            errorElement.innerText = '';
            inputElement.parentElement.classList.remove('invalid')
        }
    }

    // lấy element của form cần validate
    var formElement = document.querySelector(options.form);
    if (formElement) {
        //khi submit form
        formElement.onsubmit = function(e) {
            e.preventDefault();


            // lặp qua từng rules và validate
            options.rules.forEach(function(rule) {
                var inputElement = formElement.querySelector(rule.selector);
                validate(inputElement, rule)
            });
        }

        // lặp qua mỗi rule và xử lý 
        options.rules.forEach(function(rule) {
            var inputElement = formElement.querySelector(rule.selector)


            if (inputElement) {
                // xử lý trường hợp blur khỏi input
                inputElement.onblur = function() {
                        validate(inputElement, rule)
                    }
                    //xử lý mỗi khi người dùng nhập vào input
                inputElement.oninput = function() {
                    var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
                    errorElement.innerText = '';
                    inputElement.parentElement.classList.remove('invalid')
                }
            }
        });
    }

}


//định nghĩa rules
Validator.isRequired = function(selector, message) {
    return {
        selector: selector,
        test: function(value) {
            return value.trim() ? undefined : message || 'Vui lòng nhập trường này !'
        }
    };
}
Validator.isEmail = function(selector) {
    return {
        selector: selector,
        test: function(value) {
            var regex =

                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            return regex.test(value) ? undefined : 'Vui lòng nhập Email !'

        }
    };
}
Validator.minLength = function(selector, min ) {
    return {
        selector: selector,
        test: function(value) {
            return value.length >= min ? undefined : `Vui long nhập ${min} ký tự`;

        }
    };
}
Validator.isConfirmed = function(selector, getCofirmValue , message) {
    return {
        selector: selector,
        test: function(value) {
            return value === getCofirmValue() ? undefined : message ||'Giá trị không chính xác ';
        }
    }
}