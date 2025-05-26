//@param {HTMLTextAreaElement}

export function resizeTextArea(textarea) {
    if (!textarea) return;
    const resize = () => {
        const lines = textarea.value.split('\n').length || 1;
        textarea.style.height = `${lines + 1.25}em`;
    };
    textarea.addEventListener('input', resize);
    textarea.addEventListener('focus', resize); 
    resize(); 
};