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
};

function showAlerts(element){
    const sensors_wrapper = element.parentElement.parentElement.getElementsByClassName('sensors_wrapper')[0];
    const alerts_wrapper = element.parentElement.parentElement.getElementsByClassName('alerts_wrapper')[0];
    const graph = element.parentElement.parentElement.getElementsByClassName('graph')[0];


    alerts_wrapper.classList.add('selected');
    graph.classList.remove('selected');
    sensors_wrapper.classList.remove('selected');

    const buttons = element.parentElement.getElementsByClassName("button")
    for(let i=0; i<buttons.length; i++){
        buttons[i].classList.remove('clicked')
    }
    element.classList.add('clicked');
};

function showGraphs(element){
    const sensors_wrapper = element.parentElement.parentElement.getElementsByClassName('sensors_wrapper')[0];
    const alerts_wrapper = element.parentElement.parentElement.getElementsByClassName('alerts_wrapper')[0];
    const graph = element.parentElement.parentElement.getElementsByClassName('graph')[0];

    graph.classList.add('selected');
    alerts_wrapper.classList.remove('selected');
    sensors_wrapper.classList.remove('selected');

    const buttons = element.parentElement.getElementsByClassName("button")
    for(let i=0; i<buttons.length; i++){
        buttons[i].classList.remove('clicked')
    }
    element.classList.add('clicked');
};

function showSensors(element){
    const sensors_wrapper = element.parentElement.parentElement.getElementsByClassName('sensors_wrapper')[0];
    const alerts_wrapper = element.parentElement.parentElement.getElementsByClassName('alerts_wrapper')[0];
    const graph = element.parentElement.parentElement.getElementsByClassName('graph')[0];

    sensors_wrapper.classList.add('selected');
    alerts_wrapper.classList.remove('selected');
    graph.classList.remove('selected');

    const buttons = element.parentElement.getElementsByClassName("button")
    for(let i=0; i<buttons.length; i++){
        buttons[i].classList.remove('clicked')
    }
    element.classList.add('clicked');
}
