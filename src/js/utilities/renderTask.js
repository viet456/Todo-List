import { Task } from '@js/utilities/task.js'
import '@css/utilities/tasks.css'

export function renderTask(task) {
    const wrapper = document.createElement('div');
    wrapper.className = 'task'

    // Title: single-line input
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.value = task.title; 
    titleInput.dataset.field = 'title';   

    // Due date: date picker
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.value = task.dueDate;
    dateInput.dataset.field = 'dueDate';

    // Priority: toggle yes/no
    const prioInput = document.createElement('input');
    prioInput.type = 'checkbox';
    prioInput.value = task.priority;
    prioInput.dataset.field = 'priority';

    // Description: multi-line textarea
    const descArea = document.createElement('textarea');
    descArea.value = task.description;
    descArea.dataset.field = 'description';

    const taskFooter = document.createElement('div');
    taskFooter.classList.add('task-footer');
    taskFooter.append(dateInput, prioInput, descArea);
    wrapper.append(titleInput, taskFooter);

    //find element clicked on and return its data field type
    wrapper.addEventListener('click', e => {
        const field = e.target.dataset.field;
        if (!field) return;
        console.log(field);
    });
    return wrapper;
}