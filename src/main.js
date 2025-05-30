import 'src/shared/base.css'
import { createSidebar } from 'src/features/projects/sidebar';
import { Project, addProject, getProjects, createProject, getActiveProject } from 'src/features/projects';
import { createTaskSection, Task } from 'src/features/tasks';


console.log(`we're live`);  

export function main() {
    const app = document.getElementById('app');
    let focus = getActiveProject();
    app.innerHTML = ''; 
    app.append(createSidebar(), createTaskSection());
}
main();
