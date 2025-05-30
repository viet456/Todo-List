import './projectHeader.css'

export function projectHeader(project) {
    const title = document.createElement('div');
    title.id = 'projectHeader'
    title.textContent = project.name;
    title.style.color = project.color;
    return title;
}