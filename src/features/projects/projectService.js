import { Project } from "./project";
import { Task } from "src/features/tasks";

let activeProject;

function getProjectsFromStorage() {
  let projectArray = []

  if (typeof localStorage === 'undefined') {
    console.warn("localStorage is not available. Cannot load projects.");
    return projectArray; 
  }

  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    if ((localStorage.key(i)).startsWith('project_')) {
      let value = localStorage.getItem(key);
      if (value) {
        try {
          const plainProjectData = JSON.parse(value);
          if (plainProjectData && typeof plainProjectData === 'object' && plainProjectData.id && plainProjectData.name) {
            const projectInstance = new Project(plainProjectData.name, plainProjectData.isDefault);
            Object.assign(projectInstance, plainProjectData); 
            projectArray.push(projectInstance);
          } else {
            console.warn(`Data for key "${key}" was parsed but does not look like a valid project:`, plainProjectData);
          }
        } catch (error) {
          console.error(`Error parsing JSON for key "${key}":`, error, "\nValue was:", value);
        }
      } else {
        console.warn(`No value found for project key "${key}", though key exists.`);
      }
    }
  }
  return projectArray;
}
let projects = getProjectsFromStorage();


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
    localStorage.setItem(`project_${project.id}`, JSON.stringify(project))
    notifyProjects();
}

export function createProject(projectName) {
  const systemNames = ['All', 'Today', 'Scheduled', 'Inbox'];
  if (systemNames.some(name => name.toLowerCase() === projectName.toLowerCase())) {
    alert(`"${projectName}" is a reserved name and cannot be used. Please choose a different name.`);
    return null;
  }
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
  if (!project || typeof project.id === 'undefined') {
    console.error("deleteProject: Invalid project object or project.id is missing.", project);
    return; 
  }
  const systemProjectIds = [
    'system-all', 
    'system-today', 
    'system-scheduled', 
    'system-inbox'];
  if (systemProjectIds.includes(project.id)) {
    console.log('Cannot delete system project')
    return;
  } else {
    projects = projects.filter(p => p.id !== project.id);
    localStorage.removeItem(`project_${project.id}`);
    notifyProjects();
  }
}

export function updateProject(project, changes) {
    //usage: 
    //updateProject(myProject, { name: "Tomorrow", color: "#f00" });
    Object.assign(project, changes);
    localStorage.setItem(`project_${project.id}`, JSON.stringify(project));
    notifyProjects();
    notifyTasks();
}

export function getInboxProject() {
    return projects.find(p => p.id === 'system-inbox');
}
//default projects
const defaultProjectSpecs = [
    { name: "Today", id: 'system-today', isDefault: true },
    { name: "Scheduled", id: 'system-scheduled', isDefault: true },
    { name: "Inbox", id: 'system-inbox', isDefault: true }
];

defaultProjectSpecs.forEach(spec => {
  // Check if a project with this system ID was already loaded from localStorage
  let existingProject = projects.find(p => p.id === spec.id);

  if (!existingProject) {
    // If not loaded from storage, create a new instance and add it
    const newDefaultProject = new Project(spec.name, spec.isDefault);
    newDefaultProject.id = spec.id; 
    addProject(newDefaultProject); 
    existingProject = newDefaultProject;
  }
  if (spec.id === 'system-today') {
    setActiveProject(existingProject);
  }  
});

