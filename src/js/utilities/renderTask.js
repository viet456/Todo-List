import { Task } from '@js/utilities/task.js'
import { enterField } from '@js/utilities/enterField';
import { saveField } from '@js/utilities/saveField';
import '@css/utilities/tasks.css'

export function renderTask(task) {
    const wrapper = document.createElement('div');
    wrapper.className = 'task'

    // Done: toggle yes/no
    const doneInput = document.createElement('input');
    doneInput.type = 'checkbox';
    doneInput.checked = task.done;
    doneInput.dataset.field = 'done';

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
    prioInput.checked = task.priority;
    prioInput.dataset.field = 'priority';

    // Description: multi-line textarea
    const descArea = document.createElement('textarea');
    descArea.value = task.description;
    descArea.dataset.field = 'description';

    //task element sections
    const taskHeader = document.createElement('header');
    taskHeader.classList.add('task__header');
    const taskInfo = document.createElement('div');
    taskInfo.classList.add('task__info');
    taskHeader.append(doneInput, titleInput);
    taskInfo.append(descArea, dateInput, prioInput);
    wrapper.append(taskHeader, taskInfo);

    //input field focused on
    wrapper.addEventListener('focusin', e => {
        let field = e.target.dataset.field;
        if (!field) return;
        enterField(field);
    });

    //save when input field exited
    wrapper.addEventListener('focusout', e => {
        let fieldEl = e.target;
        saveField(fieldEl, task);
    });
    return wrapper;
}