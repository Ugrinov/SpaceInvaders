var i, ship, Timer, sc, boom, fsc, canvas = document.getElementById("game"),
    context = canvas.getContext("2d"),
    aster = [],
    fire = [],
    expl = [];
asterimg = new Image, asterimg.src = "astero.png", shieldimg = new Image, shieldimg.src = "shield.png", fireimg = new Image, fireimg.src = "fire.png", shipimg = new Image, shipimg.src = "ship01.png", explimg = new Image, explimg.src = "expl222.png", fon = new Image, fon.src = "fon.png", fon.onload = function() {
    alert("Разбомби астероиды, защити землю и не погибни. \nПравила просты: \n1.Уничтожил астероид: +1 очко, пропустил: -5 очков; \n2. Щит защитит от одного столкновения, второе столкновение фатально. \nИгра закончится, когда набёрешь... ммм, сколько-то очков. Играй:3\n\nP.S. Не запрещай всплывающие окна, а иначе как я мне с тобой общаться?"), init(), game()
};
var requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(i) {
    window.setTimeout(i, 50)
};

function init() {
    canvas.addEventListener("mousemove", function(i) {
        ship.x = i.offsetX - 25, ship.y = i.offsetY - 13
    }), boom = 1, fsc = (ship = {
        x: 300,
        y: 300,
        animx: sc = Timer = 0,
        animy: 0
    }).x
}

function game() {
    update(), render(), -1 < boom && sc < fsc && -15 < sc ? requestAnimFrame(game) : stop()
}

function update() {
    for (i in ++Timer % 10 == 0 && aster.push({
            angle: 0,
            dxangle: .2 * Math.random() - .1,
            del: 0,
            x: 550 * Math.random(),
            y: -50,
            dx: 2 * Math.random() - 1,
            dy: 2 * Math.random() + 2
        }), Timer % 30 == 0 && (fire.push({
            x: ship.x + 10,
            y: ship.y,
            dx: 0,
            dy: -5.2
        }), fire.push({
            x: ship.x + 10,
            y: ship.y,
            dx: .5,
            dy: -5
        }), fire.push({
            x: ship.x + 10,
            y: ship.y,
            dx: -.5,
            dy: -5
        })), aster) {
        for (j in aster[i].x = aster[i].x + aster[i].dx, aster[i].y = aster[i].y + aster[i].dy, aster[i].angle = aster[i].angle + aster[i].dxangle, (aster[i].x <= 0 || 550 <= aster[i].x) && (aster[i].dx = -aster[i].dx), 650 <= aster[i].y && (sc -= 5, aster.splice(i, 1)), Math.abs(aster[i].x + 25 - ship.x - 15) < 50 && Math.abs(aster[i].y - ship.y) < 25 && (boom--, expl.push({
                x: ship.x - 25,
                y: ship.y - 25,
                animx: 0,
                animy: 0
            }), aster.splice(i, 1)), fire)
            if (Math.abs(aster[i].x + 25 - fire[j].x - 15) < 50 && Math.abs(aster[i].y - fire[j].y) < 25) {
                expl.push({
                    x: aster[i].x - 25,
                    y: aster[i].y - 25,
                    animx: 0,
                    animy: 0
                }), sc++, aster[i].del = 1, fire.splice(j, 1);
                break
            }
        1 == aster[i].del && aster.splice(i, 1)
    }
    for (i in fire) fire[i].x = fire[i].x + fire[i].dx, fire[i].y = fire[i].y + fire[i].dy, fire[i].y < -30 && fire.splice(i, 1);
    for (i in expl) expl[i].animx = expl[i].animx + .5, 7 < expl[i].animx && (expl[i].animy++, expl[i].animx = 0), 7 < expl[i].animy && expl.splice(i, 1);
    ship.animx = ship.animx + 1, 4 < ship.animx && (ship.animy++, ship.animx = 0), 3 < ship.animy && (ship.animx = 0, ship.animy = 0)
}

function stop() {
    fsc < sc ? alert("Приветсвую.\nУ меня есть, что рассказать тебе... \nЯ начал повторяться, чёрт.\nВся инфа тут: @gmail.com") : (sc <= -15 ? alert("Мдэээ, слишком много астеридов ты пропустил. Планета погибла. Ну спасибо.") : alert("ТЫ ВЗОРВАЛСЯ. Обидненько, конечно, но может сначала попробуем?"), window.location.reload())
}

function render() {
    for (i in context.clearRect(0, 0, 600, 600), context.drawImage(fon, 0, 0, 600, 600), context.fillStyle = "white", context.font = "20pt sans-serif", context.textAlign = "left", context.fillText("Cчёт: " + sc, 15, 30, 120), boom < 1 && (context.fillStyle = "red", context.fillText("Щит потерян!", 15, 60, 140)), fire) context.drawImage(fireimg, fire[i].x, fire[i].y, 30, 30);
    for (i in context.drawImage(shipimg, ship.x, ship.y), 1 <= boom && context.drawImage(shieldimg, 192 * Math.floor(ship.animx), 192 * Math.floor(ship.animy), 192, 192, ship.x - 25, ship.y - 25, 100, 100), aster) context.save(), context.translate(aster[i].x + 25, aster[i].y + 25), context.rotate(aster[i].angle), context.drawImage(asterimg, -25, -25, 50, 50), context.restore(), context.beginPath();
    for (i in expl) context.drawImage(explimg, 128 * Math.floor(expl[i].animx), 128 * Math.floor(expl[i].animy), 128, 128, expl[i].x, expl[i].y, 100, 100)
}
