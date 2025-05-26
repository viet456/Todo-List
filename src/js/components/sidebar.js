import '@css/components/sidebar.css'
import { showProjects } from '@js/components/showProjects';

export function createSidebar() {
    const sidebar = document.createElement('div');
    sidebar.id = 'sidebar';
    sidebar.innerHTML = ''
    sidebar.append(showProjects());
    return sidebar;
}