import '@css/utilities/tasks.css'
import { Task } from "@js/utilities/task";
import { renderTask } from "./renderTask";

export class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
        this.ensureBlankTask();
    }

    //one empty task at the end - empty if no title
    ensureBlankTask() {
        let last = this.tasks[this.tasks.length - 1];
        //if no tasks in project or if last task is titled 
        if (!last || last.title.trim() !== '') {
            this.tasks.push(new Task('', '', '', false, false));
        }
    }

    //add a task at the end of the task list
    addTask(task) {
        //ensures a blank task to insert before
        this.ensureBlankTask();
        const lastIdx = this.tasks.length - 1;
        //add task after last titled task
        this.tasks.splice(lastIdx, 0, task);
    }

    //render each project 
    showProjectTasks() {
        this.ensureBlankTask();
        const taskList = document.createElement('div');
        taskList.id = 'taskList';
        this.tasks.forEach((task) => {
            let taskEl = renderTask(task);
            taskList.append(taskEl);
        });
        return taskList;
    }
}

