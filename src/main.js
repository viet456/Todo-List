import '@css/base.css'
import { createTaskList } from '@js/components/taskList';
import { createSidebar } from '@js/components/sidebar';
import { Project } from '@js/utilities/project';

console.log(`we're live`);  

export function main() {
    const app = document.getElementById('app');
    app.innerHTML = '';
    app.append(createSidebar(), createTaskList());
    const today = new Project("Today", [{"check this", 
      "example task", "soon", "high"
    }]);
    today.showProjectTasks();
}
main();
