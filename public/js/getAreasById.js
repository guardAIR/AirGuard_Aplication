function getAreasById(id) {
    fetch('/areas/getAllById/' + id, { method: 'GET' })
        .then((resultado) => {
            resultado.json()
                .then((data) => {
                    const areas = data;

                    cards_container.innerHTML = "";
                    for (let i = 0; i < areas.length; i++) {
                        var id = areas[i].id
                        fetch('/areas/getMediaAreaById/' + id, { method: 'GET' })

                            .then((resultado) => {

                                resultado.json()

                                    .then((data) => {

                                        const area = data;

                                        console.log("Estou no then do getMediaAreaById")

                                        var valorMedio = Number(area[0].ultimaMedia)
                                        var mediaSpan = (valorMedio / 39) * 10
                                        var porcentagem = (valorMedio / 39) * 100
                                        var attention_level;
                                        let canvasId = `area${areas[i].id}_geral`;

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

                                        cards_container.innerHTML += `
                                            <div class="card">
                                                <div class="card_row" onclick="expandir_area(this)">
                                                    <img src="/assets/dashboard/img_area.png" alt="Imagem ${areas[i].nome}">
                                                    <p class="area_name_specific">${areas[i].nome}</p>
                                                    <div class="attention_level">
                                                        ${attention_level}
                                                    </div>
                                                    <canvas class="area_graph" id="${canvasId}" width="360" height="85"></canvas>
                                                    <p>${valorMedio.toFixed(2)}ppm</p>
                                                    <p class="comparison trending_down">
                                                        <span class="material-symbols-outlined alert_icon">
                                                            trending_down
                                                        </span>
                                                        ${porcentagem.toFixed(2)}%
                                                    </p>
                                                    <button class="button_expand">
                                                        <span class="material-symbols-outlined expandir_area_icon">
                                                            keyboard_arrow_down
                                                        </span>
                                                    </button>
                                                </div>
                                                <div class="card_row row_graphs expand">
                                                    <div class="graph_buttons">
                                                        <button onclick="showAlerts(this)" class="button">Alertas</button>
                                                        <button onclick="showGraphs(this)" class="clicked button">Geral</button>
                                                        <button onclick="showSensors(this)" class="button">Sensores</button>
                                                    </div>
                                                    <div class="graph selected">
                                                        <div class="first_graph">
                                                            <h3>Nível de gás (por hora)</h3>
                                                            <canvas id="limitPerArea_graph" width="700" height="400"></canvas>
                                                        </div>
                                                        <div class="second_graph">
                                                            <h3>Sensores espalhados pela área</h3>
                                                            <div class="heatmap"></div> 
                                                        </div>
                                                    </div>
                                                    <div class="alerts_wrapper">
                                                        <div class="alerts_specific">
                                                            <h3>Alertas (últimas 24h)</h3>
                                                            <div class="alerts_container">
                                                                <div class="alert_specific">
                                                                    <p class="alert_text">
                                                                        <span class="material-symbols-outlined alert_icon_specific_high">
                                                                            error
                                                                        </span>
                                                                        Sensor 6 - Linha de produção 1
                                                                    </p>
                                                                    <p>45ppm</p>
                                                                    <p class="alert_time">17:00h</p>
                                                                </div>
                                                                <div class="alert_specific">
                                                                    <p class="alert_text">
                                                                        <span class="material-symbols-outlined alert_icon_specific_medium">
                                                                            error
                                                                        </span>
                                                                        Sensor 6 - Linha de produção 1
                                                                    </p>
                                                                    <p>30ppm</p>
                                                                    <p class="alert_time">16:00h</p>
                                                                </div>
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
                                                            <div class="sensors_kpis_container">
                                                                <div class="sensor_kpi normal">
                                                                    <p>Sensor 1<br>5ppm</p>
                                                                </div>
                                                                <div class="sensor_kpi normal">
                                                                    <p>Sensor 2<br>19ppm</p>
                                                                </div>
                                                                <div class="sensor_kpi atencao">
                                                                    <p>Sensor 3<br>20ppm</p>
                                                                </div>
                                                                <div class="sensor_kpi atencao">
                                                                    <p>Sensor 4<br>20ppm</p>
                                                                </div>
                                                                <div class="sensor_kpi alerta">
                                                                    <p>Sensor 5<br>30ppm</p>
                                                                </div>
                                                                <div class="sensor_kpi alerta">
                                                                    <p>Sensor 6<br>45ppm</p>
                                                                </div>
                                                                <div class="sensor_kpi normal">
                                                                    <p>Sensor 7<br>18ppm</p>
                                                                </div>
                                                                <div class="sensor_kpi atencao">
                                                                    <p>Sensor 8<br>24ppm</p>
                                                                </div>
                                                                <div class="sensor_kpi atencao">
                                                                    <p>Sensor 9<br>25ppm</p>
                                                                </div>
                                                                <div class="sensor_kpi normal">
                                                                    <p>Sensor 10<br>15ppm</p>
                                                                </div>
                                                                <div class="sensor_kpi atencao">
                                                                    <p>Sensor 11<br>20ppm</p>
                                                                </div>
                                                                <div class="sensor_kpi alerta">
                                                                    <p>Sensor 12<br>30ppm</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        `;

                                        setTimeout(() => {
                                            const area_geral = document.getElementById(`${canvasId}`).getContext('2d');
                                            const gradient = area_geral.createLinearGradient(0, 0, 0, 90); // criando gradiente para o fundo do gráfico
                                            gradient.addColorStop(0, 'rgb(0, 109, 172, .2)'); // cor azul para o início do gráfico
                                            gradient.addColorStop(1, 'rgba(0, 123, 255, 0)'); // adicionando cor transparente para o fundo do gráfico

                                            new Chart(area_geral, {
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
                                        }, 200);

                                        var instanciaHeatmap = h337.create({
                                            container: document.querySelector('.heatmap')
                                        });

                                        var dadosPorLocal = {
                                            local1: [
                                                { x: 95, y: 175, value: 1000, radius: 50, dataHora: '2024-10-01T10:30' },
                                                { x: 150, y: 150, value: 1000, radius: 50, dataHora: '2024-10-01T10:30' },
                                                { x: 450, y: 300, value: 1500, radius: 100, dataHora: '2024-10-01T10:30' },
                                                { x: 200, y: 300, value: 1000, radius: 150, dataHora: '2024-10-01T10:30' },
                                                { x: 450, y: 100, value: 1000, radius: 50, dataHora: '2024-10-01T10:30' },
                                                { x: 400, y: 100, value: 1000, radius: 150, dataHora: '2024-10-01T10:30' }
                                            ]
                                        };

                                        (function renderHeatmap() {
                                        instanciaHeatmap.setData({ data: dadosPorLocal.local1 });
                                        })();
                                    })
                            })
                    }
                })
        })

}
