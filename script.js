let tbcal = "";
const useinp = document.getElementById('useinp');
const compinp = document.getElementById('compout');
const historyList = document.getElementById('historyList');
let memory = 0;
let recognition;
let isAdvancedMode = false;

// Add value to the calculation
function calcad(value) {
    tbcal += value;
    useinp.value = tbcal;
    highlightButton(value);
}

// Remove the last character
function removech() {
    tbcal = tbcal.substring(0, tbcal.length - 1);
    useinp.value = tbcal;
}

// Evaluate the calculation
function execm() {
    if (tbcal.length === 0 || tbcal === "") {
        alert("Needs an input");
        return;
    }
    try {
        const ans = eval(tbcal);
        compinp.value = ans;
        addToHistory(`${tbcal} = ${ans}`);
        tbcal = "";
    } catch (err) {
        alert("Invalid Input");
    }
}

// Reset the calculation
function reset() {
    useinp.value = "";
    compinp.value = "";
    tbcal = "";
}

// Highlight button interaction
function highlightButton(value) {
    const buttons = document.querySelectorAll('td');
    buttons.forEach(button => {
        if (button.innerText === value) {
            button.classList.add('active');
            setTimeout(() => {
                button.classList.remove('active');
            }, 200);
        }
    });
}

// Add calculation to history
function addToHistory(entry) {
    const listItem = document.createElement('li');
    listItem.textContent = entry;
    listItem.addEventListener('click', () => {
        const [input, output] = entry.split(' = ');
        useinp.value = input;
        compinp.value = output;
    });
    historyList.appendChild(listItem);
    if (historyList.childNodes.length > 10) {
        historyList.removeChild(historyList.firstChild);
    }
    saveHistory();
}

