import { getProjects } from "@js/utilities/projectService";
import { getActiveProject, setActiveProject } from "@js/utilities/projectService";
import '@css/components/projectTile.css'

export function showProjects() {
    const wrapper = document.createElement('div');
    wrapper.id = 'projects-wrapper';

    function render() {
        wrapper.innerHTML = '';
        let active = getActiveProject();

        getProjects().forEach(project => {
            let projectTile = document.createElement('div');
            projectTile.classList.add('project-tile');
            projectTile.textContent = project.name;
            projectTile.style.color = project.color;
            if (project === active) projectTile.classList.add("active");
            //switch projects on click
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