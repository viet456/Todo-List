import '@css/components/taskSection.css'
import { taskHeader } from '@js/components/taskHeader';

export function createTaskSection(project) {
    const taskSection = document.createElement('div');
    taskSection.id = 'taskSection';

    taskSection.append(taskHeader(project));
    return taskSection;
}