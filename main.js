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

function handler(e) {
    let compass = e.webkitCompassHeading || Math.abs(e.alpha - 360);

    if (hasStarted) {
        if (compass > prevCompass) {
            rotated += compass - prevCompass
            compasV.textContent = "Rotated: " + rotated
            prevCompass = compass;
        }
        if (rotated >= 350) {
            hasStarted = false;
            alert("Rotated 360 deg");
        }
    }

    // ±15 degree
    // if (
    //     (pointDegree < Math.abs(compass) &&
    //         pointDegree + 15 > Math.abs(compass)) ||
    //     pointDegree > Math.abs(compass + 15) ||
    //     pointDegree < Math.abs(compass)
    // ) {
    //     myPoint.style.opacity = 0;
    // } else if (pointDegree) {
    //     myPoint.style.opacity = 1;
    // }
}

// let pointDegree;

// function locationHandler(position) {
//     const { latitude, longitude } = position.coords;
//     pointDegree = calcDegreeToPoint(latitude, longitude);

//     if (pointDegree < 0) {
//         pointDegree = pointDegree + 360;
//     }
// }

// function calcDegreeToPoint(latitude, longitude) {
//     // Qibla geolocation
//     const point = {
//         lat: 21.422487,
//         lng: 39.826206
//     };

//     const phiK = (point.lat * Math.PI) / 180.0;
//     const lambdaK = (point.lng * Math.PI) / 180.0;
//     const phi = (latitude * Math.PI) / 180.0;
//     const lambda = (longitude * Math.PI) / 180.0;
//     const psi =
//         (180.0 / Math.PI) *
//         Math.atan2(
//             Math.sin(lambdaK - lambda),
//             Math.cos(phi) * Math.tan(phiK) -
//             Math.sin(phi) * Math.cos(lambdaK - lambda)
//         );
//     return Math.round(psi);
// }

init();
