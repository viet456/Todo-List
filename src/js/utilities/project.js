import '@css/utilities/tasks.css'
import { Task } from "@js/utilities/task";
import { renderTask } from "./renderTask";

export class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
        this.ensureBlankTask();
    }

    //one empty task at the end; empty if no title
    ensureBlankTask() {
        // only add a blank if there is no blank anywhere
        const hasBlank = this.tasks.some(t => t.title.trim() === '');
        if (!hasBlank) {
            const blank = new Task('', '', '', false, false);
            blank.project = this;
            this.tasks.push(blank);
        }
    }

    //add a task at the end of the task list
    addTask(task) {
        //task is linked to its project
        task.project = this;

        //ensures a blank task to insert before
        this.ensureBlankTask();
        const lastIdx = this.tasks.length - 1;

        //add task after last titled task
        this.tasks.splice(lastIdx, 0, task);
    }

    deleteTask(taskToRemove) {
        //new tasks array without task to remove
        this.tasks = this.tasks.filter(t => t.id !== taskToRemove.id);
        this.ensureBlankTask();
    }

    //create project tasks elements
    showProjectTasks() {
        const taskList = document.createElement('div');
        taskList.id = 'taskList';
        this.tasks.forEach((task) => {
            let taskEl = renderTask(task);
            taskList.append(taskEl);
        });
        return taskList;
    }

    //render task list
    render() {
        const oldList = document.getElementById('taskList');
        const newList = this.showProjectTasks();
        oldList.parentNode.replaceChild(newList, oldList);
    }
}

