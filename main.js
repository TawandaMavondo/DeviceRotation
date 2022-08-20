// let gyroscope = new Gyroscope({ frequency: 60 });

// let x = document.querySelector(".x");
// let y = document.querySelector(".y");
// let z = document.querySelector(".z");
// let rot = document.querySelector(".rot");

// let values = []
// rotated = 0.0
// start = false;
// startTime = 0

// function radians_to_degrees(radians) {
//     return radians * (180 / Math.PI);
// }
// gyroscope.addEventListener('reading', (e) => {
//     x.textContent = "X: " + gyroscope.x;
//     y.textContent = "Y: " + gyroscope.y;
//     z.textContent = "Z: " + gyroscope.z;
//     rot.textContent = "Rotated: " + rotated
//     if (start) {
//         let data = {
//             y: radians_to_degrees(gyroscope.x),
//             t: Math.floor(Date.now() / 1000) - startTime
//         }
//         values.push(data)
//     }
//     calculateRotated()
// });

// let btn = document.querySelector(".btn");


// btn.addEventListener("click", () => { start = true; startTime = Math.floor(Date.now() / 1000); console.log(startTime) })

// function calculateRotated() {
//     values.map(v => {
//         if (values < 0) return;
//         d = v.y * v.t
//         rotated += d;
//     })
// }

// gyroscope.start();



const startBtn = document.querySelector(".start-btn");
let rotated = 0;
let hasStarted = false;
let prevCompass = 0;

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
    if (hasStarted) {
        if (prevCompass == 0) prevCompass = compass;
        if (compass >= prevCompass) {
            rotated += compass - prevCompass
            compasV.textContent = "Rotated: " + rotated
            prevCompass = compass;
        }
        if (prevCompass < 2 && prevCompass > 357) prevCompass = 0;

        if (rotated >= 350) {
            hasStarted = false;
            alert("Rotated 360 deg");
        }
    }

}

init();
