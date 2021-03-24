M.AutoInit();

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
        {strokeStyle: "#F03E3E", min: 0, max: 32},
        {strokeStyle: "#FFDD00", min: 32, max: 64},
        {strokeStyle: "#4CAF50", min: 64, max: 512}
    ],
    limitMax: false,
    limitMin: false,
    highDpiSupport: true
};
var target = document.getElementById('gauge');
var gauge = new Gauge(target).setOptions(opts);
document.getElementById("voltage").className = "voltage";
gauge.setTextField(document.getElementById("voltage"));
gauge.maxValue = 512; // Set max gauge value
gauge.setMinValue(0);  // Set min value
gauge.set(128) // Set start value

fetch("/config", {method:"GET"})
	.then((request) => {return request.json()})
	.then((json) => {readConfig(json)})

function readConfig(json) {
	localStorage.setItem("red", json.red);
	console.log(localStorage.getItem("red"));
	localStorage.setItem("yellow", json.yellow);
	console.log(localStorage.getItem("yellow"));
	localStorage.setItem("green", json.green);
	console.log(localStorage.getItem("green"));
}
const voltageElement = document.querySelector('#voltage')
voltageElement.textContent = 0;
setInterval(function (){
	fetch("/voltage", {method:"GET"})
	.then((request) => {return request.json()})
	.then((json) => {updateVoltage(json.voltage)})
}, 10000);

function updateVoltage(voltage) {
    voltageElement.textContent = voltage;
    gauge.set(voltage);
}

const ssidElement = document.querySelector('#ssid')
fetch("/ssid", {method:"GET"})
	.then((request) => {return request.json()})
	.then((json) => {ssidElement.textContent=json.ssid})

function updateRed() {
    fetch(window.location.href + "updateRed?" + encodeQueryData({"red": voltageElement.textContent}));
    localStorage.setItem("red", localStorage.getItem("voltage"));
}

function updateYellow() {
    fetch(window.location.href + "updateYellow?" + encodeQueryData({"yellow": voltageElement.textContent}));
    localStorage.setItem("yellow", localStorage.getItem("voltage"));
}

function updateGreen() {
    fetch(window.location.href + "updateGreen?" + encodeQueryData({"green": voltageElement.textContent}));
    localStorage.setItem("green", localStorage.getItem("voltage"));
}

function encodeQueryData(data) {
    const ret = [];
    for (let d in data)
        ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    return ret.join('&');
}
