function renderPrimeiraVezHeatmap(local) {
    if (local) {
        const container = local.querySelector('.heatmap');

        const instanciaHeatmap = h337.create({
            container: container
        });

        return instanciaHeatmap;
    }
}

function renderHeatmap(fkarea, instanciaHeatmap) {
    if (instanciaHeatmap) {
        let data = [];

        fetch('/areas/getSensorsAndRead/' + fkarea, { method: 'GET' })
            .then((result) => result.json())
            .then((json) => {
                for (let i = 0; i < json.length; i++) {
                    data.push({
                        x: json[i].eixo_x,
                        y: json[i].eixo_y,
                        value: json[i].concentracao_gas,
                        radius: json[i].concentracao_gas,
                        dataHora: json[i].data_hora
                    });
                }

                instanciaHeatmap.setData({ data: data });
            })
            .catch((error) => {
                console.error("Erro ao obter os dados dos sensores:", error);
            });
    }
}

function renderPrimeiraVezNivelGasHora(local) {
    const graph_local = local.getElementsByClassName('limitPerArea_graph')[0];

    const chart_nivel = new Chart(graph_local, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Nível de gás (ppm)',
                    data: [],
                    borderColor: '#006DAC',
                    backgroundColor: '#006DAC',
                    fill: true,
                    borderRadius: 5
                }
            ]
        },
    });

    return chart_nivel;
}
function renderNivelGasHora(fkarea, graphGasHora) {

    fetch('/areas/buscarMediaCOPorHoraPorID/' + fkarea, {
        method: 'GET'
    }).then(res => {
        res.json().then(data => {
            let labels = [];
            let dados = [];

            for (let i = 0; i < data.length; i++) {
                labels.push(data[i].hora + 'h');
                dados.push(data[i].media_gas);
            }

            graphGasHora.data.datasets[0].data = dados;
            graphGasHora.data.labels = labels;

            graphGasHora.update();
        })
    })

}


function expandir_area(element) {
    const expandElement = element.parentElement.getElementsByClassName('expand')[0];
    const expandAreaIcon = element.parentElement.getElementsByClassName('expandir_area_icon')[0];

    if (expandElement.classList.contains('expanded')) {
        expandElement.classList.remove('expanded');
        expandAreaIcon.innerHTML = "keyboard_arrow_down";
    } else {
        expandElement.classList.add('expanded');
        expandAreaIcon.innerHTML = "keyboard_arrow_up";
    }

    const fkarea = element.getAttribute('fkarea');
    const graphGasHora = renderPrimeiraVezNivelGasHora(expandElement);
    const heatmap = renderPrimeiraVezHeatmap(expandElement);
    // setInterval(() => {
    //     renderHeatmap(fkarea, heatmap);
    //     renderNivelGasHora(fkarea, graphGasHora)
    // }, 100);
    buscarDados(fkarea, heatmap, graphGasHora);
};

function buscarDados(fkarea, heatmap, graphGasHora) {
    renderHeatmap(fkarea, heatmap);
    renderNivelGasHora(fkarea, graphGasHora)
    setTimeout(() => buscarDados(fkarea, heatmap, graphGasHora), 1000);
}

function showAlerts(element) {
    const sensors_wrapper = element.parentElement.parentElement.getElementsByClassName('sensors_wrapper')[0];
    const alerts_wrapper = element.parentElement.parentElement.getElementsByClassName('alerts_wrapper')[0];
    const graph = element.parentElement.parentElement.getElementsByClassName('graph')[0];


    alerts_wrapper.classList.add('selected');
    graph.classList.remove('selected');
    sensors_wrapper.classList.remove('selected');

    const buttons = element.parentElement.getElementsByClassName("button")
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('clicked')
    }
    element.classList.add('clicked');
    const fkarea = element.getAttribute('fkarea');

    const result = exibirQuantidadeDeAlertasPorHorario(alerts_wrapper);

    setInterval(function () {
        exibirAlertasPorArea(fkarea);
        chamaExibirQuantidadeDeAlertasPorHorario(fkarea, result);
    }, 1000)
};

function showGraphs(element) {
    const sensors_wrapper = element.parentElement.parentElement.getElementsByClassName('sensors_wrapper')[0];
    const alerts_wrapper = element.parentElement.parentElement.getElementsByClassName('alerts_wrapper')[0];
    const graph = element.parentElement.parentElement.getElementsByClassName('graph')[0];

    graph.classList.add('selected');
    alerts_wrapper.classList.remove('selected');
    sensors_wrapper.classList.remove('selected');

    const buttons = element.parentElement.getElementsByClassName("button")
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('clicked')
    }
    element.classList.add('clicked');

    const fkarea = element.getAttribute('fkarea');
    renderHeatmap(fkarea);
};

function renderPrimeiraVezMedicaoAtual(local) {
    const graph_local = local.getElementsByClassName('sensors_graph')[0];

    const chart_nivel = new Chart(graph_local, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'PPM dos Sensores',
                data: [],
                backgroundColor: '#006DAC',
                borderColor: '#006DAC',
                borderRadius: 5,
                tension: 0.3,
            }]
        },
        options: options_sensor_graph
    });

    return chart_nivel;
}

