/**
 * @author Måns Bäckström
 *
 * src/client/main.ts
 */

// Import Tailwind CSS
import './main.css';

console.log('Hello from TypeScript!');

const button = document.getElementById('myBtn');
button?.addEventListener('click', () => {
    alert('FINALLY');
});

const butto1n = document.getElementById('Btn');
butto1n?.addEventListener('click', () => {
    alert('Button HAS BEEN UPDATED!');
});
