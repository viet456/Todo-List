import { Task } from '@js/utilities/task.js'
import '@css/utilities/tasks.css'

export function renderTask(task) {
    const wrapper = document.createElement('div');
    wrapper.className = 'task'

    const titleEl = document.createElement('h4');
    const descEl = document.createElement('p');
    const dateEl = document.createElement('small');
    const priorityEl = document.createElement('small');    

    titleEl.textContent = task.title;
    descEl.textContent = task.description;
    dateEl.textContent = task.dueDate;
    priorityEl.textContent = task.priority;

    //on-click target parameters
    titleEl.dataset.field = 'title';
    descEl.dataset.field = 'description';
    dateEl.dataset.field = 'dueDate';
    priorityEl.dataset.field = 'priority';
    [titleEl, descEl, dateEl, priorityEl].forEach(el => {
        el.classList.add('task-field');
    });

    wrapper.append(titleEl, descEl, dateEl, priorityEl)
    console.log(wrapper);

    //find element clicked on and return its data field type
    wrapper.addEventListener('click', e => {
        const field = e.target.dataset.field;
        if (!field) return;
        console.log(field);
    });
    return wrapper;
}