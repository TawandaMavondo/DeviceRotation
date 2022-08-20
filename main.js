const startBtn = document.querySelector(".start-btn");
let rotated = 0;
let hasStarted = false;
let prevCompass = 0;
let passedNorth = false
const isIOS =
    navigator.userAgent.match(/(iPod|iPhone|iPad)/) &&
    navigator.userAgent.match(/AppleWebKit/);

function init() {
    startBtn.addEventListener("click", startCompass);
    // navigator.geolocation.getCurrentPosition(locationHandler);

    if (!isIOS) {
        window.addEventListener("deviceorientationabsolute", handler, true);
    }
}

function startCompass() {
    hasStarted = true;
    if (isIOS) {
        DeviceOrientationEvent.requestPermission()
            .then((response) => {
                if (response === "granted") {
                    window.addEventListener("deviceorientation", handler, true);
                } else {
                    alert("has to be allowed!");
                }
            })
            .catch(() => alert("not supported"));
    }
}

let compasV = document.querySelector(".compass-v");
let comp = document.querySelector(".comp");
let prev = document.querySelector(".prev");

function handler(e) {
    let compass = e.webkitCompassHeading || Math.abs(e.alpha - 360);
    comp.textContent = "Compass: " + compass;
    prev.textContent = "Prev: " + prevCompass;
    if (hasStarted && passedNorth == false) {
        if (prevCompass == 0 || compass == 360) prevCompass = compass;
        if (compass == 360 || compass == 0) passedNorth = true
        if (compass >= prevCompass) {
            rotated += compass - prevCompass
            compasV.textContent = "Rotated: " + rotated.toFixed(1)
            prevCompass = compass;
        }

    } //
    console.log(passedNorth);

    if (rotated >= 350) {
        hasStarted = false;
        alert("Rotated 360 deg");
    }

}

init();
