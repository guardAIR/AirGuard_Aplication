function getAreasById(id) {
    fetch('/areas/getAllById/' + id, { method: 'GET' })
        .then((resultado) => {
            resultado.json()
                .then((data) => {
                    for (let i = 0; i < data.length; i++) {
                        cards_container.innerHTML += `
                            <div class="card">
                                <div class="card_row" onclick="expandir_area(this)">
                                    <img src="/assets/dashboard/img_area.png" alt="Imagem ${data[i].nome}">
                                    <p class="area_name_specific">${data[i].nome}</p>
                                    <div class="attention_level">
                                        <span class="marked"></span>
                                        <span class="marked"></span>
                                        <span class="marked"></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                    <canvas class="area_graph" id="area1_geral" width="360" height="85"></canvas>
                                    <p>30ppm</p>
                                    <p class="comparison trending_down">
                                        <span class="material-symbols-outlined alert_icon">
                                            trending_down
                                        </span>
                                        23.08%
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
                                            <canvas class="bubble_chart" id="bubble_chart" width="700" height="400"></canvas>
                                            <p class="bubble_chart_legend">Momento atual</p>
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
                    }
                })
        })

}

