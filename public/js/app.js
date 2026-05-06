/* Use app-enhanced.js loaded after for full functionality */

// Make toast available globally even if app-enhanced fails
window.toast = function(message, type = 'info') {
    console.log(`Toast [${type}]: ${message}`);
    const toastDiv = document.createElement('div');
    toastDiv.className = `fixed top-10 right-4 p-4 rounded-lg shadow-lg z-[10000] ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 'bg-blue-500'
    } text-white min-w-[300px] flex items-center justify-between pointer-events-auto`;
    toastDiv.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" class="ml-4 hover:opacity-75">✕</button>
    `;
    document.body.appendChild(toastDiv);
    
    setTimeout(() => {
        if (toastDiv.parentElement) {
            toastDiv.classList.add('opacity-0', 'transition-opacity', 'duration-500');
            setTimeout(() => toastDiv.remove(), 500);
        }
    }, 5000);
};

