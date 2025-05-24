import { Task } from "@js/utilities/task";
import { printTask } from "@js/utilities/printTask";

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
            taskEl = printTask(task);
            taskList.append(taskEl);
        });
        return taskList;
    }
}

