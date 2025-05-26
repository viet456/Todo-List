import { Project } from "@js/utilities/project";

let projects = [];

export function addProject(project) {
    projects.push(project);
}

export function getProjects() {
    return projects;
}

export function deleteProject(project) {
    projects = projects.filter(p => p !== project);
}

export function updateProject(project, changes) {
    //usage: 
    //updateProject(myProject, { name: "Tomorrow", color: "#f00" });
    Object.assign(project, changes);
}