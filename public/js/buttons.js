function renderHeatmap(fkarea, local) {
    if(local){
        const container = local.querySelector('.heatmap');
        console.log(container)
        var instanciaHeatmap = h337.create({
            container: container
        });
        data = []
        fetch('/areas/getSensorsAndRead/'+fkarea, { method: 'GET' })
            .then((result) => result.json())
            .then((json) => {
                for(let i=0; i<json.length; i++){
                    data.push({ 
                        x: json[i].eixo_x, 
                        y: json[i].eixo_y, 
                        value: json[i].concentracao_gas*100, 
                        radius: json[i].concentracao_gas*4, 
                        dataHora: json[i].data_hora 
                    });
                }

                instanciaHeatmap.setData({ data: data });
            })
    }
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
    renderHeatmap(fkarea, expandElement);
};

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

function showSensors(element) {
    const sensors_wrapper = element.parentElement.parentElement.getElementsByClassName('sensors_wrapper')[0];
    const alerts_wrapper = element.parentElement.parentElement.getElementsByClassName('alerts_wrapper')[0];
    const graph = element.parentElement.parentElement.getElementsByClassName('graph')[0];

    sensors_wrapper.classList.add('selected');
    alerts_wrapper.classList.remove('selected');
    graph.classList.remove('selected');

    const buttons = element.parentElement.getElementsByClassName("button")
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('clicked')
    }
    element.classList.add('clicked');
}
