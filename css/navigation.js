// Create a hidden input element for mobile keyboard support
const hiddenInput = document.createElement('input');
hiddenInput.type = 'tel'; // Shows numeric keypad on mobile
hiddenInput.pattern = '[1-3]*'; // Restricts input to numbers 1-3
hiddenInput.inputMode = 'numeric'; // Ensures numeric keyboard on mobile
hiddenInput.style.cssText = 'position:fixed; opacity:0; pointer-events:none;'; // Hide but keep focusable
document.body.appendChild(hiddenInput);

// Navigation handler function
function handleKeyPress(e) {
    const key = e.key || e.target.value;
    switch(key) {
        case '1':
            location.href = '/bbs.html';
            break;
        case '2':
            location.href = '/bbs/coding-research.html';
            break;
        case '3':
            location.href = '/index.html';
            break;
    }
    // Clear input after navigation
    if (e.target === hiddenInput) {
        e.target.value = '';
    }
}

// Add event listeners
document.onkeypress = handleKeyPress;
hiddenInput.addEventListener('input', handleKeyPress);

// Focus input on page interaction
function focusInput() {
    hiddenInput.focus();
}

document.addEventListener('click', focusInput);
document.addEventListener('touchstart', focusInput);

// Initial focus
focusInput();