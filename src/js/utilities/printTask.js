import { Task } from '@js/utilities/task.js'
import '@css/utilities/tasks.css'

export function printTask(task) {
    const wrapper = document.createElement('div');
    wrapper.className = 'task'
    wrapper.innerHTML = `
        <h4>${task.title}</h4><br>
        <p>${task.description}</p><br>
        <small>Due: ${task.dueDate} — Priority: ${task.priority}</small>
    `;
    console.log(wrapper);
    return wrapper;
}