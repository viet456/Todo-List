import '@css/base.css'
import { createTaskList } from '@js/components/taskList';
import { createSidebar } from '@js/components/sidebar';
import { Project } from '@js/utilities/project';
import { Task } from '@js/utilities/task';

console.log(`we're live`);  

export function main() {
    const app = document.getElementById('app');
    app.innerHTML = '';
    app.append(createSidebar(), createTaskList());
    const taskList = document.getElementById('taskList');
    //default project is for today
    const today = new Project('Today');
    //test task
    const todaysTask = new Task('test task', 'for development', 'today', 'high');
    today.addTask(todaysTask);
    console.log(today.tasks);
    taskList.append(today.showProjectTasks());
}
main();
