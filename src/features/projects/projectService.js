import { Project } from "src/features/projects/project";
import { Task } from "src/features/tasks";

let activeProject;
let projects = [];

// helper function sends tasks created in "All" to Inbox
export function fileTask(task, project = null) {
  const dest = (!project || project.id === 'system-all') ? getInboxProject() : project;
    dest.addTask(task);
}

export function notifyTasks() {
  window.dispatchEvent(new CustomEvent("tasksChanged"));
}

export function notifyProjects() {
  window.dispatchEvent(new CustomEvent("projectsChanged"));
}

export function setActiveProject(project) {
  activeProject = project;
  window.dispatchEvent(new CustomEvent("activeProjectChanged"));
}

export function getActiveProject() {
  return activeProject;
}

//add to projects array
export function addProject(project) {
    projects.push(project);
    notifyProjects();
}

export function createProject(projectName) {
  const newProject = new Project(projectName, false);
  addProject(newProject);
  return newProject;
}

export function getProjects() {
  // create an "All" pseudo-project that shows all tasks
  const allProject = {
    name: 'All',
  // getter runs when calling allProject.tasks
    get tasks() {
      return projects.flatMap(p => p.tasks);
    },
    id: 'system-all',
    isDefault: true,
    color: '#fffffff', 
    showProjectTasks: Project.prototype.showProjectTasks,
    render: function() {
      const oldList = document.getElementById('taskList');
      if (oldList) {
                const newList = this.showProjectTasks();
                oldList.parentNode.replaceChild(newList, oldList);
            }
    },
  };
  return [allProject, ...projects];
}

export function deleteProject(project) {
    projects = projects.filter(p => p !== project);
    notifyProjects();
}

export function updateProject(project, changes) {
    //usage: 
    //updateProject(myProject, { name: "Tomorrow", color: "#f00" });
    Object.assign(project, changes);
    notifyProjects();
    notifyTasks();
}
export function getInboxProject() {
    return projects.find(p => p.id === 'system-inbox');
}
//default projects
const today = new Project("Today", true);
const scheduled = new Project("Scheduled", true);
const inbox = new Project("Inbox", true);
setActiveProject(today);

projects.push(today);
projects.push(scheduled);
projects.push(inbox);
today.id = 'system-today';
scheduled.id = 'system-scheduled';
inbox.id = 'system-inbox';
inbox.isHiddenInSidebar = true;

today.addTask(new Task("Welcome!", "This is your first task.", null, false, false));
today.addTask(new Task("Click me", "Right-click to delete me.", null, false, false));
