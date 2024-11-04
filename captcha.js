// Function to generate a random CAPTCHA
function generateCaptcha(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        captcha += chars[randomIndex];
    }
    return captcha;
}

// Function to display a new CAPTCHA
function refreshCaptcha() {
    const captchaElement = document.getElementById('captcha');
    const newCaptcha = generateCaptcha(6); // Generate a 6-character CAPTCHA
    captchaElement.textContent = newCaptcha;
    captchaElement.dataset.captcha = newCaptcha;
}

// Display CAPTCHA on page load
document.addEventListener('DOMContentLoaded', () => {
    refreshCaptcha(); // Display initial CAPTCHA

    const submitButton = document.getElementById('submit-btn');
    const refreshButton = document.getElementById('refresh-captcha');
    const messageElement = document.getElementById('message');
    const formDataContainer = document.getElementById('form-data');
    const displayName = document.getElementById('display-name');
    const displayEmail = document.getElementById('display-email');
    const displayPhone = document.getElementById('display-phone');

    // Refresh CAPTCHA when button is clicked
    refreshButton.addEventListener('click', () => {
        refreshCaptcha();
        document.getElementById('captcha-input').value = ''; // Clear CAPTCHA input
    });

    // Validate form on submit
    submitButton.addEventListener('click', () => {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const captchaInput = document.getElementById('captcha-input').value;
        const notRobotChecked = document.getElementById('not-robot').checked;

        // Check if all fields are filled, checkbox is checked, and CAPTCHA matches
        if (!name || !email || !phone || !captchaInput || !notRobotChecked) {
            messageElement.textContent = 'Please complete all fields and confirm you are not a robot.';
            messageElement.style.color = 'red';
            return;
        }

        if (captchaInput === document.getElementById('captcha').dataset.captcha) {
            messageElement.textContent = 'Form submitted successfully!';
            messageElement.style.color = 'green';

            // Display form data
            displayName.textContent = name;
            displayEmail.textContent = email;
            displayPhone.textContent = phone;
            formDataContainer.style.display = 'block';

            // Lock the form by disabling inputs and buttons
            document.getElementById('name').disabled = true;
            document.getElementById('email').disabled = true;
            document.getElementById('phone').disabled = true;
            document.getElementById('captcha-input').disabled = true;
            document.getElementById('not-robot').disabled = true;
            submitButton.disabled = true;
            refreshButton.disabled = true;

        } else {
            messageElement.textContent = 'Invalid CAPTCHA. Please try again.';
            messageElement.style.color = 'red';
        }
    });
});
