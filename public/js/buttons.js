let isExpanded1 = false;
let isExpanded2 = false;
let isExpanded3 = false;
let isExpanded4 = false;
let isExpanded5 = false;
let isExpanded6 = false;
let isExpanded7 = false;

function expandir_area1() {
    const expandElement = document.getElementById('expand_1');
    if (isExpanded1) {
        expandElement.classList.remove('expanded');
        isExpanded1 = false;
        expandir_area_icon1.innerHTML = "keyboard_arrow_down";
    } else {
        expandElement.classList.add('expanded');
        isExpanded1 = true;
        expandir_area_icon1.innerHTML = "keyboard_arrow_up";
    }
}

function expandir_area2() {
    const expandElement = document.getElementById('expand_2');
    if (isExpanded2) {
        expandElement.classList.remove('expanded');
        isExpanded2 = false;
        expandir_area_icon2.innerHTML = "keyboard_arrow_down";
    } else {
        expandElement.classList.add('expanded');
        isExpanded2 = true;
        expandir_area_icon2.innerHTML = "keyboard_arrow_up";
    }
}

function expandir_area3() {
    const expandElement = document.getElementById('expand_3');
    if (isExpanded3) {
        expandElement.classList.remove('expanded');
        isExpanded3 = false;
        expandir_area_icon3.innerHTML = "keyboard_arrow_down";
    } else {
        expandElement.classList.add('expanded');
        isExpanded3 = true;
        expandir_area_icon3.innerHTML = "keyboard_arrow_up";
    }
}

function expandir_area4() {
    const expandElement = document.getElementById('expand_4');
    if (isExpanded4) {
        expandElement.classList.remove('expanded');
        isExpanded4 = false;
        expandir_area_icon4.innerHTML = "keyboard_arrow_down";
    } else {
        expandElement.classList.add('expanded');
        isExpanded4 = true;
        expandir_area_icon4.innerHTML = "keyboard_arrow_up";
    }
}


function expandir_area5() {
    const expandElement = document.getElementById('expand_5');
    if (isExpanded5) {
        expandElement.classList.remove('expanded');
        isExpanded5 = false;
        expandir_area_icon5.innerHTML = "keyboard_arrow_down";
    } else {
        expandElement.classList.add('expanded');
        isExpanded5 = true;
        expandir_area_icon5.innerHTML = "keyboard_arrow_up";
    }
}

function expandir_area6() {
    const expandElement = document.getElementById('expand_6');
    if (isExpanded6) {
        expandElement.classList.remove('expanded');
        isExpanded6 = false;
        expandir_area_icon6.innerHTML = "keyboard_arrow_down";
    } else {
        expandElement.classList.add('expanded');
        isExpanded6 = true;
        expandir_area_icon6.innerHTML = "keyboard_arrow_up";
    }
}

function expandir_area7() {
    const expandElement = document.getElementById('expand_7');
    if (isExpanded7) {
        expandElement.classList.remove('expanded');
        isExpanded7 = false;
        expandir_area_icon7.innerHTML = "keyboard_arrow_down";
    } else {
        expandElement.classList.add('expanded');
        isExpanded7 = true;
        expandir_area_icon7.innerHTML = "keyboard_arrow_up";
    }
}

function showAlerts1(){
    alerts1_wrapper.classList.add('selected');
    graph1_wrapper.classList.remove('selected');
    sensors1_wrapper.classList.remove('selected');

    buttonShowAlerts1.classList.add('clicked');
    buttonShowGraphs1.classList.remove('clicked');
    buttonShowSensors1.classList.remove('clicked');
}
function showAlerts2(){
    alerts2_wrapper.classList.add('selected');
    graph2_wrapper.classList.remove('selected');
    sensors2_wrapper.classList.remove('selected');

    buttonShowAlerts2.classList.add('clicked');
    buttonShowGraphs2.classList.remove('clicked');
    buttonShowSensors2.classList.remove('clicked');
}
function showAlerts3(){
    alerts3_wrapper.classList.add('selected');
    graph3_wrapper.classList.remove('selected');
    sensors3_wrapper.classList.remove('selected');

    buttonShowAlerts3.classList.add('clicked');
    buttonShowGraphs3.classList.remove('clicked');
    buttonShowSensors3.classList.remove('clicked');
}
function showAlerts4(){
    alerts4_wrapper.classList.add('selected');
    graph4_wrapper.classList.remove('selected');
    sensors4_wrapper.classList.remove('selected');

    buttonShowAlerts4.classList.add('clicked');
    buttonShowGraphs4.classList.remove('clicked');
    buttonShowSensors4.classList.remove('clicked');
}
function showAlerts5(){
    alerts5_wrapper.classList.add('selected');
    graph5_wrapper.classList.remove('selected');
    sensors5_wrapper.classList.remove('selected');

    buttonShowAlerts5.classList.add('clicked');
    buttonShowGraphs5.classList.remove('clicked');
    buttonShowSensors5.classList.remove('clicked');
}
function showAlerts6(){
    alerts6_wrapper.classList.add('selected');
    graph6_wrapper.classList.remove('selected');
    sensors6_wrapper.classList.remove('selected');

    buttonShowAlerts6.classList.add('clicked');
    buttonShowGraphs6.classList.remove('clicked');
    buttonShowSensors6.classList.remove('clicked');
}
function showAlerts7(){
    alerts7_wrapper.classList.add('selected');
    graph7_wrapper.classList.remove('selected');
    sensors7_wrapper.classList.remove('selected');

    buttonShowAlerts7.classList.add('clicked');
    buttonShowGraphs7.classList.remove('clicked');
    buttonShowSensors7.classList.remove('clicked');
}

