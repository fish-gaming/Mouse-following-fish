// Followed this tutorial: https://www.youtube.com/watch?v=wG_5453Vq98

console.clear();

const circleElement = document.querySelector('.circle');

const mouse = { x: 0, y: 0 }; // track mouse position
const previousMouse = { x: 0, y: 0 } // track where the mouse was
const circle = { x: 0, y: 0 }; // track circle position

let currentScale = 0;
let currentAngle = 0;

window.addEventListener('mousemove', (e) => { // update the mousemove position
    mouse.x = e.x;
    mouse.y = e.y;
});

const speed = 0.05; // how fast the circle gets to the mouse

const tick = () => {
    circle.x += (mouse.x - circle.x) * speed; // calc circle movement based on mouse position
    circle.y += (mouse.y - circle.y) * speed;

    const translateTransform = `translate(${circle.x}px, ${circle.y}px)`; // string for circle translation

    const deltaMouseX = mouse.x - previousMouse.x; // calc change in mouse position
    const deltaMouseY = mouse.y - previousMouse.y;
    previousMouse.x = mouse.x; // update for next frame
    previousMouse.y = mouse.y;

    const mouseVelocity = Math.min(Math.sqrt(deltaMouseX**2 + deltaMouseY**2) * 4, 150); // use a^2 + b^2 = c^2 to find the velocity of the mouse
    const scaleValue = (mouseVelocity / 150) * 0.5; // convert the velocity to > 0.5

    currentScale += (scaleValue - currentScale) * speed; // update current scale
    const scaleTransform = `scale(${1 + currentScale}, ${1 - currentScale})`; // string for circle scaling

    const angle = Math.atan2(deltaMouseY, deltaMouseX) * 180 / Math.PI; // calculate the angle to the mouse
    if (mouseVelocity > 20) {
        currentAngle = angle; // reduce shake
    }
    const rotateTransform = `rotate(${currentAngle}deg)`; // string for circle rotation

    circleElement.style.transform = `${translateTransform} ${rotateTransform} ${scaleTransform}`; // apply stings to the circle

    window.requestAnimationFrame(tick); // get the next frame 
}

tick(); // start the animation