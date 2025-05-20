new Chart(COperArea, {
    type: 'doughnut',
    data: {
        labels: [
            'Ideal',
            'Prox. do límite',
            'Acima do límite',
        ],
        datasets: [{
            data: [20, 2, 1],
            backgroundColor: [
                '#2ECC71',
                '#F1C40F',
                '#E74C3C',
            ],
            hoverOffset: 4
        }]
    },
    options: {
        plugins: {
            responsive: true,
            maintainAspectRatio: false,
        },
    }
});