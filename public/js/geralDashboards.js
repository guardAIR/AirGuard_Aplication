var rankingChart = null;

function carregarRankingComChartJs() {

    let nomesDasAreas = [];
    let valoresPPM = [];

    if (rankingChart) {
        rankingChart.destroy();
        rankingChart = null;
    }

    fetch("/ranking/maiores-co/" + sessionStorage.getItem("ID_EMPRESA"))
        .then(function (resposta) {

            return resposta.json();
        })
        .then(function (dadosRanking) {
            console.log("Dados recebidos para o ranking:", dadosRanking);

            for (let i = 0; i < dadosRanking.length; i++) {
                nomesDasAreas.push(dadosRanking[i].nome_area);
                valoresPPM.push(dadosRanking[i].ppm);
            }
            console.log(nomesDasAreas);
            console.log(valoresPPM);

            const canvasElement = document.getElementById('rankingCOChart');
            if (!canvasElement) {
                console.error("Elemento canvas 'rankingCOChart' não encontrado.");
                return;
            }
            const ctx = canvasElement.getContext('2d');

            const maxPpmReferencia = 39;
            const backgroundColors = valoresPPM.map(ppm => {
                if (ppm <= 20) return '#2ECC71';
                if (ppm <= 30) return '#F1C40F';
                if (ppm <= maxPpmReferencia) return '#E74C3C';
                return '#5f0a00';
            });

            rankingChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: nomesDasAreas,
                    datasets: [{
                        label: 'Concentração de CO (ppm)',
                        data: valoresPPM,
                        backgroundColor: backgroundColors,
                    }]
                },
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            beginAtZero: true,
                            title: { display: true, text: 'Concentração de CO (ppm)', font: { family: 'DM Sans' } },
                            ticks: { font: { family: 'DM Sans' } }
                        },
                        y: {
                            ticks: { font: { family: 'DM Sans' } }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        title: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    let label = context.dataset.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    const ppm = context.parsed.x;
                                    const porcentagem = ((ppm / maxPpmReferencia) * 100).toFixed(1);
                                    label += `${ppm.toFixed(1)} ppm (${porcentagem}%)`;
                                    return label;
                                }
                            },
                            bodyFont: { family: 'DM Sans' },
                            titleFont: { family: 'DM Sans' }
                        },
                        annotation: {
                            annotations: {
                                line1: {
                                    type: 'line',
                                    xMin: maxPpmReferencia,
                                    xMax: maxPpmReferencia,
                                    borderColor: 'red',
                                    borderWidth: 2,
                                    borderDash: [6, 6],
                                    label: {
                                        content: `      Limite (${maxPpmReferencia} ppm)`,
                                        enabled: true,
                                        position: 'end',
                                        backgroundColor: 'rgba(0,0,0,0.0)',
                                        color: 'red',
                                        font: { family: 'DM Sans', style: 'italic' }
                                    }
                                }
                            }
                        }
                    }
                }
            });

        })
        .catch(function (erro) {
            console.error("Erro ao carregar ou criar gráfico de ranking:", erro);
            const canvasElement = document.getElementById('rankingCOChart');
            if (canvasElement) {
                const ctx = canvasElement.getContext('2d');
                ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
                ctx.font = "14px DM Sans";
                ctx.fillStyle = "#555";
                ctx.textAlign = "center";
                ctx.fillText("Erro ao carregar ranking", canvasElement.width / 2, canvasElement.height / 2);
            }
        });
}

var meuGraficoCOperArea = null;

