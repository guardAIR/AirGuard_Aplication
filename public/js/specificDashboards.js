const options_specific_geral = {
    responsive: true,
    scales: {
        x: {
            display: false, // remove o eixo x do gráfico
        },
        y: {
            display: false, // remove o eixo y do gráfico
        }
    },
    plugins: {
        legend: {
            display: false // remove a legenda do gráfico
        }
    }
}

const options_sensor_graph = {
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
                        position: "start",
                        font: {
                            size: 14,
                        },
                    }
                },
                alertaMedio: {
                    type: 'line',
                    yMin: 20,
                    yMax: 20,
                    borderColor: '#FF9900',
                    borderWidth: 2,
                    borderDash: [6, 4],
                    label: {
                        content: "Atenção (20ppm)",
                        enabled: true,
                        backgroundColor: "#006DAC",
                        color: "white",
                        position: "start",
                        font: {
                            size: 14,
                        },
                    }
                }
            }
        }
    }
}

const options_limitPerArea_graph = {

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
                        position: "start",
                        font: {
                            size: 14,
                        },
                    }
                },
                alertaMedio: {
                    type: 'line',
                    yMin: 30,
                    yMax: 30,
                    borderColor: '#FF9900',
                    borderWidth: 2,
                    borderDash: [6, 4],
                    label: {
                        content: "Alerta (30ppm)",
                        enabled: true,
                        backgroundColor: "#006DAC",
                        color: "white",
                        position: "start",
                        font: {
                            size: 14,
                        },
                    }
                }
            }
        }
    }
}

const options_bubble_graph = {
    scales: {
        x: {
            display: false, // remove o eixo x do gráfico
            min: 10,
            max: 90
        },
        y: {
            display: false, // remove o eixo y do gráfico
            min: 10,
            max: 90
        }
    },
    plugins: {
        legend: {
            display: false // remove a legenda do gráfico
        }
    }
}

const options_alert_graph = {
    scales: {
        y: {
            min: 0,
            suggestedMax: 5,
            ticks: {
                stepSize: 1
            }
        }
    },
}

const area1_geral = document.getElementById('area1_geral').getContext('2d');
const gradient = area1_geral.createLinearGradient(0, 0, 0, 90); // criando gradiente para o fundo do gráfico
gradient.addColorStop(0, 'rgb(0, 109, 172, .2)'); // cor azul para o início do gráfico
gradient.addColorStop(1, 'rgba(0, 123, 255, 0)'); // adicionando cor transparente para o fundo do gráfico

new Chart(area1_geral, {
    type: 'line',
    data: {
        labels: ['7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h'],
        datasets: [{
            data: [10, 14, 15, 16, 10, 5, 10, 16, 20, 30, 39],
            borderColor: '#006DAC',
            backgroundColor: gradient, // aplicando o gradiente como fundo do gráfico
            fill: true,
            tension: 0.4, // deixa o gráfico mais suave
            pointRadius: 0 // remove os pontos do gráfico
        }]
    },
    options: options_specific_geral
});

const area2_geral = document.getElementById('area2_geral').getContext('2d');
new Chart(area2_geral, {
    type: 'line',
    data: {
        labels: ['7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h'],
        datasets: [{
            data: [10, 14, 15, 16, 10, 5, 10, 16, 20, 30, 39],
            borderColor: '#006DAC',
            backgroundColor: gradient, // aplicando o gradiente como fundo do gráfico
            fill: true,
            tension: 0.4, // deixa o gráfico mais suave
            pointRadius: 0 // remove os pontos do gráfico
        }]
    },
    options: options_specific_geral
});

const area3_geral = document.getElementById('area3_geral').getContext('2d');
new Chart(area3_geral, {
    type: 'line',
    data: {
        labels: ['7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h'],
        datasets: [{
            data: [10, 14, 15, 16, 10, 5, 10, 16, 20, 30, 39],
            borderColor: '#006DAC',
            backgroundColor: gradient, // aplicando o gradiente como fundo do gráfico
            fill: true,
            tension: 0.4, // deixa o gráfico mais suave
            pointRadius: 0 // remove os pontos do gráfico
        }]
    },
    options: options_specific_geral
});

const area4_geral = document.getElementById('area4_geral').getContext('2d');
new Chart(area4_geral, {
    type: 'line',
    data: {
        labels: ['7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h'],
        datasets: [{
            data: [10, 14, 15, 16, 10, 5, 10, 16, 20, 30, 39],
            borderColor: '#006DAC',
            backgroundColor: gradient, // aplicando o gradiente como fundo do gráfico
            fill: true,
            tension: 0.4, // deixa o gráfico mais suave
            pointRadius: 0 // remove os pontos do gráfico
        }]
    },
    options: options_specific_geral
});

