import { Project } from "@js/utilities/project";
import { Task } from "@js/utilities/task";

let activeProject = null;
let projects = [];

function notifyProjects() {
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

export function createProject(project) {
  const newProject = new Project(project);
  addProject(newProject);
  return newProject;
}

export function getProjects() {
    return projects;
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
}

//default project
const defaultProject = new Project("Today");
projects.push(defaultProject);
setActiveProject(defaultProject);
const secondProject = new Project("Scheduled");
projects.push(secondProject);

defaultProject.addTask(new Task("Welcome!", "This is your first task.", null, false, false));
defaultProject.addTask(new Task("Click me", "Right-click to delete me.", null, false, false));
