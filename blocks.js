
export class Blocks {
    constructor() {
        this.blocks = [];
    }
    drawBlocks(host) {
        this.blocks.forEach(element => {
            host.appendChild(element);
        })
    }
    dodajBlock(broj, host) {
        this.blocks = [];
        host.querySelectorAll('*').forEach(el => el.remove());
        for (let i = 0; i < broj; i++) {
            this.blocks.push(document.createElement("div"));
            this.blocks[this.blocks.length - 1].classList.add("blocks");
        }
        this.drawBlocks(host);
    }
    color(col) {
        this.blocks.forEach(el => {
            el.style.backgroundColor = col;
        });
    }
    dodajEvent() {
        this.blocks.forEach(el => {
            el.addEventListener("click", function () {
                this.clicked = true;
                this.classList.remove("picks");
            })
        })
    }
    resetBlocks() {
        this.blocks.forEach(el => {
            el.classList.remove("invisible");
        });
    }
    keepPicked() {
        this.blocks.forEach(el => {
            if (el.clicked != true) {
                el.remove();
            }
        })
    }
    checkBlocks() {
        if (this.blocks.filter(el => !el.classList.contains("invisible") && !el.classList.contains("filler")).length > 0)
            return true;
        return false;
    }
}