const area5_geral = document.getElementById('area5_geral').getContext('2d');
new Chart(area5_geral, {
    type: 'line',
    data: {
        labels: ['7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h'],
        datasets: [{
            data: [10, 14, 15, 16, 10, 5, 10, 16, 20, 30, 39],
            borderColor: '#006DAC',
            backgroundColor: gradient, // aplicando o gradiente como fundo do gráfico
            fill: true,
            tension: 0.4, // deixa o gráfico mais suave
            pointRadius: 0 // remove os pontos do gráfico
        }]
    },
    options: options_specific_geral
});

const area6_geral = document.getElementById('area6_geral').getContext('2d');
new Chart(area6_geral, {
    type: 'line',
    data: {
        labels: ['7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h'],
        datasets: [{
            data: [10, 14, 15, 16, 10, 5, 10, 16, 20, 30, 39],
            borderColor: '#006DAC',
            backgroundColor: gradient, // aplicando o gradiente como fundo do gráfico
            fill: true,
            tension: 0.4, // deixa o gráfico mais suave
            pointRadius: 0 // remove os pontos do gráfico
        }]
    },
    options: options_specific_geral
});

const area7_geral = document.getElementById('area7_geral').getContext('2d');
new Chart(area7_geral, {
    type: 'line',
    data: {
        labels: ['7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h'],
        datasets: [{
            data: [10, 14, 15, 16, 10, 5, 10, 16, 20, 30, 39],
            borderColor: '#006DAC',
            backgroundColor: gradient, // aplicando o gradiente como fundo do gráfico
            fill: true,
            tension: 0.4, // deixa o gráfico mais suave
            pointRadius: 0 // remove os pontos do gráfico
        }]
    },
    options: options_specific_geral
});


const limitPerArea_graph1 = document.getElementById('limitPerArea_graph').getContext('2d');
new Chart(limitPerArea_graph1, {
    type: 'bar',
    data: {
        labels: ['7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h'],
        datasets: [
            {
                label: 'Nível de gás (ppm)',
                data: [10, 14, 15, 16, 10, 5, 10, 16, 20, 30, 45],
                borderColor: '#006DAC',
                backgroundColor: '#006DAC',
                fill: true,
                borderRadius: 5
            }
        ]
    },
    options: options_limitPerArea_graph
});


const bubble_chart1 = document.getElementById('bubble_chart');
new Chart(bubble_chart1, {
    type: 'bubble',
    data: {
        datasets: [{
            label: 'Sensores espalhados pela área',
            data: [
                { x: 20, y: 20, r: 15 },
                { x: 50, y: 20, r: 20 }, // ultima linha
                { x: 80, y: 20, r: 30 },

                { x: 20, y: 40, r: 18 },
                { x: 50, y: 40, r: 24 },
                { x: 80, y: 40, r: 25 },

                { x: 20, y: 60, r: 20 },
                { x: 50, y: 60, r: 30 },
                { x: 80, y: 60, r: 45 },

                { x: 20, y: 80, r: 5 },
                { x: 50, y: 80, r: 19 }, // primeira linha
                { x: 80, y: 80, r: 20 },

            ],
            clip: false,
            borderColor: '#006DAC',
            backgroundColor: '#006DAC',
        }]
    },


    options: options_bubble_graph
})

const limitPerArea_graph2 = document.getElementById('limitPerArea_graph2').getContext('2d');
new Chart(limitPerArea_graph2, {
    type: 'bar',
    data: {
        labels: ['7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h'],
        datasets: [
            {
                label: 'Nível de gás (ppm)',
                data: [10, 14, 15, 16, 10, 5, 10, 16, 20, 30, 45],
                borderColor: '#006DAC',
                backgroundColor: '#006DAC',
                fill: true,
                borderRadius: 5
            }
        ]
    },
    options: options_limitPerArea_graph
});


