import { Blocks } from "./blocks.js"
import { Ball } from "./ball.js"
import { Slider } from "./slider.js"
import { User } from "./user.js"

fetch("https://127.0.0.1:5001/Blocks/PreuzmiUsera/Guest").then(
    p => {
        p.json().then(data => {
            console.log(data);
        })
    }
).catch(p => alert(p));

var paused = true;
var slider = new Slider(0, 42.5, "#ffffff");
var cont = new Blocks();
var lopta = new Ball(49.5, 75, 1, 1, 0, 0.2);
var user = new User("Guest", "123", 0);
const body = document.querySelector("body");
const meni = document.querySelector(".meni");
const game = document.querySelector("#rest");
const container = document.createElement("div");
const hsbar = document.createElement("div");
const lista = document.createElement("div");
const score = document.createElement("div");
const hsc = document.createElement("div");
lista.classList.add("Lista");
lista.classList.add("invisible");
container.classList.add("container");
hsbar.classList.add("highscorebar");
score.classList.add("score");
hsc.classList.add("score");
meni.appendChild(lista);
body.appendChild(game);
game.appendChild(hsbar);
game.appendChild(container);
hsbar.appendChild(hsc);
hsbar.appendChild(score);
cont.dodajBlock(30, container);
slider.drawSlider(game);
lopta.draw(game);
window.setInterval(function () { slider.resetSpeed(); }, 150);
window.setInterval(tick, 1);




function tick() {
    if (paused === false) {
        var test = lopta.moveBall(slider, cont, user);
        if (test === true) {
            gameOver();
        }
        else if (test === false) {
            newGame();
        }
        updatePoints();
    }
}
document.addEventListener('keydown', logKey);
function logKey(pressedKey) {
    switch (pressedKey.which) {
        case 37:
            if (paused === false) {
                slider.moveSlider(-1.3);
            }
            break;
        case 39:
            if (paused === false) {
                slider.moveSlider(1.3);
            }
            break;
        case 32:
            if (paused === true)
                unpause();
            else
                pause();
            break;
        case 192:
            if (!meni.classList.contains("clicked"))
                meniClick();
            else
                zatvoriMeni();
            pressedKey.preventDefault();
            break;

    }
}









////EventListener-i





const menibar = document.querySelector("#menicont");
menibar.addEventListener("click", meniClick);
const pausebar = document.querySelector("#pause");
pausebar.addEventListener("click", function () {
    if (!paused)
        pause();
    else
        unpause();
});
document.querySelector(".sign").addEventListener("click", function () {
    if (!document.querySelector(".form").classList.contains("formClicked")) {
        lista.classList.add("invisible");
        formClose(".formtwo", ".sub2", ".usrout", ".pswout");
        formClose(".formthree", ".sub3", ".usrout", ".pswout");
        formOpen(".form", ".sub1");
    }
    else {
        formClose(".form", ".sub1", ".usrin", ".pswin");
    }
});
document.querySelector(".register").addEventListener("click", function () {
    if (!document.querySelector(".formtwo").classList.contains("formClicked")) {
        lista.classList.add("invisible");
        formClose(".form", ".sub1", ".usrin", ".pswin");
        formClose(".formthree", ".sub3", ".usrin", ".pswin");
        formOpen(".formtwo", ".sub2");
    }
    else {
        formClose(".formtwo", ".sub2", ".usrout", ".pswout");
    }
});
document.querySelector(".delete").addEventListener("click", function () {
    if (!document.querySelector(".formthree").classList.contains("formClicked")) {
        lista.classList.add("invisible");
        formClose(".form", ".sub1", ".usrin", ".pswin");
        formClose(".formtwo", ".sub2", ".usrout", ".pswout");
        formOpen(".formthree", ".sub3");
    }
    else {
        document.querySelector(".formthree").classList.remove("formClicked");
        document.querySelector(".sub3").classList.add("sub");
    }
});
function formClose(arg1, arg2, arg3, arg4) {
    document.querySelector(arg1).classList.remove("formClicked");
    document.querySelector(arg2).classList.add("sub");
    document.querySelector(arg3).value = "";
    document.querySelector(arg4).value = "";
}
function formOpen(arg1, arg2) {
    document.querySelector(arg1).classList.add("formClicked");
    document.querySelector(arg2).classList.remove("sub");
}
document.querySelector(".RangLista").addEventListener("click", function () {
    getList();
    if (lista.classList.contains("invisible")) {
        document.querySelector(".formthree").classList.remove("formClicked");
        formClose(".formtwo", ".sub2", ".usrout", ".pswout");
        formClose(".form", ".sub1", ".usrin", ".pswin");
        formClose(".formthree", ".sub3", ".usrout", ".pswout");
        lista.classList.remove("invisible");
    }
    else
        lista.classList.add("invisible");
});
const addbar = document.querySelector("#create");
addbar.clicked = false;
addbar.addEventListener("click", function () {
    if (addbar.clicked === false) {
        getPattern();
        zatvoriMeni();
        pause();
    }
    else {
        lopta.resetPosition();
        slider.resetPosition();
        addBlocks();
    }
    //lopta.element.style.display="inherit";
});
function meniClick() {
    if (!meni.classList.contains("clicked")) {
        otvoriMeni();
        pause();
    }
    else {
        zatvoriMeni();
    }
}


