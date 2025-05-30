import { Project } from "src/features/projects/project";
import 'src/features/tasks/tasks.css'
import './contextMenu.css'

/**
 * Creates and shows a generic context menu at a specific position.
 * @param {number} x - The horizontal (left) position in pixels.
 * @param {number} y - The vertical (top) position in pixels.
 * @param {Array<Object>} menuItems - An array of menu item objects, e.g. [{ label: 'Delete', action: () => {} }]
 */
export function showContextMenu(x, y, menuItems) {
    // Remove any existing menu and its listeners first
    const old = document.getElementById('context-menu');
    if (old) old.remove();
    cleanupListeners();

    const menu = document.createElement('div');
    menu.id = 'context-menu';
    menu.style.position = 'absolute';
    menu.style.top  = y + 'px';
    menu.style.left = x + 'px';
    menu.classList.add('context-menu');

    // Create menu options for elements, from actions provided 
    // by their creator functions
    menuItems.forEach(item => {
        const option = document.createElement('div');
        option.textContent = item.label;
        option.addEventListener('click', () => {
            item.action();
            menu.remove();
            cleanupListeners();
        });
        menu.append(option);
    });

    // Don't show the menu if it has no actions
    if (!menu.hasChildNodes()) return;

    document.body.append(menu);

    document.addEventListener('click',  dismissMenu);
    document.addEventListener('keydown', dismissOnEsc);
}

// --- Helper functions for dismissing the menu ---
function dismissMenu(e) {
    const menu = document.getElementById('context-menu');
    if (menu && !menu.contains(e.target)) {
        menu.remove();
        cleanupListeners();
    };
}
function dismissOnEsc(e) {
    if (e.key === 'Escape') {
    const menu = document.getElementById('context-menu');
    if (menu) menu.remove();
    cleanupListeners();
  }
}
function cleanupListeners() {
    document.removeEventListener('click',  dismissMenu);
    document.removeEventListener('keydown', dismissOnEsc);
}