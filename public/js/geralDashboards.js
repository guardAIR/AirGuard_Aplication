var rankingChart = null;

function carregarRankingComChartJs() {

    let nomesDasAreas = [];
    let valoresPPM = [];

    if (rankingChart) {
        rankingChart.destroy();
        rankingChart = null;
    }

    fetch("/ranking/maiores-co")
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
    let statusNivel = [];
    let numeroAreas = [];

    let totalAreasGrafico = 0;
    let areasAcimaDoLimite = 0;

    if (meuGraficoCOperArea) {
        meuGraficoCOperArea.destroy();
        meuGraficoCOperArea = null;
    }

    fetch("/ranking/areaslimite")
        .then(function (resposta) {
            if (!resposta.ok) {
                throw new Error(`Erro HTTP: ${resposta.status}`);
            }
            return resposta.json();
        })
        .then(function (dados) {
            console.log("Dados para gráfico de pizza/KPIs:", dados);

            for (let i = 0; i < dados.length; i++) {
                const status = dados[i].status_nivel;
                const count = dados[i].numero_de_areas;

                statusNivel.push(status);
                numeroAreas.push(count);

                totalAreasGrafico += count;

                if (status === 'Perigoso') {
                    areasAcimaDoLimite += count;
                }
            }
            console.log(statusNivel);
            console.log(numeroAreas);
            console.log(totalAreasGrafico);
            console.log(areasAcimaDoLimite);

            const kpiTotalAreasEl = document.getElementById('kpiTotalAreas');
            const kpiAreasPerigosasEl = document.getElementById('kpiAreasPerigosas');

            if (kpiTotalAreasEl) {
                kpiTotalAreasEl.textContent = totalAreasGrafico;
            }
            if (kpiAreasPerigosasEl) {
                kpiAreasPerigosasEl.textContent = areasAcimaDoLimite;
                if (areasAcimaDoLimite > 0) {
                    kpiAreasPerigosasEl.classList.add('texto-alerta-vermelho');
                } else {
                    kpiAreasPerigosasEl.classList.remove('texto-alerta-vermelho');
                }
            }

            const canvasElement = document.getElementById('COperArea');
            if (!canvasElement) {
                console.error("Canvas 'COperArea' não encontrado.");
                if (kpiTotalAreasEl) kpiTotalAreasEl.textContent = 'N/A';
                if (kpiAreasPerigosasEl) kpiAreasPerigosasEl.textContent = 'N/A';
                return;
            }
            const COperAreaCtx = canvasElement.getContext('2d');

            if (statusNivel.length === 0) {
                COperAreaCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
                COperAreaCtx.font = "14px DM Sans"; COperAreaCtx.fillStyle = "#555";
                COperAreaCtx.textAlign = "center";
                COperAreaCtx.fillText("Sem dados para exibir", canvasElement.width / 2, canvasElement.height / 2);
                if (kpiTotalAreasEl) kpiTotalAreasEl.textContent = '0';
                if (kpiAreasPerigosasEl) kpiAreasPerigosasEl.textContent = '0';
                return;
            }

            const coresPorStatus = {
                'Seguro': '#2ECC71',
                'Atenção': '#F1C40F',
                'Alerta': '#E74C3C',
                'Perigoso': '#5f0a00'
            };

            const backgroundColorsArray = statusNivel.map(status => coresPorStatus[status] || '#CCCCCC');


            meuGraficoCOperArea = new Chart(COperAreaCtx, {
                type: 'pie',
                data: {
                    labels: statusNivel,
                    datasets: [{
                        data: numeroAreas,
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
                        title: {
                            display: false
                        }
                    }
                }
            });

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

window.onload = function () {
    dados();
    carregarRankingComChartJs();
    listarAreasLimite();
};
setInterval(function () {
    dados();
    carregarRankingComChartJs();
    listarAreasLimite();
}, 10000); 