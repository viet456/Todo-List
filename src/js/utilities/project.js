import '@css/utilities/tasks.css'
import { Task } from "@js/utilities/task";
import { renderTask } from "@js/utilities/renderTask";
import { showContextMenu } from "@js/components/contextMenu";

export class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
        this.color = '#000000';
        this.archived = false;
        this.addBlankTask();
    }

    // one empty task at the end
    addBlankTask() {
        const blank = new Task('', '', '', false, false);
        blank.project = this;
        this.tasks.push(blank);
        return blank;
    }

    //add a task at the end of the task list
    addTask(task) {
        //task is linked to its project
        task.project = this;
        //adds a blank task to insert before
        const insertIndex = this.tasks.findIndex(t => t.title.trim() === '');
        if (insertIndex !== -1) {
            // insert the new task just before the blank
            this.tasks.splice(insertIndex, 0, task);
        } else {
            // create blank after if not existing
            this.tasks.push(task);
            this.addBlankTask();
        }
    }

    deleteTask(taskToRemove) {
        // new tasks array without task to remove
        this.tasks = this.tasks.filter(t => t.id !== taskToRemove.id);
        // ensure blank after task deletion
        const hasBlank = this.tasks.some(t => t.title.trim() === '');
        if (!hasBlank) {
            this.addBlankTask();
        }
    }

    //create project tasks elements
    showProjectTasks() {
        const taskList = document.createElement('div');
        taskList.id = 'taskList';   

        taskList.addEventListener('contextmenu', e => {
            const taskEl = e.target.closest('.task');
            if (!taskEl) return;
            e.preventDefault();
            const taskId = taskEl.dataset.taskId;
            const task = this.tasks.find(t => t.id === taskId);
            if (!task) return;

            const menuItems = [];
            const lastTask = this.tasks[this.tasks.length - 1];

            if (task !== lastTask) {
                menuItems.push({
                    label: 'Delete Task',
                    action: () => {
                        this.deleteTask(task);
                        taskEl.remove();
                    }
                });
            }
            showContextMenu(e.pageX, e.pageY, menuItems);
        });

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

