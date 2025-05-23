import '@css/base.css'
import { createTaskList } from './js/components/taskList';
import { createSidebar } from './js/components/sidebar';

export function main() {
    const app = document.getElementById('app');
    app.innerHTML = '';
    app.append(createSidebar(), createTaskList());
}
main();
console.log(`we're live`);  