var completo = false;
function MedicaoSensor(fkarea, local, divpai) {
    fetch(`/areas/ultimasLeituras/${fkarea}`)
        .then(res => res.json())
        .then(dados => {
            const labels = [];
            
            for (i = 0; i < dados.length; i++) {
                labels.push(`Sensor ${dados[i].sensor_id}`);



                var concentracao = dados[i].concentracao_gas;
                const divKpi = divpai.getElementsByClassName('sensors_kpis_container')[0];

                if (completo) {
                    divKpi.innerHTML = "";
                    completo = false;
                }

                if (Number(concentracao) < 20) {
                    divKpi.innerHTML +=
                        `
                            <div class="sensor_kpi seguro">
                                <p>Sensor ${dados[i].sensor_id}<br>${concentracao}ppm</p>
                            </div> 
                            `
                } else if (Number(concentracao) < 30) {
                    divKpi.innerHTML +=
                        `
                            <div class="sensor_kpi atencao">
                                <p>Sensor ${dados[i].sensor_id}<br>${concentracao}ppm</p>
                            </div>
                            `
                } else if (Number(concentracao) < 39) {
                    divKpi.innerHTML +=
                        `
                            <div class="sensor_kpi alerta">
                                <p>Sensor ${dados[i].sensor_id}<br>${concentracao}ppm</p>
                            </div>
                            `
                } else {
                    divKpi.innerHTML +=
                        `
                            <div class="sensor_kpi perigo">
                                <p>Sensor ${dados[i].sensor_id}<br>${concentracao}ppm</p>
                            </div>
                            `
                }
            }
            const valores = dados.map(sensor => sensor.concentracao_gas);
            local.data.labels = labels;
            local.data.datasets[0].data = valores;
            local.update();
            completo = true;
        })
}

function showSensors(element) {
    const sensors_wrapper = element.parentElement.parentElement.getElementsByClassName('sensors_wrapper')[0];
    const alerts_wrapper = element.parentElement.parentElement.getElementsByClassName('alerts_wrapper')[0];
    const graph = element.parentElement.parentElement.getElementsByClassName('graph')[0];

    sensors_wrapper.classList.add('selected');
    alerts_wrapper.classList.remove('selected');
    graph.classList.remove('selected');

    const fkarea = element.getAttribute('fkarea');

    const graphMedicao = renderPrimeiraVezMedicaoAtual(sensors_wrapper);
    const buttons = element.parentElement.getElementsByClassName("button")
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('clicked')
    }
    element.classList.add('clicked');


    setInterval(() => {
        MedicaoSensor(fkarea, graphMedicao, sensors_wrapper);
    }, 1000);
}


function exibirAlertasPorArea(idArea) {
    let fkEmpresa = sessionStorage.getItem("ID_EMPRESA");

    
    fetch(`/areas/exibirAlertasPorArea/${fkEmpresa}/${idArea}`)
    .then(function (resultado) {
        resultado.json()
        .then(function (data) {
                document.getElementById("alerts_bruno" + idArea).innerHTML = "";

                    for (let i = 0; i < data.length; i++) {
                        document.getElementById("alerts_bruno" + idArea).innerHTML +=
                            `<div class="alert_specific">
                                <p class="alert_text">
                                    <span class="material-symbols-outlined alert_icon_specific_high">
                                        error
                                    </span>
                                    Sensor ${data[i].idSensor}
                                </p>
                                <p>${data[i].concentracao}ppm</p>
                                <p class="alert_time">${data[i].data_hora}</p>
                            </div>`
                    }


                })
            console.log("Por enquanto deu certo!", resultado);
        })
        .catch(function (resposta) {
            console.log("Erro na exibição de alertas por área!", resposta);
        })
}

function exibirQuantidadeDeAlertasPorHorario(local) {
    const graph_local = local.getElementsByClassName('alert_graph')[0];

    const chart_nivel = new Chart(graph_local, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Quantidade de alertas por horário',
                    data: [],
                    backgroundColor: '#006DAC',
                    borderColor: '#006DAC',
                    borderRadius: 5,
                    tension: 0.3, // deixa o gráfico mais suave
                }
            ]
        },
    });

    return chart_nivel;
}

function chamaExibirQuantidadeDeAlertasPorHorario(idArea, graficoGasHora) {

    fetch(`/areas/exibirQuantidadeDeAlertasPorHorario/${idArea}`)
        .then(function (resultado) {
            resultado.json()
                .then(function (resposta) {
                    let labels = [];
                    let dados = [];

                    for (let i = 0; i < resposta.length; i++) {
                        labels.push(resposta[i].horario + 'h');
                        dados.push(resposta[i].quantidade);
                    }

                    graficoGasHora.data.datasets[0].data = dados;
                    graficoGasHora.data.labels = labels;

                    graficoGasHora.update();
                })
        })
}
