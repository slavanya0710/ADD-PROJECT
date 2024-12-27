let income = 0;
let monthlyLimit = 0;
let expenses = [];
let totalExpenses = 0;
let remainingBalance = 0;

document.getElementById('set-income-btn').addEventListener('click', setIncomeAndLimit);
document.getElementById('add-expense-btn').addEventListener('click', addExpense);
document.getElementById('search-btn').addEventListener('click', searchExpenses);

function setIncomeAndLimit(event) {
    event.preventDefault();
    income = parseFloat(document.getElementById('income').value);
    monthlyLimit = parseFloat(document.getElementById('limit').value);
    document.getElementById('income-display').innerHTML = `Income: $${income}`;
    document.getElementById('limit-display').innerHTML = `Monthly Limit: $${monthlyLimit}`;
}

function addExpense(event) {
    event.preventDefault();
    const text = document.getElementById('text').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const date = document.getElementById('date').value;
    const category = document.getElementById('category').value;

    const expense = {
        text,
        amount,
        date,
        category
    };

    expenses.push(expense);
    totalExpenses += amount;
    remainingBalance = income - totalExpenses;

    if (totalExpenses > monthlyLimit) {
        alert('Monthly limit exceeded!');
    }

    document.getElementById('expenses-list').innerHTML += `
        <li>
            ${text} - $${amount} - ${date} - ${category}
        </li>
    `;

    document.getElementById('total-expenses').innerHTML = `Total Expenses: $${totalExpenses}`;
    document.getElementById('remaining-balance').innerHTML = `Remaining Balance: $${remainingBalance}`;

    document.getElementById('text').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('date').value = '';
    document.getElementById('category').value = 'Food';
}

function searchExpenses(event) {
    event.preventDefault();
    const searchDate = document.getElementById('search-date').value;
    const searchCategory = document.getElementById('search-category').value;

    const filteredExpenses = expenses.filter(expense => {
        return (searchDate === '' || expense.date === searchDate) && (searchCategory === '' || expense.category === searchCategory);
    });

    document.getElementById('expenses-list').innerHTML = '';

    filteredExpenses.forEach(expense => {
        document.getElementById('expenses-list').innerHTML += `
            <li>
                ${expense.text} - $${expense.amount} - ${expense.date} - ${expense.category}
            </li>
        `;
    });
}