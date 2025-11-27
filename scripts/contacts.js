    document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = form.querySelector('input[type="text"]').value;
        const email = form.querySelector('input[type="email"]').value;
        const subject = form.querySelectorAll('input[type="text"]')[1].value;
        const message = form.querySelector('textarea').value;

        if (!name || !email || !subject || !message) {
            alert('Пожалуйста, заполните все поля');
            return;
        }
        if (!isValidEmail(email)) {
            alert('Пожалуйста, введите корректный email адрес');
            return;
        }
        showSuccessMessage();
        form.reset();
    });
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const formInputs = contactForm.querySelectorAll('input, textarea, select');
    const privacyCheckbox = document.getElementById('privacy-consent');
    const privacyError = document.getElementById('privacy-error');
    const privacyHint = document.getElementById('privacy-hint');
    updatePrivacyHint();
    
    formInputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearError);
    });
    
    privacyCheckbox.addEventListener('change', function() {
        validatePrivacyCheckbox();
        updatePrivacyHint();
    });
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        formInputs.forEach(input => {
            if (!validateField({ target: input })) {
                isValid = false;
            }
        });
        
        if (!validatePrivacyCheckbox()) {
            isValid = false;
        }
        
        if (isValid) {
            showSuccessMessage();
            contactForm.reset();
            updatePrivacyHint();
        } else {
            const firstError = contactForm.querySelector('[aria-invalid="true"]');
            if (firstError) {
                firstError.focus();
            }
        }
    });
    
    function validateField(e) {
        const field = e.target;
        const errorElement = document.getElementById(`${field.id}-error`);
        
        if (field.type === 'checkbox') {
            return validatePrivacyCheckbox();
        }
        
        field.setAttribute('aria-invalid', 'false');
        if (errorElement) {
            errorElement.textContent = '';
        }
        if (field.hasAttribute('required') && !field.value.trim()) {
            field.setAttribute('aria-invalid', 'true');
            if (errorElement) {
                errorElement.textContent = 'Это поле обязательно для заполнения';
            }
            return false;
        }
        if (field.type === 'email' && field.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                field.setAttribute('aria-invalid', 'true');
                if (errorElement) {
                    errorElement.textContent = 'Пожалуйста, введите корректный email адрес';
                }
                return false;
            }
        }
        
        return true;
    }
    
    function validatePrivacyCheckbox() {
        const isChecked = privacyCheckbox.checked;
        
        if (!isChecked) {
            privacyCheckbox.setAttribute('aria-invalid', 'true');
            privacyError.textContent = 'Необходимо согласие с обработкой персональных данных для отправки формы';
            return false;
        } else {
            privacyCheckbox.setAttribute('aria-invalid', 'false');
            privacyError.textContent = '';
            return true;
        }
    }
    
    function updatePrivacyHint() {
        if (!privacyCheckbox.checked) {
            privacyHint.textContent = '❌ Без согласия с обработкой персональных данных отправка формы невозможна';
            privacyHint.style.color = 'var(--error-color)';
            privacyHint.style.fontWeight = '600';
        } else {
            privacyHint.textContent = '✅ Согласие с обработкой персональных данных получено';
            privacyHint.style.color = 'var(--success-color)';


document.head.appendChild(style);

            privacyHint.style.color = 'var(--success-color)';
            privacyHint.style.fontWeight = '600';
        }
    }
    
    function clearError(e) {
        const field = e.target;
        if (field.type === 'checkbox') {
            return;
        }
        
        const errorElement = document.getElementById(`${field.id}-error`);
        
        field.setAttribute('aria-invalid', 'false');
        if (errorElement) {
            errorElement.textContent = '';
        }
    }
    
function showSuccessMessage() {
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.innerHTML = `
        <div class="success-content">
            <span class="success-icon">✓</span>
            <div>
                <h4>Сообщение отправлено!</h4>
            </div>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--success-color);
        color: white;
        padding: var(--space-lg);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 5000);
}
    function updateLiveRegion(regionId, message) {
        const region = document.getElementById(regionId);
        if (region) {
            region.textContent = message;
        }
    }
    function updateSubmitButtonState() {
        const submitButton = contactForm.querySelector('.form__button');
        const isFormValid = contactForm.checkValidity() && privacyCheckbox.checked;
        
        if (!isFormValid) {
            submitButton.style.opacity = '0.6';
            submitButton.style.cursor = 'not-allowed';
            submitButton.setAttribute('aria-disabled', 'true');
        } else {
            submitButton.style.opacity = '1';
            submitButton.style.cursor = 'pointer';
            submitButton.setAttribute('aria-disabled', 'false');
        }
    }
    contactForm.addEventListener('input', updateSubmitButtonState);
    privacyCheckbox.addEventListener('change', updateSubmitButtonState);
    updateSubmitButtonState();
});
