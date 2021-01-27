import { Slider } from "./slider.js";


export class Ball {
    constructor(leftPos, topPos, dirTop, dirLeft, leftSpeed, topSpeed) {
        this.startLeft = leftPos;
        this.startTop = topPos;
        this.startSpeed = topSpeed;
        this.leftPos = leftPos;
        this.topPos = topPos;
        this.leftSpeed = leftSpeed;
        this.topSpeed = topSpeed;
        this.dirLeft = dirLeft;
        this.dirTop = dirTop;
        this.element = document.createElement("div");
        this.element.classList.add("lopta");
        this.points = 0;
        this.element.style.top = this.topPos + "%";
        this.element.style.left = this.leftPos + "%";
    }
    draw(host) {
        host.appendChild(this.element);
    }
    moveBall(slider, blocks, user) {
        this.topPos += this.dirTop * this.topSpeed;
        this.leftPos += this.dirLeft * this.leftSpeed;
        this.element.style.top = this.topPos + "%";
        this.element.style.left = this.leftPos + "%";
        if (this.checkWindow())
            return true;
        if (this.checkOverlapEl(blocks, user)) {
            return false;
        }
        this.checkOverlapSlider(slider);
    }
    checkWindow() {
        if (this.leftPos <= 8000 / document.querySelector("#rest").offsetWidth
            || this.leftPos >= (document.querySelector("#rest").offsetWidth - this.element.offsetWidth) / document.querySelector("#rest").offsetWidth * 100)
            this.dirLeft *= -1;
        else if (this.topPos >= 94 || this.topPos <= 5) {
            this.dirTop *= -1;
            if (this.topPos >= 94)
                return true;
        }
    }
    checkOverlapEl(ar, user) {
        var rect1 = this.element.getBoundingClientRect();
        let test = false;
        ar.blocks.forEach(el => {
            if (test === false && !el.classList.contains("invisible") && !el.classList.contains("filler")) {
                const rect2 = el.getBoundingClientRect();
                if (!(rect1.right < rect2.left ||
                    rect1.left > rect2.right ||
                    rect1.bottom < rect2.top ||
                    rect1.top > rect2.bottom)) {
                    if (!(rect1.top + document.getElementById("rest").offsetHeight * 6 / 1000 > rect2.bottom ||
                        rect1.bottom - document.getElementById("rest").offsetHeight * 6 / 1000 < rect2.top))
                        this.dirLeft *= -1;
                    else
                        this.dirTop *= -1;
                    el.classList.add("invisible");
                    this.points += 50;
                    test = true;
                }
            }
        }
        )
        if (!ar.checkBlocks()) {
            return true;
        }
    }
    checkOverlapSlider(slider) {
        var rect1 = this.element.getBoundingClientRect();
        let rect2 = slider.element.getBoundingClientRect();
        if (!(
            rect1.top > rect2.bottom ||
            rect1.right < rect2.left ||
            rect1.bottom < rect2.top ||
            rect1.left > rect2.right
        )) {
            if (!(rect1.top + document.getElementById("rest").offsetHeight * 6 / 1000 > rect2.bottom ||
                rect1.bottom - document.getElementById("rest").offsetHeight * 6 / 1000 < rect2.top)) {
                this.dirLeft *= -1;
            }
            else {
                this.dirTop *= -1;
            }
            if (slider.speed != 0)
                this.leftSpeed += this.dirLeft * slider.speed * 1 / 25;
        }
    }
    resetPosition() {
        this.dirTop = -1;
        this.points = 0;
        this.leftPos = this.startLeft;
        this.topPos = this.startTop;
        this.leftSpeed = 0;
        this.topSpeed = this.startSpeed;
        this.element.style.top = this.topPos + "%";
        this.element.style.left = this.leftPos + "%";
    }
}