/**
 * @author Måns Bäckström
 *
 * src/client/main.ts
 */

// Import Tailwind CSS
import './main.css';

// En gemensam lyssnare för hela formen
const form = document.querySelector('form');

// Funktioner
function updateSectionTotal(section: Element) {
    // Hitta alla inmatningsfält i just denna sektion
    const inputs = section.querySelectorAll('.income-amount') as NodeListOf<HTMLInputElement>;;
    let total = 0;
    
    inputs.forEach(input => {
        const val = parseFloat(input.value) || 0;
        total += val;
    });

    console.log(total);

    // Hitta display-elementet i denna sektion (klassen total-amount i din HTML)
    
    const display = section.querySelector('.total-amount');
    console.log(display);
    if (display) {
        display.textContent = total.toLocaleString('sv-SE', { 
            minimumFractionDigits: 2,
            maximumFractionDigits: 2 
        });
    }
}

form?.addEventListener('click', (e: Event) => {
    const target = e.target as HTMLElement

    // Hantera ADD
    if (target.classList.contains('add-btn')) {
        // Gå upp till den stora boxen som innehåller allt
        const section = target.closest('.main-category-box'); 

        // Leta NERÅT inuti den boxen efter containern
        const container = section?.querySelector('.row-container');
        
        const newRow = `
            <div class="income-row flex-1 flex">
                <input class="m-2.5 p-2 rounded-md bg-white shadow-lg border-2 border-purple-200" type="text" placeholder="Source">
                <input class="income-amount m-2.5 p-2 rounded-md bg-white shadow-lg border-2 border-purple-200" 
                    type="number" 
                    step="0.01" 
                    placeholder="0.00">
                <button class="rem-btn m-2.5 p-2 rounded-md bg-white shadow-lg border-2 border-red-500 font-mono text-red-500 transition-colors hover:bg-red-500 hover:text-white" type="button">
                    -
                </button>
            </div>`;
        
        container?.insertAdjacentHTML('beforeend', newRow);
    }

    // Hantera REM
    if (target.classList.contains('rem-btn')) {
        target.closest('.income-row')?.remove();
    }
});

form?.addEventListener('input', (e: Event) => {
    const target = e.target as HTMLInputElement;

    if (target.classList.contains('income-amount')) {
        const section = target.closest('.main-category-box');
        if (section) updateSectionTotal(section);
    }
});
