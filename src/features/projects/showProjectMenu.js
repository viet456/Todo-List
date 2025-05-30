import { Project } from "src/features/projects/project";
import { createProject } from "src/features/projects/projectService";
import './projectMenu.css'
import { updateProject } from "./projectService";

// create a new project, edit if project is passed in
export function showProjectMenu(projectToEdit = null) {
    const isEditMode = projectToEdit !== null;
    const old = document.getElementById('project-menu');
    if (old) old.remove();

    const popup = document.createElement('div');
    popup.id = 'project-menu';

    const title = isEditMode ? 'Edit Project' : 'New Project';
    const nameValue = isEditMode ? projectToEdit.name : '';
    const colorValue = isEditMode ? projectToEdit.color : '#000000';

    popup.innerHTML = `
        <div class="popup">
            <h2>${title}</h2>
            <div class="popup-content">
                <label>
                    <span>Name:</span> 
                    <input type="text" id="project-name" value="${nameValue}"/>
                </label>
                <label>
                    <span>Color:</span> 
                    <input type="color" id="project-color" value="${colorValue}"/>
                </label>
            </div>
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
            if (isEditMode) {
                updateProject(projectToEdit, { name: name, color: color });
            } else {
                const newProject = createProject(name);
                updateProject(newProject, { color: color }); 
            }
            popup.remove();
        };
    });
}