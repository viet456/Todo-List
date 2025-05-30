import './tasks.css'; // Ensure this path is correct
import { projectHeader, getActiveProject } from 'src/features/projects';
import { createTaskCreator } from 'src/features/tasks/taskCreator.js';
import { renderTask } from 'src/features/tasks/taskCard.js';

export function createTaskSection() {
    const taskSection = document.createElement('div');
    taskSection.id = 'taskSection';

    let currentProjectCache = getActiveProject();

    let headerElement = projectHeader(currentProjectCache || { name: 'Loading project...', tasks: [] });
    taskSection.append(headerElement);

    const tasksListDiv = document.createElement('div');
    tasksListDiv.id = 'taskList';
    taskSection.append(tasksListDiv);

    let creatorElement = createTaskCreator(currentProjectCache || { name: 'Loading project...', tasks: [] });
    taskSection.append(creatorElement);

    function render() {
        const projectData = getActiveProject();

        if (!projectData) {
            if (headerElement) {
                // Create a new header for "No project" state to avoid modifying a potentially shared object
                const noProjectHeader = projectHeader({ name: 'No project selected', tasks: [] });
                if (headerElement.parentNode) headerElement.parentNode.replaceChild(noProjectHeader, headerElement);
                headerElement = noProjectHeader;
            }
            tasksListDiv.innerHTML = '';
            if (creatorElement) creatorElement.style.display = 'none';
            currentProjectCache = null;
            return;
        }

        // Update header and creator only if project instance or ID has changed
        if (!currentProjectCache || projectData.id !== currentProjectCache.id) {
            const newHeader = projectHeader(projectData);
            if (headerElement.parentNode) headerElement.parentNode.replaceChild(newHeader, headerElement);
            headerElement = newHeader;

            const newCreator = createTaskCreator(projectData);
            if (creatorElement.parentNode) creatorElement.parentNode.replaceChild(newCreator, creatorElement);
            creatorElement = newCreator;
            
            currentProjectCache = projectData;
        }
        if (creatorElement) creatorElement.style.display = '';


        // --- Focus Preservation Logic ---
        let activeDOMElement = document.activeElement;
        let focusedTaskId = null;
        let focusedField = null;
        let selectionStart = null;
        let selectionEnd = null;
        const activeTaskCardDOM = activeDOMElement && typeof activeDOMElement.closest === 'function' 
                                    ? activeDOMElement.closest('.task[data-task-id]') 
                                    : null;

        if (activeTaskCardDOM && tasksListDiv.contains(activeTaskCardDOM)) {
            focusedTaskId = activeTaskCardDOM.dataset.taskId;
            focusedField = activeDOMElement.dataset.field;
            if (activeDOMElement && typeof activeDOMElement.selectionStart === 'number') {
                selectionStart = activeDOMElement.selectionStart;
                selectionEnd = activeDOMElement.selectionEnd;
            }
        }
        // --- End Focus Preservation Logic ---

        tasksListDiv.innerHTML = ''; 
        if (projectData.tasks) {
            projectData.tasks.forEach(taskData => {
                tasksListDiv.appendChild(renderTask(taskData, projectData));
            });
        }

        // --- Focus Restoration Logic ---
        if (focusedTaskId && focusedField) {
            const cardToFocus = tasksListDiv.querySelector(`.task[data-task-id="${focusedTaskId}"]`);
            if (cardToFocus) {
                const fieldToFocus = cardToFocus.querySelector(`[data-field="${focusedField}"]`);
                if (fieldToFocus && typeof fieldToFocus.focus === 'function') {
                    // console.log("Restoring focus to:", focusedField, "in task:", focusedTaskId);
                    fieldToFocus.focus();
                    if (selectionStart !== null && typeof fieldToFocus.setSelectionRange === 'function') {
                        try { fieldToFocus.setSelectionRange(selectionStart, selectionEnd); } catch (e) {/*ignore if not applicable*/}
                    }
                }
            }
        }
        // --- End Focus Restoration Logic ---
    }

    render(); // Initial render

    window.addEventListener("activeProjectChanged", render);
    window.addEventListener("tasksChanged", render); 

    return taskSection;
}