import { Project } from "@js/utilities/project";
import { Task } from "@js/utilities/task";

let activeProject = null;
let projects = [];

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
    // save each project.tasks into tasks
    tasks: projects.flatMap(p => p.tasks),
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

//default project
const defaultProject = new Project("Today", true);
projects.push(defaultProject);
setActiveProject(defaultProject);
const secondProject = new Project("Scheduled", true);
projects.push(secondProject);

defaultProject.addTask(new Task("Welcome!", "This is your first task.", null, false, false));
defaultProject.addTask(new Task("Click me", "Right-click to delete me.", null, false, false));
