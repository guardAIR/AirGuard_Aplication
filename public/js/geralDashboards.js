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

const COlineGeneral = document.getElementById('COlineGeneral').getContext('2d');
const gradient = COlineGeneral.createLinearGradient(0, 0, 0, 200); // criando gradiente para o fundo do gráfico
gradient.addColorStop(0, '#006DAC'); // cor azul para o início do gráfico
gradient.addColorStop(1, 'rgba(0, 123, 255, 0)'); // adicionando cor transparente para o fundo do gráfico

new Chart(COlineGeneral, {
    type: 'line',
    data: {
        labels: ['7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h'],
        datasets: [{
            data: [3, 4, 3.5, 10, 12, 16, 7, 8, 20, 25, 30],
            borderColor: '#006DAC',
            backgroundColor: gradient, // aplicando o gradiente como fundo do gráfico
            fill: true,
            tension: 0.4, // deixa o gráfico mais suave
            pointRadius: 0 // remove os pontos do gráfico
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                display: true,
                grid: {
                    display: false // remove as linhas verticais do gráfico
                }
            },
            y: {
                display: true,
                grid: {
                    display: false // remove as linhas horizontais do gráfico
                }
            }
        },
        plugins: {
            legend: {
                display: false // remove a legenda do gráfico
            },
            annotation: {
                annotations: {
                    limiteGas: {
                        type: 'line',
                        yMin: 39,
                        yMax: 39,
                        borderColor: '#FF0000',
                        borderWidth: 2,
                        borderDash: [6, 4],
                        label: {
                            content: "Limite (39ppm)",
                            enabled: true,
                            backgroundColor: "#006DAC",
                            color: "white",
                            position: "end",
                            font: {
                                size: 14,
                            },
                        }
                    }
                }
            }
        }
    }
});