import '@css/base.css'
import { createTaskSection } from '@js/components/taskSection';
import { createSidebar } from '@js/components/sidebar';
import { Project } from '@js/utilities/project';
import { Task } from '@js/utilities/task';

console.log(`we're live`);  

export function main() {
    const app = document.getElementById('app');
    app.innerHTML = '';
    //default project is for today
    const today = new Project('Today');

    app.append(createSidebar(), createTaskSection(today));
    
    
    //test task
    const todaysTask = new Task('test task', 'for development', 'today', false, false);
    const todaysTask2 = new Task('test task', 'for development', 'today', false, false);
    today.addTask(todaysTask);
    today.addTask(todaysTask2);
    taskSection.append(today.showProjectTasks());
}
main();
