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
        tasks.array.forEach((task) => {
            renderTask(task);
        });
    }
}

