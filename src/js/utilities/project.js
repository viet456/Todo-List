import '@css/utilities/tasks.css'
import { Task } from "@js/utilities/task";
import { renderTask } from "@js/utilities/renderTask";
import { showContextMenu } from "@js/components/contextMenu";
import { notifyTasks, notifyProjects } from '@js/utilities/projectService';

export class Project {
    // default-task status set to false by default
    constructor(name, isDefault = false) {
        this.name = name;
        this.id = crypto.randomUUID();
        this.tasks = [];
        this.color = '#000000';
        this.archived = false;
        this.isDefault = isDefault;
    }

    addTask(task) {
        task.project = this;
        this.tasks.push(task);
        notifyTasks();
    }

    deleteTask(taskToRemove) {
        this.tasks = this.tasks.filter(t => t.id !== taskToRemove.id);
        notifyTasks();
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

