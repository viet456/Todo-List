import { Task } from "src/features/tasks/task";
import { renderTask } from "src/features/tasks/taskCard";
import { getInboxProject, getActiveProject } from "src/features/projects";
export function createTaskCreator(project) {
    const creatorTaskInstance = new Task('', '', null, null, false, true);
    const creatorEl = renderTask(creatorTaskInstance, project); 
    creatorEl.classList.add('task', 'task-creator');

    return creatorEl;
}