function listarAreasLimite() {
    const statusNivel = ["seguro", "atencao", "alerta", "perigoso"];
    const quantidadeNivel = [];

    fetch("/ranking/areaslimite/" + sessionStorage.getItem("ID_EMPRESA"))
        .then(function (resposta) {
            if (!resposta.ok) {
                throw new Error(`Erro HTTP: ${resposta.status}`);
            }
            return resposta.json();
        })
        .then(function (dados) {
            console.log("Dados para gráfico de pizza/KPIs:", dados);


            let seguro = 0;
            let atencao = 0;
            let alerta = 0;
            let perigoso = 0;
            let total = 0;

            for (let i = 0; i < dados.length; i++) {
                total++
                if (dados[i].ppm <= 20) {
                    seguro++;
                } else if (dados[i].ppm <= 30) {
                    atencao++;
                } else if (dados[i].ppm <= 39) {
                    alerta++;
                } else {
                    perigoso++;
                }
            }

            console.log("areas totais: seguro " + seguro)
            console.log("areas totais: atencao " + atencao)
            console.log("areas totais: alerta " + alerta)
            console.log("areas totais: perigoso " + perigoso)
            console.log("areas totais: total " + total)

            quantidadeNivel.push(seguro)
            quantidadeNivel.push(atencao)
            quantidadeNivel.push(alerta)
            quantidadeNivel.push(perigoso)
            
            const kpiTotalAreasEl = document.getElementById('kpiTotalAreas');
            const kpiAreasPerigosasEl = document.getElementById('kpiAreasPerigosas');
            
            if (kpiTotalAreasEl) {
                kpiTotalAreasEl.textContent = `${total}`;
            }
            if (kpiAreasPerigosasEl) {
                kpiAreasPerigosasEl.textContent = `${perigoso}`;
                
                if (perigoso > 0) {
                    kpiAreasPerigosasEl.classList.add('texto-alerta-vermelho');
                } else {
                    kpiAreasPerigosasEl.classList.remove('texto-alerta-vermelho');
                }
            }
            
            
            var labels = statusNivel;
            var data = quantidadeNivel;
            if (!meuGraficoCOperArea) {
                criarGraficoCOperArea(labels, data);
                console.log("Criando o gráfico")
            } else {
                meuGraficoCOperArea.data.datasets[0].data = data;
                meuGraficoCOperArea.update();
            }

        })
        .catch(function (erro) {
            console.error("Erro ao buscar/processar dados para gráfico de pizza/KPIs:", erro);
            const kpiTotalAreasEl = document.getElementById('kpiTotalAreas');
            const kpiAreasPerigosasEl = document.getElementById('kpiAreasPerigosas');
            if (kpiTotalAreasEl) kpiTotalAreasEl.textContent = 'Erro';
            if (kpiAreasPerigosasEl) kpiAreasPerigosasEl.textContent = 'Erro';

            const canvasElement = document.getElementById('COperArea');
            if (canvasElement) {
                const ctx = canvasElement.getContext('2d');
                ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
                ctx.font = "14px DM Sans"; ctx.fillStyle = "#555";
                ctx.textAlign = "center";
                ctx.fillText("Erro ao carregar dados", canvasElement.width / 2, canvasElement.height / 2);
            }
        });
}

function criarGraficoCOperArea(labels, dados) {
    const canvasElement = document.getElementById('COperArea');
    const ctx = canvasElement.getContext('2d');

    backgroundColorsArray = ['#2ECC71', '#F1C40F', '#E74C3C', '#5f0a00']

    meuGraficoCOperArea = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: dados,
                backgroundColor: backgroundColorsArray,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { font: { family: 'DM Sans' } }
                },
                title: { display: false }
            }
        }
    });
}

function getAlertaById() {

    let fkEmpresa = sessionStorage.getItem("ID_EMPRESA");

    fetch(`/areas/getAlertaById/${fkEmpresa}`)
        .then(function (resposta) {
            if (!resposta.ok) {
                console.log("Erro ao executar o getAlertaById");
            }
            return resposta.json();
        })
        .then(function (resultado) {

            let alerta = document.getElementById("alert");

            alerta.innerHTML = ``;

            for (let i = 0; i < resultado.length; i++) {
                if(resultado[i].concentracao > 39){
                    alerta.innerHTML +=
                        `<div class="alert alert1">
                            <img src="/assets/dashboard/img_area.png">
                            <h4>${resultado[i].nome}</h4>
                            <p>${resultado[i].concentracao}ppm</p>
                            <p class="comparison" style="color:#be1300; font-weight: 900; border-color: #be1300; border-width: 3px">
                                ${((resultado[i].concentracao / 39) * 100).toFixed(0)}%
                            </p>
                        </div>`
                }else if(resultado[i].concentracao > 30){
                    alerta.innerHTML +=
                        `<div class="alert alert1">
                            <img src="/assets/dashboard/img_area.png">
                            <h4>${resultado[i].nome}</h4>
                            <p>${resultado[i].concentracao}ppm</p>
                            <p class="comparison" style="color:#E74C3C; font-weight: 900; border-color: #E74C3C; border-width: 3px">
                                ${((resultado[i].concentracao / 39) * 100).toFixed(0)}%
                            </p>
                        </div>`
                }else{
                    alerta.innerHTML +=
                        `<div class="alert alert1">
                            <img src="/assets/dashboard/img_area.png">
                            <h4>${resultado[i].nome}</h4>
                            <p>${resultado[i].concentracao}ppm</p>
                            <p class="comparison" style="color:#F1C40F; font-weight: 900; border-color: #F1C40F; border-width: 3px">
                                ${((resultado[i].concentracao / 39) * 100).toFixed(0)}%
                            </p>
                        </div>`
                }
            }
        })
}

window.onload = function () {
    dados();
    carregarRankingComChartJs();
    listarAreasLimite();
    getAlertaById();
    time();
};

function time() {
    dados();
    carregarRankingComChartJs();
    listarAreasLimite();
    setTimeout(function () {
        time()
    }, 5000);
}