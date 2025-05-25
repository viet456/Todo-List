import { Task } from '@js/utilities/task.js'
import { enterField } from '@js/utilities/enterField';
import { saveField } from '@js/utilities/saveField';
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

    //input field focused on
    wrapper.addEventListener('focusin', e => {
        let field = e.target.dataset.field;
        if (!field) return;
        console.log(field);
        enterField(field);
    });

    //save when input field exited
    wrapper.addEventListener('blur', e => {
        let field = e.target.dataset.field;
        if (!field) return;
        exitField(field);
    });
    return wrapper;
}