const bubble_chart2 = document.getElementById('bubble_chart2');
new Chart(bubble_chart2, {
    type: 'bubble',
    data: {
        datasets: [{
            label: 'Sensores espalhados pela área',
            data: [
                { x: 20, y: 20, r: 15 },
                { x: 50, y: 20, r: 20 }, // ultima linha
                { x: 80, y: 20, r: 30 },

                { x: 20, y: 40, r: 18 },
                { x: 50, y: 40, r: 24 },
                { x: 80, y: 40, r: 25 },

                { x: 20, y: 60, r: 20 },
                { x: 50, y: 60, r: 30 },
                { x: 80, y: 60, r: 45 },

                { x: 20, y: 80, r: 5 },
                { x: 50, y: 80, r: 19 }, // primeira linha
                { x: 80, y: 80, r: 20 },

            ],
            clip: false,
            borderColor: '#006DAC',
            backgroundColor: '#006DAC',
        }]
    },


    options: options_bubble_graph
})

const limitPerArea_graph3 = document.getElementById('limitPerArea_graph3').getContext('2d');
new Chart(limitPerArea_graph3, {
    type: 'bar',
    data: {
        labels: ['7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h'],
        datasets: [
            {
                label: 'Nível de gás (ppm)',
                data: [10, 14, 15, 16, 10, 5, 10, 16, 20, 30, 45],
                borderColor: '#006DAC',
                backgroundColor: '#006DAC',
                fill: true,
                borderRadius: 5
            }
        ]
    },
    options: options_limitPerArea_graph
});

const bubble_chart3 = document.getElementById('bubble_chart3');
new Chart(bubble_chart3, {
    type: 'bubble',
    data: {
        datasets: [{
            label: 'Sensores espalhados pela área',
            data: [
                { x: 20, y: 20, r: 15 },
                { x: 50, y: 20, r: 20 }, // ultima linha
                { x: 80, y: 20, r: 30 },

                { x: 20, y: 40, r: 18 },
                { x: 50, y: 40, r: 24 },
                { x: 80, y: 40, r: 25 },

                { x: 20, y: 60, r: 20 },
                { x: 50, y: 60, r: 30 },
                { x: 80, y: 60, r: 45 },

                { x: 20, y: 80, r: 5 },
                { x: 50, y: 80, r: 19 }, // primeira linha
                { x: 80, y: 80, r: 20 },

            ],
            clip: false,
            borderColor: '#006DAC',
            backgroundColor: '#006DAC',
        }]
    },


    options: options_bubble_graph
})

const limitPerArea_graph4 = document.getElementById('limitPerArea_graph4').getContext('2d');
new Chart(limitPerArea_graph4, {
    type: 'bar',
    data: {
        labels: ['7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h'],
        datasets: [
            {
                label: 'Nível de gás (ppm)',
                data: [10, 14, 15, 16, 10, 5, 10, 16, 20, 30, 45],
                borderColor: '#006DAC',
                backgroundColor: '#006DAC',
                fill: true,
                borderRadius: 5
            }
        ]
    },
    options: options_limitPerArea_graph
});

const bubble_chart4 = document.getElementById('bubble_chart4');
new Chart(bubble_chart4, {
    type: 'bubble',
    data: {
        datasets: [{
            label: 'Sensores espalhados pela área',
            data: [
                { x: 20, y: 20, r: 15 },
                { x: 50, y: 20, r: 20 }, // ultima linha
                { x: 80, y: 20, r: 30 },

                { x: 20, y: 40, r: 18 },
                { x: 50, y: 40, r: 24 },
                { x: 80, y: 40, r: 25 },

                { x: 20, y: 60, r: 20 },
                { x: 50, y: 60, r: 30 },
                { x: 80, y: 60, r: 45 },

                { x: 20, y: 80, r: 5 },
                { x: 50, y: 80, r: 19 }, // primeira linha
                { x: 80, y: 80, r: 20 },

            ],
            clip: false,
            borderColor: '#006DAC',
            backgroundColor: '#006DAC',
        }]
    },
    options: options_bubble_graph
})

const limitPerArea_graph5 = document.getElementById('limitPerArea_graph5').getContext('2d');
new Chart(limitPerArea_graph5, {
    type: 'bar',
    data: {
        labels: ['7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h'],
        datasets: [
            {
                label: 'Nível de gás (ppm)',
                data: [10, 14, 15, 16, 10, 5, 10, 16, 20, 30, 45],
                borderColor: '#006DAC',
                backgroundColor: '#006DAC',
                fill: true,
                borderRadius: 5
            }
        ]
    },
    options: options_limitPerArea_graph
});