//

function otvoriMeni() {
    meni.classList.add("clicked");
    document.querySelector(".prvi").classList.add("bar1");
    document.querySelector(".drugi").classList.add("bar2");
    document.querySelector(".treci").classList.add("bar3");
    document.querySelectorAll(".button").forEach(el => el.classList.add("buttonClicked"));
}
function zatvoriMeni() {
    lista.classList.add("invisible");
    document.querySelector(".prvi").classList.remove("bar1");
    document.querySelector(".drugi").classList.remove("bar2");
    document.querySelector(".treci").classList.remove("bar3");
    meni.classList.remove("clicked");
    formClose(".form", ".sub1", ".usrin", ".pswin");
    formClose(".formtwo", ".sub2", ".usrout", ".pswout");
    formClose(".formthree", ".sub3", ".usrout", ".pswout");
    document.querySelector(".formthree").classList.remove("formClicked");
    document.querySelectorAll(".button").forEach(el => el.classList.remove("buttonClicked"));
}
function pause() {
    paused = true;
    document.querySelector(".prvip").classList.add("bar1p");
    document.querySelector(".drugip").classList.add("bar2p");
    document.querySelector(".trecip").classList.add("bar3p");
}
function unpause() {
    paused = false;
    document.querySelector(".prvip").classList.remove("bar1p");
    document.querySelector(".drugip").classList.remove("bar2p");
    document.querySelector(".trecip").classList.remove("bar3p");
}
function addBlocks() {
    addbar.clicked = false;
    cont.blocks.forEach(el => {
        el.classList.remove("picks");
        if (el.clicked != true)
            el.classList.add("filler");
    });
    lopta.element.style.display = "inherit";
}
function getPattern() {
    addbar.clicked = true;
    lopta.element.style.display = "none";
    cont.dodajBlock(60, container);
    cont.dodajEvent();
    cont.blocks.forEach(el => { el.classList.add("picks"); });
}
function updatePoints() {
    score.innerHTML = "Score: " + lopta.points;
    if (user.highScore < lopta.points) {
        user.updatePoints(hsc, lopta.points);
        setTimeout(getList, 1000);
    }
}

function gameOver() {
    resetGame();
    slider.resetPosition();
}
function resetGame() {
    pause();
    lopta.resetPosition();
    cont.resetBlocks();
}
function newGame() {
    resetGame();
}


slider.element.addEventListener("touchstart", handleStart, false);
slider.element.addEventListener("touchend", handleEnd, false);
slider.element.addEventListener("touchcancel", handleCancel, false);
slider.element.addEventListener("touchmove", handleMove, false);
function handleStart(event) {
    event.preventDefault();
    slider.oldY = event.touches[0].screenY;
}
function handleEnd() {
    slider.resetSpeed();
}
function handleCancel() {
    slider.resetSpeed();
}
function handleMove(event) {
    event.preventDefault();
    if (event.touches[0].screenY > slider.element.oldY) {
        findPosition(1, event);
    }
    else {
        findPosition(-1, event);
    }
}
function findPosition(sign, event) {

    while (sign * slider.element.oldY < sign * event.touches[0].screenY) {
        slider.moveSliderMobile(0.1 * sign);
        slider.element.oldY = slider.element.oldY + sign * 0.001 * document.querySelector("#rest").offsetHeight;
    }
}

















/////Komunikacija sa bazom




//setInterval(getList, 5000);
function getList() {
    lista.querySelectorAll('*').forEach(el => el.remove());
    fetch("https://127.0.0.1:5001/Blocks/PreuzmiUsere").then(p => {
        p.json().then(data => {
            sort(data);
            data.forEach(user => {
                const user1 = new User(user.username, user.password, user.hs);
                user1.rank(lista);
            });
        });
    });
}
function sort(data) {
    for (let i = 0; i < data.length - 1; i++)
        for (let j = i + 1; j < data.length; j++)
            if (parseInt(data[i].hs) < parseInt(data[j].hs)) {
                let tmp = data[i];
                data[i] = data[j];
                data[j] = tmp;
            }
}

