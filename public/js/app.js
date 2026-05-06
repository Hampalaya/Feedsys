/* Use app-enhanced.js loaded after for full functionality */

// Make toast available globally even if app-enhanced fails
window.toast = function(message, type = 'info') {
    console.log(`Toast [${type}]: ${message}`);
    const toastDiv = document.createElement('div');
    toastDiv.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-[9999] ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 'bg-blue-500'
    } text-white`;
    toastDiv.textContent = message;
    document.body.appendChild(toastDiv);
    
    setTimeout(() => {
        toastDiv.classList.add('opacity-0', 'transition-opacity', 'duration-500');
        setTimeout(() => toastDiv.remove(), 500);
    }, 3000);
};

