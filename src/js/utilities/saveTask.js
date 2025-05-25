import { Task } from '@js/utilities/task.js'
import { Project } from "@js/utilities/project";

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

    //add new blank task if current blank task is titled and added
    const tasks = task.project.tasks;
    const lastTask = tasks[tasks.length - 1];
    if (prop === 'title' && lastTask.title !=='') {
        //rerender task list
        task.project.ensureBlankTask();
        const oldList = document.getElementById('taskList');
        oldList.innerHTML = '';
        const newList = task.project.showProjectTasks();
        oldList.parentNode.replaceChild(newList, oldList);    
    }
}