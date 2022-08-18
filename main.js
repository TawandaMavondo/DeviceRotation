let gyroscope = new Gyroscope({ frequency: 60 });

let x = document.querySelector(".x");
let y = document.querySelector(".y");
let z = document.querySelector(".z");

gyroscope.addEventListener('reading', (e) => {
    console.log(`Angular velocity along the X-axis ${gyroscope.x}`);
    x.textContent = gyroscope.x;
    y.textContent = gyroscope.y;
    z.textContent = gyroscope.z;
    console.log(`Angular velocity along the Y-axis ${gyroscope.y}`);
    console.log(`Angular velocity along the Z-axis ${gyroscope.z}`);
});

gyroscope.start();
