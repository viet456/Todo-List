import { Task } from "@js/utilities/task";

export function createTaskCreator(project) {
    const creatorEl = document.createElement('div');
    creatorEl.classList.add('task', 'task-creator');

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'New task';

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && input.value.trim() !== '') {
            const newTask = new Task(input.value.trim());
            project.addTask(newTask);
            // The main render function will automatically create a new, empty creator
        }
    });

    creatorEl.append(input);
    return creatorEl;
}