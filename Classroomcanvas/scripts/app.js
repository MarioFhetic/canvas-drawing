const canvas = document.querySelector('.js-canvas')
const container = document.querySelector('.js-container')
const ctx = canvas.getContext('2d') 
const sizes = {width: 1000, height: 500};
canvas.width = sizes.width;
canvas.height = sizes.height;

const canvasWindow = document.querySelector('.js-window')
const ctxWindow = canvasWindow.getContext('2d')
const windowSizes = {width: 600, height: 150}
canvasWindow.width = windowSizes.width
canvasWindow.height = windowSizes.height

let posCloudOne = 20,
    posCloudTwo = 130,
    posCloudThree = 230,
    posOnex = 0.1,
    posTwox = 0.1,
    posThreex = 0.1;

let canvasClock, clockWidth, centerX, centerY, ctxClock
let canvasDoor, ctxDoor, doorWidth, centerDoorX, centerDoorY, doorSizes

let previousPosition, dragging = false

// Set default tool
let tool = 'draw';
// Set colors
function switchColors(color) {
    switch (color){
        case "green":
            actualColor = "#badc58";
            break;
        case "blue":
            actualColor = "#7ed6df";
            break;
        case "red":
            actualColor = "#eb4d4b";
            break;
        case "yellow":
            actualColor = "#f9ca24";
            break;
        case "white":
            actualColor = "white";
            break;
        case "eraser":
            actualColor = "#027120"
            break;
    }
}
// Set default color
let actualColor = 'white'

// on click erase:
const eraseTool = document.querySelector('.eraser')
eraseTool.addEventListener('click',  function(){
    // // change tool
    tool = 'erase';
    // ctx.globalCompositeOperation = 'destination-out'    
    // update class to change cursor 
    !canvas.classList.contains('erase') ? canvas.classList.add('erase') : canvas.classList.remove('erase');

})
// on click pen:
const penTool = document.querySelector('.colors')
penTool.addEventListener('click',  function(event){
    // change tool
    tool = 'draw';
    // update color if necessary 
    let color = event.target.id;
    switchColors(color);
    // change cursor back if necessary
    canvas.classList.contains('erase') ? canvas.classList.remove('erase') : ''
    ctx.globalCompositeOperation = 'source-over'
})



function drawLine(position) {
    
    ctx.beginPath();
    console.log(ctx.globalCompositeOperation);
    if (tool === 'draw') {
        ctx.lineWidth = 8  // Largeur de la ligne
        ctx.strokeStyle = actualColor // Couleur de la ligne
        ctx.globalAlpha = 0.7
        console.log('drawing...')
    } else if (tool === 'erase') {
        ctx.strokeStyle = "#027120" // Couleur de la ligne
        ctx.globalAlpha = .6
        ctx.lineWidth = 45
        console.log('erasing...')
    }
    ctx.moveTo(previousPosition.x, previousPosition.y) // position du point d'avant 
    ctx.lineTo(position.x, position.y)
    ctx.lineCap = 'butt'  // Fin de ligne (round | butt | square)
    ctx.lineJoin = 'round'  // Jointure des lignes (bevel | round | mitter)
    ctx.stroke();
    previousPosition = position;

}

function drawCloud() {

    ctxWindow.fillStyle = '#341f97'
    ctxWindow.fillRect(0, 0, canvasWindow.width, canvasWindow.height)



    ctxWindow.beginPath()
    ctxWindow.fillStyle = 'yellow'

    ctx.beginPath();
    ctxWindow.fillStyle = 'white'
    ctxWindow.arc(posCloudOne, 180, 100, 0, Math.PI * 2, false)
    ctxWindow.arc(posCloudTwo, 170, 100, 0, Math.PI * 2, false)
    ctxWindow.arc(posCloudThree, 190, 100, 0, Math.PI * 2, false)
  
    ctxWindow.fill();
    ctxWindow.closePath();
}

function drawClouds() {
    drawCloud();
    posCloudOne += posOnex;
    posCloudTwo += posTwox;
    posCloudThree += posThreex;
}

function drawDoor()
{
    canvasDoor = document.querySelector('.js-door')
    ctxDoor = canvasDoor.getContext('2d')
    centerDoorX = canvasDoor.width / 2
    centerDoorY = canvasDoor.height / 2
    doorSizes = {width: 250, height: 500}
    canvasDoor.width = doorSizes.width
    canvasDoor.height = doorSizes.height


    ctxDoor.fillStyle = '#10ac84'
    ctxDoor.fillRect(0,0,canvasDoor.width,canvasDoor.height)

    // logoHetic()
    borderDoor()


    ctxDoor.fillStyle = 'white'
    ctxDoor.fillRect(25, 247, 15,15)

    ctxDoor.fillStyle = 'white'
    ctxDoor.fillRect(25, 280, 17, 17)

    ctxDoor.fillStyle = 'black'
    ctxDoor.fillRect(31, 283, 5, 10)

    ctxDoor.fillStyle = 'white'
    ctxDoor.fillRect(25,250, 35, 7)

}
drawDoor()  

