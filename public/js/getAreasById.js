let charts = {};
let datasets = {};
let ids = [];
let graficoMedicao = null;
var areaId = [];
function getAreasById(id) {
    fetch('/areas/getAllById/' + id, { method: 'GET' })
        .then((resultado) => {
            resultado.json()
                .then((data) => {
                    const areas = data;

                    cards_container.innerHTML = "";
                    for (let i = 0; i < areas.length; i++) {
                        var id = areas[i].id
                        areaId.push(id);
                        fetch('/areas/getMediaAreaById/' + id, { method: 'GET' })
                            .then((resultado) => {
                                resultado.json()
                                    .then((data) => {

                                        const area = data;
                                        console.log("Estou no then do getMediaAreaById")

                                        var valorMedio = Number(area[0].ultimaMedia)
                                        var mediaSpan = (valorMedio / 39) * 10
                                        var porcentagem = (valorMedio / 39) * 100
                                        let canvasId = `area${areas[i].id}_geral`;
                                        var attention_level = mediaDoSpan(mediaSpan);


                                        cards_container.innerHTML += `
                                            <div class="card">
                                                <div class="card_row" fkarea="${areas[i].id}" onclick="expandir_area(this)">
                                                    <img src="/assets/dashboard/img_area.png" alt="Imagem ${areas[i].nome}">
                                                    <p class="area_name_specific">${areas[i].nome}</p>
                                                    <div class="attention_level" id="span${areas[i].id}">
                                                        ${attention_level}
                                                    </div>

                                                    <canvas class="area_graph" id="${canvasId}" width="360" height="85"></canvas>

                                                    <p id="ppm${areas[i].id}">${valorMedio.toFixed(2)}ppm</p>
                                                    <p id="porcentagem${areas[i].id}" class="comparison">${porcentagem.toFixed(2)}%</p>
                                                    <button class="button_expand">
                                                        <span class="material-symbols-outlined expandir_area_icon">
                                                            keyboard_arrow_down
                                                        </span>
                                                    </button>
                                                </div>
                                                <div class="card_row row_graphs expand">
                                                    <div class="graph_buttons">
                                                        <button onclick="showAlerts(this)" class="button" fkarea="${areas[i].id}">Alertas</button>
                                                        <button onclick="showGraphs(this)" class="clicked button" fkarea="${areas[i].id}">Geral</button>
                                                        <button onclick="showSensors(this)" class="button" fkarea="${areas[i].id}">Sensores</button>
                                                    </div>
                                                    <div class="graph selected">
                                                        <div class="first_graph">
                                                            <h3>Nível de gás (por hora)</h3>
                                                            <canvas class="limitPerArea_graph" width="700" height="400"></canvas>
                                                        </div>
                                                        <div class="second_graph">
                                                            <h3>Sensores espalhados pela área</h3>
                                                            <div class="heatmap"></div>
                                                        </div>
                                                    </div>
                                                    <div class="alerts_wrapper">
                                                        <div class="alerts_specific">
                                                            <h3>Alertas (últimas 24h)</h3>
                                                            <div class="alerts_container" id="alerts_bruno${areas[i].id}">
                                                                

                                                            </div>
                                                        </div>
                                                        <div class="alerts_graph">
                                                            <h3>Quantidades de alertas por horário (últimos 7 dias)</h3>
                                                            <canvas id="alert_graph1" class="alert_graph" width="700" height="400"></canvas>
                                                        </div>
                                                    </div>
                                                        <div class="sensors_wrapper">
                                                            <div class="sensors_graph_container">
                                                                <h3>Medição dos sensores (atual)</h3>
                                                                <canvas id="sensors_graph1" class="sensors_graph" width="700" height="400"></canvas>
                                                            </div>
                                                            <div class="sensors_kpis">
                                                                <h3>Estado dos sensores</h3>
                                                                <div class="sensors_kpis_container" id="kpis_leitura_sensor${i}">
                                                                </div>
                                                                <div class="ranking_legend">
                                                                <strong>Legenda:</strong><br>
                                                                <div class="legend-item green">
                                                                    <span class="legend-circle"></span>
                                                                    Abaixo de 20 ppm – Seguro (verde)
                                                                </div>
                                                                <div class="legend-item yellow">
                                                                    <span class="legend-circle"></span>
                                                                    Abaixo de 30 ppm – Atenção (amarelo)
                                                                </div>
                                                                <div class="legend-item red">
                                                                    <span class="legend-circle"></span>
                                                                    Até 39 ppm – Alerta (vermelho)
                                                                </div>
                                                                <div class="legend-item dark-red">
                                                                    <span class="legend-circle"></span>
                                                                    Acima de 39 ppm – Perigoso (vermelho escuro)
                                                                </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                </div>
                                            </div>
                                        `;
                                        setTimeout(() => {
                                            iniciarGraficosTempoReal(canvasId, areas[i].id);
                                        }, 200)
                                    })
                            })
                    }
                    plotGraph()
                })
        })
}

