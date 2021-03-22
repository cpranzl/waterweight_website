localStorage.setItem("red", 32);
localStorage.setItem("yellow", 64);
localStorage.setItem("green", 512);

fetch("/red", {method:"GET"})
    .then((request) => {return request.json()})
    .then((json) => {setRed(json.red)})

fetch("/yellow", {method:"GET"})
    .then((request) => {return request.json()})
    .then((json) => {setYellow(json.yellow)})

fetch("/green", {method:"GET"})
    .then((request) => {return request.json()})
    .then((json) => {setGreen(json.green)})

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
        labels: [32, 64, 512],
        fractionDigits: 0
    },
    staticZones: [
        {strokeStyle: "#F03E3E", min: 0, max: localStorage.getItem("red")},
        {strokeStyle: "#FFDD00", min: localStorage.getItem("red"), max: localStorage.getItem("yellow")},
        {strokeStyle: "#4CAF50", min: localStorage.getItem("yellow"), max: localStorage.getItem("green")}
    ],
    limitMax: false,
    limitMin: false,
    highDpiSupport: true
};
var target = document.getElementById('gauge');
var gauge = new Gauge(target).setOptions(opts);
document.getElementById("weight").className = "weight";
gauge.setTextField(document.getElementById("weight"));
gauge.maxValue = 512; // set max gauge value
gauge.setMinValue(0);  // set min value
UpdateWeight(128) // set start value

// SSID
const ssidElement = document.querySelector('#ssid')

fetch("/ssid", {method:"GET"})
    .then((request) => {return request.json()})
    .then((json) => {ssidElement.textContent=json.ssid}) 

// Weight
setInterval(function ( ) {
    fetch("/weight", {method:"GET"})
        .then((request) => {return request.json()})
        .then((json) => {UpdateWeight(json.weight)})
}, 10000 );

function UpdateWeight(weight){
    localStorage.setItem("weight", weight);
    gauge.set(weight);
    console.log(weight);
}

// Seetings
function setRed(red) {
    localStorage.setItem("red", red);
    console.log(red);
}

function updateRed() {
    red = localStorage.getItem("weight");
    // 10.0.0.124/updateRed?red=nnn
    localStorage.setItem("red", red);
    UpdateWeight(red);
}

function setYellow(yellow) {
    localStorage.setItem("yellow", yellow);
    console.log(yellow);
}

function updateYellow() {
    yellow = localStorage.getItem("weight");
    // 10.0.0.124/updateRed?red=nnn
    localStorage.setItem("yellow", yellow);
}

function setGreen(green) {
    localStorage.setItem("green", green);
    console.log(green);
}

function updateGreen() {
    green = localStorage.getItem("weight");
    // 10.0.0.124/updateRed?red=nnn
    localStorage.setItem("green", green);
}