function showGraphs1(){
    alerts1_wrapper.classList.remove('selected');
    graph1_wrapper.classList.add('selected');
    sensors1_wrapper.classList.remove('selected');

    buttonShowAlerts1.classList.remove('clicked');
    buttonShowGraphs1.classList.add('clicked');
    buttonShowSensors1.classList.remove('clicked');
}
function showGraphs2(){
    alerts2_wrapper.classList.remove('selected');
    graph2_wrapper.classList.add('selected');
    sensors2_wrapper.classList.remove('selected');

    buttonShowAlerts2.classList.remove('clicked');
    buttonShowGraphs2.classList.add('clicked');
    buttonShowSensors2.classList.remove('clicked');
}
function showGraphs3(){
    alerts3_wrapper.classList.remove('selected');
    graph3_wrapper.classList.add('selected');
    sensors3_wrapper.classList.remove('selected');

    buttonShowAlerts3.classList.remove('clicked');
    buttonShowGraphs3.classList.add('clicked');
    buttonShowSensors3.classList.remove('clicked');
}
function showGraphs4(){
    alerts4_wrapper.classList.remove('selected');
    graph4_wrapper.classList.add('selected');
    sensors4_wrapper.classList.remove('selected');

    buttonShowAlerts4.classList.remove('clicked');
    buttonShowGraphs4.classList.add('clicked');
    buttonShowSensors4.classList.remove('clicked');
}
function showGraphs5(){
    alerts5_wrapper.classList.remove('selected');
    graph5_wrapper.classList.add('selected');
    sensors5_wrapper.classList.remove('selected');

    buttonShowAlerts5.classList.remove('clicked');
    buttonShowGraphs5.classList.add('clicked');
    buttonShowSensors5.classList.remove('clicked');
}
function showGraphs6(){
    alerts6_wrapper.classList.remove('selected');
    graph6_wrapper.classList.add('selected');
    sensors6_wrapper.classList.remove('selected');

    buttonShowAlerts6.classList.remove('clicked');
    buttonShowGraphs6.classList.add('clicked');
    buttonShowSensors6.classList.remove('clicked');
}
function showGraphs7(){
    alerts7_wrapper.classList.remove('selected');
    graph7_wrapper.classList.add('selected');
    sensors7_wrapper.classList.remove('selected');

    buttonShowAlerts7.classList.remove('clicked');
    buttonShowGraphs7.classList.add('clicked');
    buttonShowSensors7.classList.remove('clicked');
}

function showSensors1(){
    alerts1_wrapper.classList.remove('selected');
    graph1_wrapper.classList.remove('selected');
    sensors1_wrapper.classList.add('selected');

    buttonShowAlerts1.classList.remove('clicked');
    buttonShowGraphs1.classList.remove('clicked');
    buttonShowSensors1.classList.add('clicked');
}
function showSensors2(){
    alerts2_wrapper.classList.remove('selected');
    graph2_wrapper.classList.remove('selected');
    sensors2_wrapper.classList.add('selected');

    buttonShowAlerts2.classList.remove('clicked');
    buttonShowGraphs2.classList.remove('clicked');
    buttonShowSensors2.classList.add('clicked');
}
function showSensors3(){
    alerts3_wrapper.classList.remove('selected');
    graph3_wrapper.classList.remove('selected');
    sensors3_wrapper.classList.add('selected');

    buttonShowAlerts3.classList.remove('clicked');
    buttonShowGraphs3.classList.remove('clicked');
    buttonShowSensors3.classList.add('clicked');
}
function showSensors4(){
    alerts4_wrapper.classList.remove('selected');
    graph4_wrapper.classList.remove('selected');
    sensors4_wrapper.classList.add('selected');

    buttonShowAlerts4.classList.remove('clicked');
    buttonShowGraphs4.classList.remove('clicked');
    buttonShowSensors4.classList.add('clicked');
}
function showSensors5(){
    alerts5_wrapper.classList.remove('selected');
    graph5_wrapper.classList.remove('selected');
    sensors5_wrapper.classList.add('selected');

    buttonShowAlerts5.classList.remove('clicked');
    buttonShowGraphs5.classList.remove('clicked');
    buttonShowSensors5.classList.add('clicked');
}
function showSensors6(){
    alerts6_wrapper.classList.remove('selected');
    graph6_wrapper.classList.remove('selected');
    sensors6_wrapper.classList.add('selected');

    buttonShowAlerts6.classList.remove('clicked');
    buttonShowGraphs6.classList.remove('clicked');
    buttonShowSensors6.classList.add('clicked');
}
function showSensors7(){
    alerts7_wrapper.classList.remove('selected');
    graph7_wrapper.classList.remove('selected');
    sensors7_wrapper.classList.add('selected');

    buttonShowAlerts7.classList.remove('clicked');
    buttonShowGraphs7.classList.remove('clicked');
    buttonShowSensors7.classList.add('clicked');
}