const bubble_chart5 = document.getElementById('bubble_chart5');
new Chart(bubble_chart5, {
    type: 'bubble',
    data: {
        datasets: [{
            label: 'Sensores espalhados pela área',
            data: [
                { x: 20, y: 20, r: 15 },
                { x: 50, y: 20, r: 20 }, // ultima linha
                { x: 80, y: 20, r: 30 },

                { x: 20, y: 40, r: 18 },
                { x: 50, y: 40, r: 24 },
                { x: 80, y: 40, r: 25 },

                { x: 20, y: 60, r: 20 },
                { x: 50, y: 60, r: 30 },
                { x: 80, y: 60, r: 45 },

                { x: 20, y: 80, r: 5 },
                { x: 50, y: 80, r: 19 }, // primeira linha
                { x: 80, y: 80, r: 20 },

            ],
            clip: false,
            borderColor: '#006DAC',
            backgroundColor: '#006DAC',
        }]
    },
    options: options_bubble_graph
})

const limitPerArea_graph6 = document.getElementById('limitPerArea_graph6').getContext('2d');
new Chart(limitPerArea_graph6, {
    type: 'bar',
    data: {
        labels: ['7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h'],
        datasets: [
            {
                label: 'Nível de gás (ppm)',
                data: [10, 14, 15, 16, 10, 5, 10, 16, 20, 30, 45],
                borderColor: '#006DAC',
                backgroundColor: '#006DAC',
                fill: true,
                borderRadius: 5
            }
        ]
    },
    options: options_limitPerArea_graph
});

const bubble_char6 = document.getElementById('bubble_chart6');
new Chart(bubble_char6, {
    type: 'bubble',
    data: {
        datasets: [{
            label: 'Sensores espalhados pela área',
            data: [
                { x: 20, y: 20, r: 15 },
                { x: 50, y: 20, r: 20 }, // ultima linha
                { x: 80, y: 20, r: 30 },

                { x: 20, y: 40, r: 18 },
                { x: 50, y: 40, r: 24 },
                { x: 80, y: 40, r: 25 },

                { x: 20, y: 60, r: 20 },
                { x: 50, y: 60, r: 30 },
                { x: 80, y: 60, r: 45 },

                { x: 20, y: 80, r: 5 },
                { x: 50, y: 80, r: 19 }, // primeira linha
                { x: 80, y: 80, r: 20 },

            ],
            clip: false,
            borderColor: '#006DAC',
            backgroundColor: '#006DAC',
        }]
    },
    options: options_bubble_graph
})

const limitPerArea_graph7 = document.getElementById('limitPerArea_graph7').getContext('2d');
new Chart(limitPerArea_graph7, {
    type: 'bar',
    data: {
        labels: ['7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h'],
        datasets: [
            {
                label: 'Nível de gás (ppm)',
                data: [10, 14, 15, 16, 10, 5, 10, 16, 20, 30, 45],
                borderColor: '#006DAC',
                backgroundColor: '#006DAC',
                fill: true,
                borderRadius: 5
            }
        ]
    },
    options: options_limitPerArea_graph
});

const bubble_chart7 = document.getElementById('bubble_chart7');
new Chart(bubble_chart7, {
    type: 'bubble',
    data: {
        datasets: [{
            label: 'Sensores espalhados pela área',
            data: [
                { x: 20, y: 20, r: 15 },
                { x: 50, y: 20, r: 20 }, // ultima linha
                { x: 80, y: 20, r: 30 },

                { x: 20, y: 40, r: 18 },
                { x: 50, y: 40, r: 24 },
                { x: 80, y: 40, r: 25 },

                { x: 20, y: 60, r: 20 },
                { x: 50, y: 60, r: 30 },
                { x: 80, y: 60, r: 45 },

                { x: 20, y: 80, r: 5 },
                { x: 50, y: 80, r: 19 }, // primeira linha
                { x: 80, y: 80, r: 20 },

            ],
            clip: false,
            borderColor: '#006DAC',
            backgroundColor: '#006DAC',
        }]
    },
    options: options_bubble_graph
});

const alert_graph1 = document.getElementById('alert_graph1').getContext('2d');
new Chart(alert_graph1, {
    type: 'line',
    data: {
        labels: ['7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h'],
        datasets: [
            {
                label: 'Alertas',
                data: [1, 2, 3, 2, 0, 0, 4, 1, 2, 5, 7],
                backgroundColor: '#006DAC',
                borderColor: '#006DAC',
                borderRadius: 5,
                tension: 0.3, // deixa o gráfico mais suave
            }
        ]
    },
    options: options_alert_graph
});

