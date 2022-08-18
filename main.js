let gyroscope = new Gyroscope({ frequency: 60 });

let x = document.querySelector(".x");
let y = document.querySelector(".y");
let z = document.querySelector(".z");
let values = []
rotated = 0.0
start = false;
startTime = 0

function radians_to_degrees(radians) {
    return radians * (180 / Math.PI);
}
gyroscope.addEventListener('reading', (e) => {
    x.textContent = "X: " + gyroscope.x;
    y.textContent = "Y: " + gyroscope.y;
    z.textContent = "Z: " + gyroscope.z;
    if (start) {
        let data = {
            x: radians_to_degrees(gyroscope.x),
            t: Math.floor(Date.now() / 1000) - startTime
        }
        values.push(data)
    }

});

let btn = document.querySelector(".btn");
let btn2 = document.querySelector(".btn2");

btn.addEventListener("click", () => { start = true; startTime = Math.floor(Date.now() / 1000); console.log(startTime) })
let rot = document.querySelector("rot");

function calculateRotated() {
    values.map(v => {
        if (values < 0) return;
        d = v.x * v.t
        rotated += d;
        rot.textContent = "Rotated: " + rotated
    })
}

gyroscope.start();
