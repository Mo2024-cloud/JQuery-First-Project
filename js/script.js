/// <reference types="../@types/jquery" />
$('#filterName').on('click',function(){
    console.log('ha');
})

$(document).ready(function() {
    const apiUrl = 'http://localhost:3000'; // URL of your local server

    // Fetch data from the API
    $.getJSON(`${apiUrl}/customers`, function(customers) {
        $.getJSON(`${apiUrl}/transactions`, function(transactions) {
            displayData(customers, transactions);
        });
    });

    function displayData(customers, transactions) {
        const tableBody = $('#customerTable tbody');
        tableBody.empty();

        transactions.forEach(transaction => {
            const customer = customers.find(c => c.id === transaction.customer_id);
            const row = `<tr>
                <td>${customer.name}</td>
                <td>${transaction.date}</td>
                <td>${transaction.amount}</td>
            </tr>`;
            tableBody.append(row);
        });

        // Filter functionality
        $('#filterName').on('input', function() {
            const filterValue = $(this).val().toLowerCase();
            tableBody.find('tr').each(function() {
                const customerName = $(this).find('td').eq(0).text().toLowerCase();
                $(this).toggle(customerName.includes(filterValue));
            });
        });

        $('#filterAmount').on('input', function() {
            const filterValue = parseFloat($(this).val());
            tableBody.find('tr').each(function() {
                const transactionAmount = parseFloat($(this).find('td').eq(2).text());
                $(this).toggle(transactionAmount >= filterValue);
            });
        });

        // Display graph
        displayGraph(customers, transactions);
    }

    function displayGraph(customers, transactions) {
        const ctx = $('#transactionGraph');
        const customerNames = customers.map(c => c.name);
        const transactionAmounts = customers.map(customer => {
            return transactions
                .filter(t => t.customer_id === customer.id)
                .reduce((sum, t) => sum + t.amount, 0);
        });

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: customerNames,
                datasets: [{
                    label: 'Total Transaction Amount',
                    data: transactionAmounts,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
});
