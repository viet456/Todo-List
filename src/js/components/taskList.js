import '@css/components/task-list.css'

export function createTaskList() {
    const taskList = document.createElement('div');
    taskList.id = 'task-list';
    return taskList;
}