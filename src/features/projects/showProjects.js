import { getProjects, getActiveProject, setActiveProject, deleteProject } from "src/features/projects/projectService";
import { showContextMenu } from "src/shared/contextMenu.js"; 
import { showProjectMenu } from "src/features/projects/showProjectMenu";
import './projectTile.css';

export function showProjects() {
    const wrapper = document.createElement('div');
    wrapper.id = 'projects-container';

    wrapper.classList.add('view-grid');

    // event delegation listener for right-click on project tile
    wrapper.addEventListener('contextmenu', e => {
        const projectTile = e.target.closest('.project-tile');
        if (!projectTile) return;
        e.preventDefault();

        const projectName = projectTile.dataset.projectName;
        const projectId = projectTile.dataset.projectId;
        const project = getProjects().find(p => p.id === projectId);
        if (!project) return;

        const menuItems = [];

        // edit projects
        menuItems.push({
            label: `Edit "${project.name}"`,
            action: () => {
                showProjectMenu(project); // Pass the project to put the menu in "edit mode"
            }
        });

        // prevent deleting the default projects
        if (!project.isDefault) {
            menuItems.push({
                label: `Delete "${project.name}"`,
                action: () => {
                    if (getActiveProject() === project) {
                        const todayProject = getProjects().find(p => p.id === "system-today");
                        if (todayProject) setActiveProject(todayProject);
                    }
                    deleteProject(project);
                }
            });
        }
        showContextMenu(e.pageX, e.pageY, menuItems);
    });

    function render() {
        wrapper.innerHTML = '';
        const active = getActiveProject();
        
        getProjects()
        .filter(project => !project.isHiddenInSidebar)
        .forEach(project => {
            let projectTile = document.createElement('div');
            projectTile.classList.add('project-tile');
            projectTile.textContent = project.name;
            projectTile.dataset.projectName = project.name; 
            projectTile.dataset.projectId = project.id;
            projectTile.style.color = project.color;
            if (active && project.id === active.id) projectTile.classList.add("active");
            // set project to active when its tile is clicked
            projectTile.addEventListener('click', () => {
                setActiveProject(project);
            }); 
            wrapper.append(projectTile);
        });
    }
    
    window.addEventListener("projectsChanged", render);
    window.addEventListener("activeProjectChanged", render);
    render();
    return wrapper;
}