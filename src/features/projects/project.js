import 'src/features/tasks/tasks.css'
import { Task, renderTask } from "src/features/tasks";
import { showContextMenu } from "src/shared/contextMenu";
import { notifyTasks, notifyProjects } from 'src/features/projects/projectService';

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
        localStorage.setItem(`project_${this.id}`, JSON.stringify(this));
        notifyTasks();
    }

    deleteTask(taskToRemove) {
        this.tasks = this.tasks.filter(t => t.id !== taskToRemove.id);
        localStorage.setItem(`project_${this.id}`, JSON.stringify(this));
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
        const taskList = document.getElementById('taskList');
        if (!taskList) return;

        this.tasks.forEach((task) => {
            const taskEl = taskList.querySelector(`[data-task-id="${task.id}"]`);

            if (taskEl) {
                const titleEl = taskEl.querySelector('input[data-field="title"]'); 
                const notesEl = taskEl.querySelector('textarea[data-field="notes"]'); 
                if (titleEl) {
                    titleEl.value = task.title || ""; 
                }
                if (notesEl) {
                    notesEl.value = task.notes || ""; 
                }
            } else {
                const newTaskEl = renderTask(task);
                taskList.append(newTaskEl);
            }
        });
    }
}

