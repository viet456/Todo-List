import '@css/utilities/tasks.css'
import { projectHeader } from '@js/components/projectHeader';
import { getActiveProject } from '@js/utilities/projectService';

export function createTaskSection() {
    const taskSection = document.createElement('div');
    taskSection.id = 'taskSection';

    function render() {
        const project = getActiveProject();
        taskSection.innerHTML = '';
        taskSection.append(projectHeader(project));
        const tasksList = project.showProjectTasks();
        taskSection.append(tasksList);
    }
    
    render();
    //update task displayed to different active project
    window.addEventListener("activeProjectChanged", () => {
        let project = getActiveProject(); // update to the new project
        render();
    });
    return taskSection;
}