// Export history to a file
function exportHistory() {
    const historyText = Array.from(historyList.childNodes).map(node => node.textContent).join('\n');
    const blob = new Blob([historyText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'history.txt';
    link.click();
}

// Clear history
function clearHistory() {
    historyList.innerHTML = '';
    saveHistory();
}

// Start voice input
function startVoiceInput() {
    if (!recognition) {
        recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        recognition.onresult = (event) => {
            const spokenText = event.results[0][0].transcript;
            tbcal = spokenText;
            useinp.value = tbcal;
        };
    }
    recognition.start();
}

// Plot graph for the given function
function plotGraph() {
    const expression = prompt("Enter the function of x (e.g., x^2):");
    if (!expression) return;
    const graphCanvas = document.getElementById('graphCanvas');
    graphCanvas.style.display = 'block';
    const ctx = graphCanvas.getContext('2d');
    const width = graphCanvas.width = 400;
    const height = graphCanvas.height = 400;
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    for (let x = -width / 2; x < width / 2; x++) {
        let y;
        try {
            y = eval(expression.replace(/x/g, `(${x / 20})`)) * 20;
        } catch (err) {
            alert("Invalid Function");
            graphCanvas.style.display = 'none';
            return;
        }
        ctx.lineTo(width / 2 + x, height / 2 - y);
    }
    ctx.stroke();
}

// Initialize event listeners and apply saved settings
document.addEventListener('DOMContentLoaded', () => {
    const themeButton = document.querySelector('.toggle-theme');
    themeButton.addEventListener('click', toggleTheme);
    const modeButton = document.querySelector('.toggle-mode');
    modeButton.addEventListener('click', toggleMode);
    applyTheme(getSavedTheme());
    loadHistory();
    document.addEventListener('keydown', handleKeyboardShortcuts);
});

// Toggle between light and dark themes
function toggleTheme() {
    const currentTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(currentTheme);
    saveTheme(currentTheme);
}

// Apply the selected theme
function applyTheme(theme) {
    document.body.className = theme;
    document.querySelector('.container').className = `container ${theme}`;
}

// Save the current theme to local storage
function saveTheme(theme) {
    localStorage.setItem('theme', theme);
}

// Retrieve the saved theme from local storage
function getSavedTheme() {
    return localStorage.getItem('theme') || 'dark';
}

// Toggle between simple and advanced modes
function toggleMode() {
    isAdvancedMode = !isAdvancedMode;
    const container = document.querySelector('.container');
    if (isAdvancedMode) {
        container.classList.add('advanced');
    } else {
        container.classList.remove('advanced');
    }
}

// Save history to local storage
function saveHistory() {
    const historyText = Array.from(historyList.childNodes).map(node => node.textContent);
    localStorage.setItem('history', JSON.stringify(historyText));
}

// Load history from local storage
function loadHistory() {
    const savedHistory = JSON.parse(localStorage.getItem('history') || '[]');
    savedHistory.forEach(entry => addToHistory(entry));
}

// Clear memory
function mc() {
    memory = 0;
    alert("Memory cleared");
}

// Recall memory
function mr() {
    if (memory === 0) {
        alert("Memory is empty");
    } else {
        calcad(memory.toString());
    }
}

// Add to memory
function mplus() {
    if (compinp.value !== "") {
        memory += parseFloat(compinp.value);
        alert(`Memory updated: ${memory}`);
    } else {
        alert("No value to add to memory");
    }
}

// Subtract from memory
function mminus() {
    if (compinp.value !== "") {
        memory -= parseFloat(compinp.value);
        alert(`Memory updated: ${memory}`);
    } else {
        alert("No value to subtract from memory");
    }
}

// Handle keyboard shortcuts for calculator functions
function handleKeyboardShortcuts(event) {
    if (event.key >= '0' && event.key <= '9' || event.key === '.') {
        calcad(event.key);
    } else if (event.key === 'Enter') {
        execm();
    } else if (event.key === 'Backspace') {
        removech();
    } else if (['+', '-', '*', '/'].includes(event.key)) {
        calcad(event.key);
    }
}

// Calculate factorial
function factorial(n) {
    if (n === 0) return 1;
    return n * factorial(n - 1);
}

// Open unit and currency converter modal
function openConverter() {
    const modal = document.getElementById('converterModal');
    modal.style.display = 'block';
}

// Close the converter modal
function closeConverter() {
    const modal = document.getElementById('converterModal');
    modal.style.display = 'none';
}

// Open customization modal
function openCustomization() {
    const modal = document.getElementById('customizationModal');
    modal.style.display = 'block';
}

// Close customization modal
function closeCustomization() {
    const modal = document.getElementById('customizationModal');
    modal.style.display = 'none';
}

// Open financial calculator modal
function openFinancialCalculator() {
    const modal = document.getElementById('financialModal');
    modal.style.display = 'block';
}

// Close financial calculator modal
function closeFinancialCalculator() {
    const modal = document.getElementById('financialModal');
    modal.style.display = 'none';
}

// Open programming calculator modal
function openProgrammingCalculator() {
    const modal = document.getElementById('programmingModal');
    modal.style.display = 'block';
}

// Close programming calculator modal
function closeProgrammingCalculator() {
    const modal = document.getElementById('programmingModal');
    modal.style.display = 'none';
}

// Open matrix operations modal
function openMatrixOperations() {
    const modal = document.getElementById('matrixModal');
    modal.style.display = 'block';
}

// Close matrix operations modal
function closeMatrixOperations() {
    const modal = document.getElementById('matrixModal');
    modal.style.display = 'none';
}

// Open statistics modal
function openStatistics() {
    const modal = document.getElementById('statisticsModal');
    modal.style.display = 'block';
}

// Close statistics modal
function closeStatistics() {
    const modal = document.getElementById('statisticsModal');
    modal.style.display = 'none';
}

// Open scientific notation input
function openScientificNotation() {
    const input = prompt("Enter number in scientific notation (e.g., 1e3 for 1000):");
    if (input) {
        calcad(input);
    }
}

// Open memory slots management
function openSlots() {
    const action = prompt("Manage memory slots (store, recall, clear). Example: 'store slot1' or 'recall slot1':");
    if (!action) return;
    
    const [cmd, slot] = action.split(' ');
    if (cmd && slot) {
        if (cmd === 'store' && compinp.value) {
            localStorage.setItem(slot, compinp.value);
            alert(`Stored ${compinp.value} in ${slot}`);
        } else if (cmd === 'recall') {
            const value = localStorage.getItem(slot);
            if (value) {
                calcad(value);
                alert(`Recalled ${value} from ${slot}`);
            } else {
                alert(`${slot} is empty`);
            }
        } else if (cmd === 'clear') {
            localStorage.removeItem(slot);
            alert(`Cleared ${slot}`);
        }
    }
}

// Open keyboard shortcuts help
function openKeyboardShortcuts() {
    alert("Keyboard shortcuts:\n\n0-9: Input numbers\n.: Decimal\nEnter: Equals\nBackspace: Delete\n+: Add\n-: Subtract\n*: Multiply\n/: Divide");
}

// Live calculation preview
function livePreview() {
    const preview = document.getElementById('useinp');
    preview.addEventListener('input', function() {
        try {
            const result = eval(preview.value);
            compinp.value = result;
        } catch (err) {
            compinp.value = 'Error';
        }
    });
}

// Search history
function searchHistory() {
    const searchValue = document.getElementById('searchHistory').value.toLowerCase();
    const historyItems = historyList.getElementsByTagName('li');
    Array.from(historyItems).forEach(item => {
        if (item.textContent.toLowerCase().includes(searchValue)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}

// Placeholder for Financial Calculator Functions
function calculateInterest(principal, rate, time) {
    return principal * Math.pow(1 + rate / 100, time);
}

function calculateLoanPayment(principal, rate, time) {
    rate = rate / 100 / 12;
    time = time * 12;
    return (principal * rate) / (1 - Math.pow(1 + rate, -time));
}

// Placeholder for Programming Calculator Functions
function convertToBinary(number) {
    return (number >>> 0).toString(2);
}

function convertToHexadecimal(number) {
    return number.toString(16).toUpperCase();
}

// Placeholder for Matrix Operations
function addMatrices(matrixA, matrixB) {
    if (matrixA.length !== matrixB.length || matrixA[0].length !== matrixB[0].length) {
        throw new Error("Matrices must have the same dimensions");
    }
    return matrixA.map((row, i) => row.map((val, j) => val + matrixB[i][j]));
}

function multiplyMatrices(matrixA, matrixB) {
    if (matrixA[0].length !== matrixB.length) {
        throw new Error("Number of columns in the first matrix must equal the number of rows in the second");
    }
    return matrixA.map(row => matrixB[0].map((_, i) => row.reduce((sum, elm, j) => sum + elm * matrixB[j][i], 0)));
}

// Placeholder for Statistical Functions
function calculateMean(data) {
    return data.reduce((a, b) => a + b, 0) / data.length;
}

function calculateStandardDeviation(data) {
    const mean = calculateMean(data);
    return Math.sqrt(data.reduce((sq, n) => sq + Math.pow(n - mean, 2), 0) / data.length);
}

// Placeholder for NLP Parsing (simple)
function parseNaturalLanguage(input) {
    // Basic parsing for "what is" questions
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes("what is")) {
        const equation = lowerInput.replace("what is", "").trim();
        return equation;
    }
    return "";
}

// Implement basic unit and currency conversion
function convertUnits(value, fromUnit, toUnit) {
    const conversionRates = {
        'meter-kilometer': 0.001,
        'kilometer-meter': 1000,
        'gram-kilogram': 0.001,
        'kilogram-gram': 1000
        // Add more unit conversions here
    };

    const key = `${fromUnit}-${toUnit}`;
    return value * (conversionRates[key] || 1);
}

function convertCurrency(value, fromCurrency, toCurrency) {
    const conversionRates = {
        'USD-EUR': 0.85,
        'EUR-USD': 1.18,
        'USD-JPY': 110,
        'JPY-USD': 0.0091
        // Add more currency conversions here
    };

    const key = `${fromCurrency}-${toCurrency}`;
    return value * (conversionRates[key] || 1);
}
