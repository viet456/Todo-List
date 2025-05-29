import { Task } from "@js/utilities/task";
import { renderTask } from "@js/utilities/renderTask";
import { getInboxProject, getActiveProject } from "@js/utilities/projectService";
export function createTaskCreator(project) {
    const creatorTaskInstance = new Task('', '', null, null, false, true);
    const creatorEl = renderTask(creatorTaskInstance, project); 
    creatorEl.classList.add('task', 'task-creator');

    return creatorEl;
}