function iniciarGraficosTempoReal(canvasId, id) {
    const plotarGraph = [0];
    const area_geral = document.getElementById(`${canvasId}`).getContext('2d');
    const gradient = area_geral.createLinearGradient(0, 0, 0, 90);
    gradient.addColorStop(0, 'rgb(0, 109, 172, .2)');
    gradient.addColorStop(1, 'rgba(0, 123, 255, 0)');

    const chart = new Chart(area_geral, {
        type: 'line',
        data: {
            labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            datasets: [{
                data: plotarGraph,
                borderColor: '#006DAC',
                backgroundColor: gradient,
                fill: true,
                tension: 0.4,
                pointRadius: 0
            }]
        },
        options: options_specific_geral
    });

    charts[id] = chart;
    datasets[id] = plotarGraph;
    ids.push(id);
    console.log(ids)
}

var obg = 0;
function plotGraph() {
    setInterval(() => {
        for (let i = 0; i < ids.length; i++) {
            const id = ids[i];
            const p_span = document.getElementById(`span${id}`);
            const p_ppm = document.getElementById(`ppm${id}`);
            const p_porcentagem = document.getElementById(`porcentagem${id}`);

            fetch('/areas/getMediaAreaById/' + id, { method: 'GET' })
                .then(res => res.json())
                .then(area => {
                    const valor = Number(area[0].ultimaMedia);
                    const porcentagem = (valor / 39) * 100;
                    const dataset = datasets[id];

                    if (dataset.length >= 11) {
                        dataset.shift();
                    }
                    if (valor == dataset[9]) {
                        console.log("Valores iguais")
                    } else {
                        console.log(dataset[9], valor)
                        dataset.push(valor);

                        charts[id].data.datasets[0].data = dataset;
                        charts[id].update();
                        console.log("Gráfico " + id + " plotado");

                        p_span.innerHTML = `${mediaDoSpan((valor / 39) * 10)}`;
                        p_ppm.innerHTML = `${valor.toFixed(2)}ppm`;
                        p_porcentagem.innerHTML = `${porcentagem.toFixed(2)}%`;
                    }
                });
        }
    }, 1000);
}

function mediaDoSpan(mediaSpan) {
    var attention_level = "";
    if (mediaSpan < 1) attention_level = `<span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>`
    else if (mediaSpan < 2) attention_level = `<span class="marked"></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>`
    else if (mediaSpan < 3) attention_level = `<span class="marked"></span><span class="marked"></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>`
    else if (mediaSpan < 4) attention_level = `<span class="marked"></span><span class="marked"></span><span class="marked"></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>`
    else if (mediaSpan < 5) attention_level = `<span class="marked"></span><span class="marked"></span><span class="marked"></span><span class="marked"></span><span class="marked"></span><span></span><span></span><span></span><span></span><span></span>`
    else if (mediaSpan < 6) attention_level = `<span class="marked"></span><span class="marked"></span><span class="marked"></span><span class="marked"></span><span class="marked"></span><span class="marked"></span><span></span><span></span><span></span><span></span>`
    else if (mediaSpan < 7) attention_level = `<span class="marked"></span><span class="marked"></span><span class="marked"></span><span class="marked"></span><span class="marked"></span><span class="marked"></span><span></span><span></span><span></span><span></span>`
    else if (mediaSpan < 8) attention_level = `<span class="marked"></span><span class="marked"></span><span class="marked"></span><span class="marked"></span><span class="marked"></span><span class="marked"></span><span class="marked"></span><span></span><span></span><span></span>`
    else if (mediaSpan < 9) attention_level = `<span class="marked"></span><span class="marked"></span><span class="marked"></span><span class="marked"></span><span class="marked"></span><span class="marked"></span><span class="marked"></span><span class="marked"></span><span></span><span></span>`
    else if (mediaSpan < 10) attention_level = `<span class="marked"></span><span class="marked"></span><span class="marked"></span><span class="marked"></span><span class="marked"></span><span class="marked"></span><span class="marked"></span><span class="marked"></span><span class="marked"></span><span></span>`
    else attention_level = `<span class="red"></span><span class="red"></span><span class="red"></span><span class="red"></span><span class="red"></span><span class="red"></span><span class="red"></span><span class="red"></span><span class="red"></span><span class="red"></span>`
    return attention_level;
}