document.querySelector(".sub1").addEventListener("click", authenticate);
function authenticate() {
    let username = document.querySelector(".usrin").value;
    let password = document.querySelector(".pswin").value;
    if (username == null || password == null)
        return;
    fetch("https://127.0.0.1:5001/Blocks/PreuzmiUsera/" + username).then(
        p => {

            if (p.status === 204) {
                alert("Ne postoji user.");
                return;
            }
            p.json().then(data => {
                if (p.ok && data.password === password) {
                    alert("Prijavljeni ste kao: " + username);
                    user = new User(username, password, data.hs);
                    fetchLopta(username);
                    fetchSlider(username);
                    hsc.innerHTML = "HighScore: " + user.highScore;
                    formClose(".form", ".sub1", ".usrin", ".pswin");
                    resetGame();
                    return true;
                }
                else if (!p.ok)
                    alert("greska");
                else if (data.password != password)
                    alert("Netacna lozinka.");
            })
        }
    );
}
function fetchLopta(username) {
    fetch("https://127.0.0.1:5001/Blocks/PreuzmiLoptu/" + username).then(
        p => {
            if (p.status === 204) {
                alert("Ne postoji user.");
                return;
            }
            p.json().then(data => {
                if (p.ok) {
                    lopta.element.remove();
                    lopta = new Ball(49.5, 75, 1, 1, 0, data.speed);
                    lopta.draw(game);
                    return true;
                }
                else (!p.ok)
                alert("greska");
            })
        }
    );
}
function fetchSlider(username) {
    fetch("https://127.0.0.1:5001/Blocks/PreuzmiSlidera/" + username).then(
        p => {
            if (p.status === 204) {
                alert("Ne postoji user.");
                return;
            }
            p.json().then(data => {
                if (p.ok) {
                    slider.element.remove();
                    slider = new Slider(0, 42.5, data.color);
                    slider.drawSlider(game);
                    return true;
                }
                else (!p.ok)
                alert("greska");
            })
        }
    );
}
document.querySelector(".sub2").addEventListener("click", post);
function post() {
    let usr = document.querySelector(".usrout").value;
    let pass = document.querySelector(".pswout").value;
    let sliderColor = document.querySelector(".sliderColor").value;
    let loptaSpeed = document.querySelector(".slider").value / 100;

    console.log(JSON.stringify({
        username: usr,
        password: pass,
        hs: 0,
        lopta: {
            user: usr,
            speed: loptaSpeed
        },
        slider: {
            user: usr,
            color: sliderColor
        }
    }));
    fetch("https://127.0.0.1:5001/Blocks/UpisiUsera/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: usr,
            password: pass,
            hs: 0,
            lopta: {
                user: usr,
                speed: loptaSpeed
            },
            slider: {
                user: usr,
                color: sliderColor
            },
        })
    }).then(p => {
        if (handlePostError(p) === true) {
            document.querySelector(".usrin").value = usr;
            document.querySelector(".pswin").value = pass;
            authenticate();
            formClose(".formtwo", ".sub2", ".usrout", ".pswout");
            alert("upisan");
        }
    }).catch(p => {
        alert("Greška prilikom upisa.");
    });
}
function handlePostError(p) {
    if (p.status == 400) {
        alert("Greska neka");
    }
    else if (p.status == 455) {
        alert("Unesite username i password.");
    }
    else if (p.status == 456) {
        alert("Username zauzet.");
    }
    else if (!p.ok) {
        alert("Greška prilikom upisa.");
    }
    else
        return true;
}

document.querySelector(".sub3").addEventListener("click", deleteUser);
function deleteUser() {
    if (user.username === "Guest") {
        alert("Guest se ne moze obrisati.");
        return;
    }
    fetch("https://127.0.0.1:5001/Blocks/IzbrisiUsera/" + user.username, {
        method: "DELETE",
        headers: {
            'Content-type': 'application/json'
        },
    }).then(
        p => {

            if (p.ok) {
                alert("User " + user.username + " obrisan.");
                document.querySelector(".usrin").value = "Guest";
                document.querySelector(".pswin").value = "123";
                authenticate();
                return true;
            }
            else if (p.status === 204) {
                alert("Ne postoji user.");
                return;
            }

            else
                alert("greska");
        })
}





















































































function deleteLopta() {
    fetch("https://127.0.0.1:5001/Blocks/IzbrisiLoptu/" + user.username, {
        method: "DELETE",
        headers: {
            'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
        },
    }).then(
        p => {
            if (p.ok) {
                alert("Slider usera " + user.username + " obrisana.");
                return true;
            }
            if (p.status === 204) {
                alert("Ne postoji user.");
                return;
            }
            else
                alert("greska");
        })
}
function deleteSlider() {
    fetch("https://127.0.0.1:5001/Blocks/IzbrisiSlidera/" + user.username, {
        method: "DELETE",
        headers: {
            'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
        },
    }).then(
        p => {
            if (p.ok) {
                alert("Slider usera " + user.username + " obrisana.");
                return true;
            }
            if (p.status === 204) {
                alert("Ne postoji user.");
                return;
            }
            else
                alert("greska");
        })
}


function postSlider(usr, sliderColor) {
    console.log(JSON.stringify({
        user: usr,
        color: sliderColor
    }));
    fetch("https://127.0.0.1:5001/Blocks/UpisiSlidera/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user: usr,
            color: sliderColor
        })
    }).then(p => handlePostError(p)).catch(p => {
        alert("Greška prilikom upisa.");
    });
}
function postLopta(usr, loptaSpeed) {
    console.log(JSON.stringify({
        user: usr,
        speed: loptaSpeed
    }));
    fetch("https://127.0.0.1:5001/Blocks/UpisiLoptu/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user: usr,
            speed: loptaSpeed
        })
    }).then(p => { handlePostError(p); }).catch(p => {
        alert("Greška prilikom upisa.");
    });
}