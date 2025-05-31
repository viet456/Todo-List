import { Task } from 'src/features/tasks/task.js'
import { Project } from "src/features/projects";

export function saveTask(fieldEl, task) {
    let prop = fieldEl.dataset.field;
    if (!prop) return { changed: false, deleted: false };

    let value;
    const originalValue = task[prop];

    if (prop === 'priority' && fieldEl.tagName === 'BUTTON') {
        value = fieldEl.getAttribute('aria-pressed') === 'true';
    } else if (fieldEl.type === 'checkbox') {
        value = fieldEl.checked;
    } else if (fieldEl.type === 'date') {
        value = fieldEl.value ? fieldEl.value : null; // HTML date input value is "YYYY-MM-DD"
    } else { // Text inputs, textareas
        value = fieldEl.value.trim();
    }

    let dataActuallyChanged = (originalValue !== value);
    if (prop === 'title' && originalValue === undefined && value === '') {
        dataActuallyChanged = false; // Initial empty title shouldn't count as a change
    }
    
    task[prop] = value;

    // handle task deletion
    if (prop === 'title' && value === '') {
        const isTrulyEmpty = !task.notes && !task.dueDate;
        if (isTrulyEmpty) {
            if (task.project && typeof task.project.deleteTask === 'function' && task.project.tasks && task.project.tasks.includes(task)) {
                task.project.deleteTask(task); // Modifies project's internal task list
                if (task.project.id) { 
                    localStorage.setItem(`project_${task.project.id}`, JSON.stringify(task.project));
                }
                return { changed: true, deleted: true };
            }
        }
    }
    if (dataActuallyChanged) {
        if (task.project && task.project.id) { 
            console.log('Saving project:', task.project);
            localStorage.setItem(`project_${task.project.id}`, JSON.stringify(task.project));
            console.log(`Project ${task.project.id} saved to localStorage due to task update.`);
        }
    }
    return { changed: dataActuallyChanged, deleted: false };
}