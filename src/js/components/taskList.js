import '@css/components/taskList.css'

export function createTaskList() {
    const taskList = document.createElement('div');
    taskList.id = 'taskList';
    return taskList;
}