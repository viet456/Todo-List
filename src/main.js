import '@css/base.css'
import { createTaskList } from '@js/components/taskList';
import { createSidebar } from '@js/components/sidebar';
import { renderTask } from '@js/utilities/renderTask'

export function main() {
    const app = document.getElementById('app');
    app.innerHTML = '';
    app.append(createSidebar(), createTaskList());
    renderTask();
}
main();
console.log(`we're live`);  