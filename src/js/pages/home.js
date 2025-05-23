import '@css/pages/home.css'
export function renderHome() {
    const app = document.getElementById('app');
    //create sidebar and main section
    const sidebar = document.createElement('div');
    sidebar.id = 'sidebar';
    const todoList = document.createElement('div');
    todoList.id = 'todo-list';
    app.append(sidebar, todoList);
}