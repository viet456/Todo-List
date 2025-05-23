import '@css/pages/home.css'
import { createHeader } from '../components/header';
import { createNav } from '../components/nav';

export function renderHome() {
    const app = document.getElementById('app');
    app.innerHTML = '';
    app.append(createHeader(), createNav());
}