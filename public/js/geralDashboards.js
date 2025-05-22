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


async function carregarRanking() {
    try {
        const resposta = await fetch("/ranking/maiores-co");
        const dados = await resposta.json();

        const container = document.getElementById("rankingContainer");
        container.innerHTML = `
            <div class="ranking_header">
                <span class="header_area">Nome da área</span>
                <span class="header_comparison">Barra de comparação</span>
                <span class="header_concentration">ppm</span>
                <span class="header_percentage">%</span>
            </div>`;

        const maxPpm = 39;

        dados.forEach(area => {
            const percentual = ((area.ppm / maxPpm) * 100).toFixed(2);
            let corBarra;
            if (area.ppm < 20) {
                corBarra = 'green_bar';
            } else if (area.ppm < 30) {
                corBarra = 'yellow_bar';
            } else if (area.ppm < 39) {
                corBarra = 'red_bar';
            } else {
                corBarra = 'blackred_bar'
            }

            container.innerHTML += `
                <div class="ranking_item">
                    <span class="area_name">${area.nome_area}</span>
                    <div class="bar_container">
                        <div class="bar ${corBarra}" style="width: ${percentual}%"></div>
                    </div>
                    <span class="area_value">${area.ppm}ppm</span>
                    <div class="percentage">${percentual}%</div>
                </div>
            `;
        });
    } catch (erro) {
        console.error("Erro ao carregar ranking:", erro);
    }
}
window.onload = function () {
    dados();
    carregarRanking();
};
setInterval(function () {
    dados();
    carregarRanking();
}, 5000); 