const sensors_graph1 = document.getElementById('sensors_graph1').getContext('2d');
new Chart(sensors_graph1, {
    type: 'bar',
    data: {
        labels: ['Sensor 1', 'Sensor 2', 'Sensor 3', 'Sensor 4', 'Sensor 5', 'Sensor 6', 'Sensor 7', 'Sensor 8', 'Sensor 9', 'Sensor 10', 'Sensor 11', 'Sensor 12'],
        datasets: [
            {
                label: 'Sensores',
                data: [5, 19, 20, 20, 30, 45, 18, 24, 25, 15, 20, 30],
                backgroundColor: '#006DAC',
                borderColor: '#006DAC',
                borderRadius: 5,
                tension: 0.3, // deixa o gráfico mais suave
            }
        ]
    },
    options: options_sensor_graph
});

const alert_graph2 = document.getElementById('alert_graph2').getContext('2d');
new Chart(alert_graph2, {
    type: 'line',
    data: {
        labels: ['7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h'],
        datasets: [
            {
                label: 'Alertas',
                data: [1, 2, 3, 2, 0, 0, 4, 1, 2, 5, 7],
                backgroundColor: '#006DAC',
                borderColor: '#006DAC',
                borderRadius: 5,
                tension: 0.3, // deixa o gráfico mais suave
            }
        ]
    },
    options: options_alert_graph
});

const sensors_graph2 = document.getElementById('sensors_graph2').getContext('2d');
new Chart(sensors_graph2, {
    type: 'bar',
    data: {
        labels: ['Sensor 1', 'Sensor 2', 'Sensor 3', 'Sensor 4', 'Sensor 5', 'Sensor 6', 'Sensor 7', 'Sensor 8', 'Sensor 9', 'Sensor 10', 'Sensor 11', 'Sensor 12'],
        datasets: [
            {
                label: 'Sensores',
                data: [5, 19, 20, 20, 30, 45, 18, 24, 25, 15, 20, 30],
                backgroundColor: '#006DAC',
                borderColor: '#006DAC',
                borderRadius: 5,
                tension: 0.3, // deixa o gráfico mais suave
            }
        ]
    },
    options: options_sensor_graph
});

const alert_graph3 = document.getElementById('alert_graph3').getContext('2d');
new Chart(alert_graph3, {
    type: 'line',
    data: {
        labels: ['7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h'],
        datasets: [
            {
                label: 'Alertas',
                data: [1, 2, 3, 2, 0, 0, 4, 1, 2, 5, 7],
                backgroundColor: '#006DAC',
                borderColor: '#006DAC',
                borderRadius: 5,
                tension: 0.3, // deixa o gráfico mais suave
            }
        ]
    },
    options: options_alert_graph
});

const sensors_graph3 = document.getElementById('sensors_graph3').getContext('2d');
new Chart(sensors_graph3, {
    type: 'bar',
    data: {
        labels: ['Sensor 1', 'Sensor 2', 'Sensor 3', 'Sensor 4', 'Sensor 5', 'Sensor 6', 'Sensor 7', 'Sensor 8', 'Sensor 9', 'Sensor 10', 'Sensor 11', 'Sensor 12'],
        datasets: [
            {
                label: 'Sensores',
                data: [5, 19, 20, 20, 30, 45, 18, 24, 25, 15, 20, 30],
                backgroundColor: '#006DAC',
                borderColor: '#006DAC',
                borderRadius: 5,
                tension: 0.3, // deixa o gráfico mais suave
            }
        ]
    },
    options: options_sensor_graph
});

const alert_graph4 = document.getElementById('alert_graph4').getContext('2d');
new Chart(alert_graph4, {
    type: 'line',
    data: {
        labels: ['7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h'],
        datasets: [
            {
                label: 'Alertas',
                data: [1, 2, 3, 2, 0, 0, 4, 1, 2, 5, 7],
                backgroundColor: '#006DAC',
                borderColor: '#006DAC',
                borderRadius: 5,
                tension: 0.3, // deixa o gráfico mais suave
            }
        ]
    },
    options: options_alert_graph
});

const sensors_graph4 = document.getElementById('sensors_graph4').getContext('2d');
new Chart(sensors_graph4, {
    type: 'bar',
    data: {
        labels: ['Sensor 1', 'Sensor 2', 'Sensor 3', 'Sensor 4', 'Sensor 5', 'Sensor 6', 'Sensor 7', 'Sensor 8', 'Sensor 9', 'Sensor 10', 'Sensor 11', 'Sensor 12'],
        datasets: [
            {
                label: 'Sensores',
                data: [5, 19, 20, 20, 30, 45, 18, 24, 25, 15, 20, 30],
                backgroundColor: '#006DAC',
                borderColor: '#006DAC',
                borderRadius: 5,
                tension: 0.3, // deixa o gráfico mais suave
            }
        ]
    },
    options: options_sensor_graph
});

