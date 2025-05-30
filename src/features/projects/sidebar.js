import './sidebar.css'
import { showProjects } from 'src/features/projects/showProjects';
import { showProjectMenu } from 'src/features/projects/showProjectMenu';

export function createSidebar() {
    const sidebar = document.createElement('div');
    sidebar.id = 'sidebar';

    // buttons to switch Projects rendering
    const viewControls = document.createElement('div');
    viewControls.classList.add('view-controls');

    const gridViewBtn = document.createElement('button');
    gridViewBtn.id = 'grid-view-btn';
    gridViewBtn.classList.add('view-btn', 'active'); 
    gridViewBtn.innerHTML = '▦';
    gridViewBtn.setAttribute('aria-label', 'Grid View');

    const listViewBtn = document.createElement('button');
    listViewBtn.id = 'list-view-btn';
    listViewBtn.classList.add('view-btn');
    listViewBtn.innerHTML = '≡';
    listViewBtn.setAttribute('aria-label', 'List View');

    viewControls.append(gridViewBtn, listViewBtn);

    // button to create new projects
    const createBtn = document.createElement('button');
    createBtn.id = 'create-project-btn';
    createBtn.textContent = 'New Project';
    createBtn.addEventListener('click', () => {
        showProjectMenu();
    });

    sidebar.append(viewControls);
    sidebar.append(showProjects());
    sidebar.append(createBtn);

    const projectsContainer = sidebar.querySelector('#projects-container');
    gridViewBtn.addEventListener('click', () => {
        // already on gridview, return
        if (projectsContainer.classList.contains('view-grid')) return;
        
        projectsContainer.classList.remove('view-list');
        projectsContainer.classList.add('view-grid');
        
        listViewBtn.classList.remove('active');
        gridViewBtn.classList.add('active');
    });

    listViewBtn.addEventListener('click', () => {
        // already on list view, return
        if (projectsContainer.classList.contains('view-list')) return;

        projectsContainer.classList.remove('view-grid');
        projectsContainer.classList.add('view-list');

        gridViewBtn.classList.remove('active');
        listViewBtn.classList.add('active');
    });
    
    return sidebar;
}