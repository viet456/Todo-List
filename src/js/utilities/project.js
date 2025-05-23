import { Task } from "@js/utilities/task";
import { renderTask } from "@js/utilities/renderTask";

export class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    showProjectTasks() {
        this.tasks.forEach((task) => {
            renderTask(task);
        });
    }
}

