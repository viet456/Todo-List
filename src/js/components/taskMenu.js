import { Project } from "@js/utilities/project";
import '@css/utilities/tasks.css'

export function showTaskMenu(x, y, task) {
    // remove any existing menu
    const old = document.getElementById('task-context-menu');
    if (old) old.remove();

    // create new menu
    const menu = document.createElement('div');
    menu.id = 'task-context-menu';
    menu.style.position = 'absolute';
    menu.style.top  = y + 'px';
    menu.style.left = x + 'px';
    menu.classList.add('context-menu');

    const tasks = task.project.tasks;
    const lastTask = tasks[tasks.length - 1];

    // menu option delete 
    if (task !== lastTask) {
        const deleteOption = document.createElement('div');
        deleteOption.textContent = 'Delete Task';
        deleteOption.addEventListener('click', () => {
            const id = task.id;
            task.project.deleteTask(task);
            //remove task by its id
            document.querySelector(`[data-task-id="${id}"]`).remove();
            menu.remove();
        });
        menu.append(deleteOption);
    }
    //don't show menu if no options
    if (!menu.hasChildNodes()) return;
    //for positioning
    document.body.append(menu);

    // close menu when clicked out of or Esc
    document.addEventListener('click',  dismissMenu);
    document.addEventListener('keydown', dismissOnEsc);
}

function dismissMenu(e) {
    const menu = document.getElementById('task-context-menu');
    //if menu is openend and users clicks off of it, close menu
    if (menu && !menu.contains(e.target)) {
        menu.remove();
    };
    cleanupListeners();
}
function dismissOnEsc(e) {
    if (e.key === 'Escape') {
    const menu = document.getElementById('task-context-menu');
    if (menu) menu.remove();
    cleanupListeners();
  }
}
function cleanupListeners() {
    document.removeEventListener('click',  dismissMenu);
    document.removeEventListener('keydown', dismissOnEsc);
}