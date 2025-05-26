import '@css/base.css'
import { createTaskSection } from '@js/components/taskSection';
import { createSidebar } from '@js/components/sidebar';
import { Project } from '@js/utilities/project';
import { addProject, getProjects, createProject } from '@js/utilities/projectService';
import { Task } from '@js/utilities/task';
import { getActiveProject } from './js/utilities/projectService';

console.log(`we're live`);  

export function main() {
    const app = document.getElementById('app');
    let focus = getActiveProject();
    app.innerHTML = ''; 
    app.append(createSidebar(), createTaskSection());
    
    
}
main();
