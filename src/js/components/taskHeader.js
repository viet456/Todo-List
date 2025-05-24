import '@css/components/taskHeader.css'

export function taskHeader(project) {
    const title = document.createElement('div');
    title.id = 'taskHeader'
    title.textContent = project.name;
    return title;
}