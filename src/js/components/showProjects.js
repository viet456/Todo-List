import { getProjects, getActiveProject, setActiveProject, deleteProject } from "@js/utilities/projectService";
import { showContextMenu } from "@js/components/contextMenu.js"; 
import { showProjectMenu } from "@js/components/showProjectMenu";
import '@css/components/projectTile.css';

export function showProjects() {
    const wrapper = document.createElement('div');
    wrapper.id = 'projects-wrapper';

    // event delegation listener for right-click on project tile
    wrapper.addEventListener('contextmenu', e => {
        const projectTile = e.target.closest('.project-tile');
        if (!projectTile) return;
        e.preventDefault();

        const projectName = projectTile.dataset.projectName;
        const project = getProjects().find(p => p.name === projectName);
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
                        const todayProject = getProjects().find(p => p.name === "Today");
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

        getProjects().forEach(project => {
            let projectTile = document.createElement('div');
            projectTile.classList.add('project-tile');
            projectTile.textContent = project.name;
            projectTile.dataset.projectName = project.name; 
            projectTile.style.color = project.color;
            if (active && project.name === active.name) projectTile.classList.add("active");
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