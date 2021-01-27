


export class Slider {
    constructor(speed, pos, color) {
        this.speed = speed;
        this.pos = pos;
        this.element = document.createElement("div");
        this.element.classList.add("mainblock");
        this.width = 15;
        this.element.style.backgroundColor = color;
    }
    drawSlider(host) {
        host.appendChild(this.element);
    }
    moveSlider(distance) {
        if ((this.pos - 1 <= 8000 / document.querySelector("#rest").offsetWidth && distance < 0)
            || (this.pos + 1 >= (document.querySelector("#rest").offsetWidth - this.element.offsetWidth) / document.querySelector("#rest").offsetWidth * 100 && distance > 0))
            return;
        this.speed = distance;
        this.pos += distance;
        this.element.style.left = this.pos + '%';
    }
    moveSliderMobile(distance) {
        if ((this.pos - 1 <= 8000 / document.querySelector("#rest").offsetHeight && distance < 0)
            || (this.pos + 1 >= (document.querySelector("#rest").offsetHeight - this.element.offsetHeight) / document.querySelector("#rest").offsetHright * 100 && distance > 0))
            return;
        this.speed += distance;
        this.pos += distance;
        this.element.style.top = this.pos + '%';
    }
    resetPosition() {
        this.pos = 42.5;
        this.element.style.left = this.pos + "%";
    }
    nextLevel() {
        this.width -= 1;
        this.element.style.width = this.width - 1 + "%";
        this.resetPosition();
    }

    resetSpeed() {
        this.speed = 0;
    }
}