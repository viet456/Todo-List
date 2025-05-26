import '@css/components/taskSection.css'
import { taskHeader } from '@js/components/taskHeader';
import { getActiveProject } from '@js/utilities/projectService';

export function createTaskSection(project) {
    const taskSection = document.createElement('div');
    taskSection.id = 'taskSection';

    function render() {
        taskSection.append(taskHeader(project));
        const tasksList = project.showProjectTasks();
        taskSection.append(tasksList);
    }
    
    render();
    //update task displayed to different active project
    window.addEventListener("activeProjectChanged", () => {
        project = getActiveProject(); // update to the new project
        render();
    });
    return taskSection;
}