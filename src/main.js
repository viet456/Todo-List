import '@css/base.css'
import { createHeader } from '@js/components/header';
import { createNav } from '@js/components/nav';

export function main() {
    const app = document.getElementById('app');
    app.innerHTML = '';
    app.append(createHeader(), createNav());
}
main();
console.log(`we're live`);