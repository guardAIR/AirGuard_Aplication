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