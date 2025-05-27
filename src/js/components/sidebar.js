import '@css/components/sidebar.css'
import { showProjects } from '@js/components/showProjects';
import { showProjectMenu } from '@js/components/showProjectMenu';

export function createSidebar() {
    const sidebar = document.createElement('div');
    sidebar.id = 'sidebar';
    sidebar.innerHTML = ''

    const createBtn = document.createElement('button');
    createBtn.id = 'create-project-btn';
    createBtn.textContent = 'New Project';
    createBtn.addEventListener('click', () => {
        showProjectMenu();
    });

    sidebar.append(showProjects());
    sidebar.append(createBtn);
    
    return sidebar;
}