// Selecionando os elementos
const display = document.querySelector('.display input');
const buttons = document.querySelectorAll('.btn');
let currentInput = ''; // Armazena o valor atual
let previousInput = ''; // Armazena o valor anterior
let operator = ''; // Armazena o operador atual

// Função para formatar o número com separadores de milhares e vírgula
function formatNumber(value) {
    return parseFloat(value).toLocaleString('en-US', { maximumFractionDigits: 10 });
}

// Função para atualizar o display com formatação
function updateDisplay(value) {
    display.value = formatNumber(value);
}

// Função para limpar o display
function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operator = '';
    updateDisplay('0');
}

// Função para deletar o último caractere
function backspace() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput || '0');
}

// Função para realizar operações matemáticas
function calculate() {
    let result = 0;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(curr)) return;

    switch (operator) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            result = prev / curr;
            break;
        case '%':
            result = prev * (curr / 100); // Calcula porcentagem do valor anterior
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = '';
    previousInput = '';
    updateDisplay(currentInput);
}

// Função para definir operadores
function setOperator(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }

    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

// Adicionando eventos para os botões
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        // Verifica se o botão é um número ou ponto decimal
        if (!isNaN(value) || value === '.') {
            // Evitar múltiplos pontos decimais
            if (value === '.' && currentInput.includes('.')) return;
            currentInput += value;
            updateDisplay(currentInput);
        }

        // Verifica se o botão é uma operação
        if (value === '+' || value === '-' || value === '*' || value === '/' || value === '%') {
            setOperator(value);
        }

        // Verifica se o botão é igual
        if (value === '=') {
            calculate();
        }

        // Verifica se o botão é clear
        if (value === 'C') {
            clearDisplay();
        }

        // Verifica se o botão é backspace
        if (value === '←') {
            backspace();
        }
    });
});

// Iniciar o display com 0
updateDisplay('0');