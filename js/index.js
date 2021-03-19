var opts = {
    angle: -0.25,
    lineWidth: 0.3,
    radiusScale:0.9,
    pointer: {
        length: 0.6,
        strokeWidth: 0.05,
        color: '#000000'
    },
    staticLabels: {
        font: "10px sans-serif",
        labels: [25, 50, 500],
        fractionDigits: 0
    },
    staticZones: [
        {strokeStyle: "#F03E3E", min: 0, max: 25},
        {strokeStyle: "#FFDD00", min: 25, max: 50},
        {strokeStyle: "#4CAF50", min: 50, max:500},
    ],
    limitMax: false,
    limitMin: false,
    highDpiSupport: true
};
var target = document.getElementById('gauge');
var gauge = new Gauge(target).setOptions(opts);
document.getElementById("weight").className = "weight";
gauge.setTextField(document.getElementById("weight"));
gauge.maxValue = 500; // set max gauge value
gauge.setMinValue(0);  // set min value
gauge.set(125) // set actual value

function toggleCheckbox(element) {
    var xhr = new XMLHttpRequest();
    if(element.checked) {
        xhr.open("GET", "/update?output="+element.id+"&state=1", true);
    }
    else { 
        xhr.open("GET", "/update?output="+element.id+"&state=0", true); 
    }
    xhr.send();
}

const ssidElement = document.querySelector('#ssid')

fetch("/ssid", {method:"GET"})
        .then((request) => {return request.json()})
        .then((json) => {ssidElement.textContent=json.ssid}) 

setInterval(function ( ) {
    fetch("/weight", {method:"GET"})
        .then((request) => {return request.json()})
        .then((json) => {gauge.set(json.weight)})
}, 10000 );
 