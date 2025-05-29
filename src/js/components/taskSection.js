import '@css/utilities/tasks.css'
import { projectHeader } from '@js/components/projectHeader';
import { getActiveProject } from '@js/utilities/projectService';
import { createTaskCreator } from '@js/components/taskCreator';
import { renderTask } from '@js/utilities/renderTask';

export function createTaskSection() {
    const taskSection = document.createElement('div');
    taskSection.id = 'taskSection';

    function render() {
        const project = getActiveProject();
        if (!project) return;
        taskSection.innerHTML = '';
        taskSection.append(projectHeader(project));
        
        const tasksListDiv = document.createElement('div');        
        tasksListDiv.id = 'taskList';
        project.tasks.forEach(task => {
            tasksListDiv.append(renderTask(task, project));
        });

        taskSection.append(tasksListDiv);
        taskSection.append(createTaskCreator(project));
    }
    
    render();
    //update task displayed to different active project
    window.addEventListener("activeProjectChanged", render);
    window.addEventListener("tasksChanged", render);
    return taskSection;
}