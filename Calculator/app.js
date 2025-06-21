const display = document.querySelector('input[name="display"]');
const buttons = document.querySelectorAll('input[type="button"]');

let expression = '';

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const value = this.value;
        
        if (value === 'AC') {
            expression = '';
            display.value = '';
        }
        else if (value === 'DE') {
            expression = expression.slice(0, -1);
            display.value = expression;
        }
        else if (value === '=') {
            try {
                const result = eval(expression);
                display.value = result;
                expression = result.toString();
            } catch (error) {
                display.value = 'Error';
                expression = '';
            }
        }
        else {
            expression += value;
            display.value = expression;
        }
    });
});

document.addEventListener('keydown', function(e) {
    const key = e.key;
    
    if ((key >= '0' && key <= '9') || ['+', '-', '*', '/', '.'].includes(key)) {
        expression += key;
        display.value = expression;
    }
    else if (key === 'Enter' || key === '=') {
        e.preventDefault();
        try {
            const result = eval(expression);
            display.value = result;
            expression = result.toString();
        } catch (error) {
            display.value = 'Error';
            expression = '';
        }
    }
    else if (key === 'Escape') {
        expression = '';
        display.value = '';
    }
    else if (key === 'Backspace') {
        expression = expression.slice(0, -1);
        display.value = expression;
    }
});