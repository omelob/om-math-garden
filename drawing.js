const BACKGROUND_COLOR = '#000000';
const LINE_COLOUR = '#FFFFFF';
const LINE_WIDTH = 15;

var currentX = 0;
var currentY = 0;
var previousX = 0;
var previousY = 0;

var canvas;
var context

function prepareCanvas() {
    console.log('Preparing Canvas');

    canvas = document.getElementById('my-canvas');
    context = canvas.getContext('2d');

    context.fillStyle = BACKGROUND_COLOR;
    context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    context.strokeStyle = LINE_COLOUR;
    context.lineWidth = LINE_WIDTH;
    context.lineJoin = 'round';

    var isPainting = false;
    
    document.addEventListener('mousedown', function(event){
        // console.log('empieza');
        isPainting = true;
        
        currentX = event.clientX - canvas.offsetLeft;
        currentY = event.clientY - canvas.offsetTop;
    });

    document.addEventListener('mousemove', e => {
        if (isPainting === true){
            previousX = currentX;
            currentX = e.clientX - canvas.offsetLeft;

            previousY = currentY;
            currentY = e.clientY - canvas.offsetTop;

            draw();
        }
        
    });

    document.addEventListener('mouseup', e => {
        isPainting = false;
        // console.log('termino');
    });

    canvas.addEventListener('mouseleave', e => {
        isPainting = false;
    });

    // Touch Events
    canvas.addEventListener('touchstart', function(event){
        console.log('Touchdown');
        isPainting = true;
        
        currentX = event.touches[0].clientX - canvas.offsetLeft;
        currentY = event.touches[0].clientY - canvas.offsetTop;
    });

    canvas.addEventListener('touchend', e => {
        isPainting = false;
    });

    canvas.addEventListener('touchcancel', e => {
        isPainting = false;
    });

    canvas.addEventListener('touchmove', e => {
        if (isPainting === true){
            previousX = currentX;
            currentX = e.touches[0].clientX - canvas.offsetLeft;

            previousY = currentY;
            currentY = e.touches[0].clientY - canvas.offsetTop;

            draw();
        }
        
    });

}

function draw() {
    context.beginPath();
    context.moveTo(previousX, previousY);
    context.lineTo(currentX, currentY);
    context.closePath();
    context.stroke();
}

function clearCanvas() {
    currentX = 0;
    currentY = 0;
    previousX = 0;
    previousY = 0;

    context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}
