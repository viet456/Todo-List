import '@css/utilities/tasks.css'
import { Task } from "@js/utilities/task";
import { renderTask } from "./renderTask";

export class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    showProjectTasks() {
        const taskList = document.createElement('div');
        taskList.id = 'taskList';
        let taskEl = document.createElement('div');
        taskEl.className = 'task'
        this.tasks.forEach((task) => {
            taskEl = renderTask(task);
            taskList.append(taskEl);
        });
        return taskList;
    }
}