function borderDoor()
{
    ctxDoor.beginPath()
    ctxDoor.fillStyle = 'orange'
    ctxDoor.rect(10, 10, 230, 500)
    ctxDoor.stroke()
}

/* CLOCK */ 


function drawClock()
{
    canvasClock = document.querySelector('.js-clock')
    ctxClock = canvasClock.getContext('2d')
    clockWidth = canvasClock.width
    // console.log(canvasClock,ctxClock)
    centerX = canvasClock.width / 2
    centerY = canvasClock.height / 2

    tick()
    window.setInterval(tick, 1000)
}
// drawClock()

function tick()
{
    let date = new Date()
    ctxClock.clearRect(0,0,canvasClock.width,canvasClock.height) // sinon aiguille minute se

    drawStaticElts();

    let hours = date.getHours()
    ctxClock.strokeStyle = '#7f8fa6'
    ctxClock.lineWidth = 2;
    drawHand(clockWidth / 3, hours * 30)

    let minutes = date.getMinutes()
    ctxClock.strokeStyle = '#dcdde1'
    ctxClock.lineWidth = 2;
    drawHand(clockWidth / 2, minutes * 6)

    let seconds = date.getSeconds()
    ctxClock.strokeStyle = '#f5f6fa'
    ctxClock.lineWidth = 2;
    drawHand(clockWidth / 2, seconds * 6)

}
// tick()

function drawStaticElts()
{
    ctxClock.beginPath()
    ctxClock.arc(centerX, centerY, clockWidth / 2, 0, 2 * Math.PI, false)
    ctxClock.fillStyle = 'white'
    ctxClock.strokeStyle = 'black'
    ctx.lineWidth = 2;
    ctx.stroke()
    ctx.closePath()

    ctxClock.beginPath()
    ctxClock.arc(centerX, centerY, 2, 0, 2 * Math.PI, false)
    ctxClock.strokeStyle = 'black'
    ctx.fill()
    ctx.closePath()

    drawNumbers()
}

function drawNumbers()
{
    let i = 12;
    ctxClock.strokeStyle = 'white'
    ctxClock.lineWidth = 2

    while (i > 0)
    {
        ctxClock.save()
        ctxClock.beginPath()
        ctxClock.translate(centerX, centerY)
        let angle = (i * 30) * Math.PI / 180
        ctxClock.rotate(angle)
        ctxClock.translate(0, - clockWidth / 2)

        ctxClock.save()
        ctxClock.translate(0, -10)
        ctxClock.rotate(-angle)

        ctxClock.fillText(i, -3, 0)
        ctxClock.restore()

        ctxClock.moveTo(0,0)
        ctxClock.lineTo(0,10)
        ctxClock.stroke()
        ctxClock.closePath()
        ctxClock.restore()

        i --
    }
}

function drawHand(length, angle)
{
    ctxClock.save();
    ctxClock.beginPath()
    ctxClock.translate(centerX,centerY)
    ctxClock.rotate(-180 * Math.PI / 180);
    ctxClock.rotate(angle * Math.PI / 180)
    ctxClock.moveTo(0,0)
    ctxClock.lineTo(0, length)
    ctxClock.stroke()
    ctxClock.closePath()
    ctxClock.restore() 
}

window.onload = function ()
{
    drawClock(360)
}




/* BOARD */

function getCanvasCoordonates(event)
{
    let x = event.clientX - canvas.getBoundingClientRect().left; 
    let y = event.clientY - canvas.getBoundingClientRect().top;

    return { "x" : x, "y" : y}
}

function dragStart (event)
{
    // console.log(getCanvasCoordonates(event))
    dragging = true;
    previousPosition = getCanvasCoordonates(event);
    console.log(previousPosition)
}

function drag (event)
{
    // console.log(getCanvasCoordonates(event))
    let position;
    if(dragging === true)
    {
        position = getCanvasCoordonates(event);
        drawLine(position)
    }
}

function dragStop (event)
{
    // console.log(getCanvasCoordonates(event))
    dragging = false
    position = getCanvasCoordonates(event);
    // drawLine(position);
}

canvas.addEventListener('mousedown', dragStart, false)
canvas.addEventListener('mousemove', drag, false)
canvas.addEventListener('mouseup', dragStop, false)


function drawBoard() 
{
    ctx.fillStyle = '#027120'
    ctx.fillRect(0, 0, 1000, 500)
    ctx.fill();
}
drawBoard();

const loop = () =>
{
    window.requestAnimationFrame(loop)
    drawClouds()
    
}
loop()
 
