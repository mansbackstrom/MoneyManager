/**
 * @author Måns Bäckström
 *
 * src/client/main.ts
 */

// Import Tailwind CSS
import './main.css';

// 1. Select elements with proper types
const add_income = document.getElementById('add_income') as HTMLButtonElement | null;
const container = document.getElementById('test') as HTMLDivElement | null;
const total_income_display = document.getElementById('total-income-display') as HTMLSpanElement | null;

// 2. The calculation function
const calculateTotal = (): void => {
    if (!total_income_display) return;

    let total = 0;
    // We cast the NodeList to an array of Input elements
    const inputs = document.querySelectorAll('.income-amount') as NodeListOf<HTMLInputElement>;
    
    inputs.forEach(input => {
        // parseFloat handles decimals; || 0 handles empty strings
        const val = parseFloat(input.value) || 0;
        total += val;
    });

    total_income_display.textContent = total.toFixed(2);
};

// 3. Add Item Button Logic
add_income?.addEventListener('click', () => {
    // Note: Added 'income-amount' class and type="number"
    const incomeRowHtml = `
        <div class="flex-1 flex">
            <input class="m-2.5 p-2 rounded-md bg-white shadow-lg border-2 border-purple-200" type="text" placeholder="Income Source">
            <input class="income-amount m-2.5 p-2 rounded-md bg-white shadow-lg border-2 border-purple-200" 
                   type="number" 
                   step="0.01" 
                   placeholder="0.00">
            <button class="delete-btn ml-2 text-red-500 hover:text-red-700 transition-colors" type="button">
                🗑️
            </button>
        </div>`;
    
    container?.insertAdjacentHTML('beforeend', incomeRowHtml);
});

// 4. Event Delegation for Live Updates
// We listen on the container so even NEWLY added inputs trigger the calculation
container?.addEventListener('input', (e: Event) => {
    const target = e.target as HTMLInputElement;
    
    if (target.classList.contains('income-amount')) {
        calculateTotal();
    }
});