import { Task } from '@js/utilities/task.js'
import { Project } from "@js/utilities/project";
import { renderTask } from '@js/utilities/renderTask';

export function saveTask(fieldEl, task) {
    let prop = fieldEl.dataset.field;
    //if not a task property then ignore
    if (!prop) return;
    //save field by type
    let value;
    if (fieldEl.type === 'checkbox') {
        value = fieldEl.checked;
    } else if (fieldEl.type === 'date') {
        //convert date to JS date and store if it exists
        value = fieldEl.value 
                ? new Date(fieldEl.value).toLocaleDateString()
                : null;
    } else {
        //for text inputs remove white space
        value = fieldEl.value.trim();
    }
    console.log('saved', value, 'to', fieldEl.dataset.field)
    task[prop] = value;

    // delete task only if empty title and contents
    if (prop === 'title' && value === '') {
        const isTrulyEmpty = !task.notes && !task.dueDate;
        if (isTrulyEmpty) {
            const tasks = task.project.tasks;
            const lastTask = tasks[tasks.length - 1];
            if (task !== lastTask) {
                const id = task.id;
                task.project.deleteTask(task);
                //remove task by id
                document.querySelector(`[data-task-id="${id}"]`).remove();
            }
        }
        return;
    }

    // add new blank task if current blank task is titled and added
    const tasks = task.project.tasks;
    const lastTask = tasks[tasks.length - 1];
    if (prop === 'title' && lastTask.title !=='' && task === lastTask) {
        const newBlankTask = task.project.addBlankTask();
        if (newBlankTask) {
            const newEl = renderTask(newBlankTask);
            document.getElementById('taskList').append(newEl);
        }
    }
}