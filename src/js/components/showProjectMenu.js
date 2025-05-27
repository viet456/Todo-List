import { Project } from "@js/utilities/project";
import { createProject } from "@js/utilities/projectService";
import '@css/components/projectMenu.css'
import { updateProject } from "../utilities/projectService";

export function showProjectMenu() {
    console.log("showProjectMenu function called!");

    const old = document.getElementById('project-menu');
    if (old) old.remove();

    const popup = document.createElement('div');
    popup.id = 'project-menu';
    popup.innerHTML = `
        <div class="popup">
            <h2>New Project</h2>
            <label>Name: <input type="text" id="project-name" /></label>
            <label>Color: <input type="color" id="project-color" /></label>
            <div class="popup-actions">
                <button id="cancel-project">Cancel</button>
                <button id="save-project">Save</button>
            </div>
        </div>`;
    document.body.append(popup);

    document.getElementById('cancel-project').addEventListener('click', () => {
        popup.remove();
    });
    document.getElementById('save-project').addEventListener('click', () => {
        const name = document.getElementById('project-name').value.trim();
        const color = document.getElementById('project-color').value;
        if (name) {
            const newProject = createProject(name);
            updateProject(newProject, {color: color})
            popup.remove();
        }
    });
}