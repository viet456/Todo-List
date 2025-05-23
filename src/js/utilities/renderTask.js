import { Task } from '@js/utilities/task.js'

export function renderTask() {
    const task1 = new Task("make task", "for the app", "any time", "high");
    const task1text = JSON.stringify(task1);
    console.log(task1text);
}