const alert_graph5 = document.getElementById('alert_graph5').getContext('2d');
new Chart(alert_graph5, {
    type: 'line',
    data: {
        labels: ['7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h'],
        datasets: [
            {
                label: 'Alertas',
                data: [1, 2, 3, 2, 0, 0, 4, 1, 2, 5, 7],
                backgroundColor: '#006DAC',
                borderColor: '#006DAC',
                borderRadius: 5,
                tension: 0.3, // deixa o gráfico mais suave
            }
        ]
    },
    options: options_alert_graph
});

const sensors_graph5 = document.getElementById('sensors_graph5').getContext('2d');
new Chart(sensors_graph5, {
    type: 'bar',
    data: {
        labels: ['Sensor 1', 'Sensor 2', 'Sensor 3', 'Sensor 4', 'Sensor 5', 'Sensor 6', 'Sensor 7', 'Sensor 8', 'Sensor 9', 'Sensor 10', 'Sensor 11', 'Sensor 12'],
        datasets: [
            {
                label: 'Sensores',
                data: [5, 19, 20, 20, 30, 45, 18, 24, 25, 15, 20, 30],
                backgroundColor: '#006DAC',
                borderColor: '#006DAC',
                borderRadius: 5,
                tension: 0.3, // deixa o gráfico mais suave
            }
        ]
    },
    options: options_sensor_graph
});

const alert_graph6 = document.getElementById('alert_graph6').getContext('2d');
new Chart(alert_graph6, {
    type: 'line',
    data: {
        labels: ['7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h'],
        datasets: [
            {
                label: 'Alertas',
                data: [1, 2, 3, 2, 0, 0, 4, 1, 2, 5, 7],
                backgroundColor: '#006DAC',
                borderColor: '#006DAC',
                borderRadius: 5,
                tension: 0.3, // deixa o gráfico mais suave
            }
        ]
    },
    options: options_alert_graph
});

const sensors_graph6 = document.getElementById('sensors_graph6').getContext('2d');
new Chart(sensors_graph6, {
    type: 'bar',
    data: {
        labels: ['Sensor 1', 'Sensor 2', 'Sensor 3', 'Sensor 4', 'Sensor 5', 'Sensor 6', 'Sensor 7', 'Sensor 8', 'Sensor 9', 'Sensor 10', 'Sensor 11', 'Sensor 12'],
        datasets: [
            {
                label: 'Sensores',
                data: [5, 19, 20, 20, 30, 45, 18, 24, 25, 15, 20, 30],
                backgroundColor: '#006DAC',
                borderColor: '#006DAC',
                borderRadius: 5,
                tension: 0.3, // deixa o gráfico mais suave
            }
        ]
    },
    options: options_sensor_graph
});

const alert_graph7 = document.getElementById('alert_graph7').getContext('2d');
new Chart(alert_graph7, {
    type: 'line',
    data: {
        labels: ['7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h'],
        datasets: [
            {
                label: 'Alertas',
                data: [1, 2, 3, 2, 0, 0, 4, 1, 2, 5, 7],
                backgroundColor: '#006DAC',
                borderColor: '#006DAC',
                borderRadius: 5,
                tension: 0.3, // deixa o gráfico mais suave
            }
        ]
    },
    options: options_alert_graph
});

const sensors_graph7 = document.getElementById('sensors_graph7').getContext('2d');
new Chart(sensors_graph7, {
    type: 'bar',
    data: {
        labels: ['Sensor 1', 'Sensor 2', 'Sensor 3', 'Sensor 4', 'Sensor 5', 'Sensor 6', 'Sensor 7', 'Sensor 8', 'Sensor 9', 'Sensor 10', 'Sensor 11', 'Sensor 12'],
        datasets: [
            {
                label: 'Sensores',
                data: [5, 19, 20, 20, 30, 45, 18, 24, 25, 15, 20, 30],
                backgroundColor: '#006DAC',
                borderColor: '#006DAC',
                borderRadius: 5,
                tension: 0.3, // deixa o gráfico mais suave
            }
        ]
    },
    options: options_sensor_graph
});