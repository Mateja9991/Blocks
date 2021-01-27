


export class User {
    constructor(username, password, hs) {
        this.username = username;
        this.password = password;
        this.highScore = hs;
    }
    rank(lista) {
        console.log(this);
        const div = document.createElement("div");
        div.innerHTML = this.username + ": " + this.highScore;
        lista.appendChild(div);
    }
    updatePoints(hsc, points) {
        this.highScore = points;
        hsc.innerHTML = "HighScore: " + this.highScore;
        this.updateDataBase();
    }
    updateDataBase() {
        fetch("https://127.0.0.1:5001/Blocks/IzmeniUsera/", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: this.username,
                password: this.password,
                hs: this.highScore,
            })
        }).then(p => {
            if (!p.ok && p.status == 400) {
                alert("Greska neka");
            }
            else if (!p.ok) {
                alert(p);
                alert("Greška prilikom upisa.");
            }
            else {
            }
        }).catch(p => {
            alert(p);
            alert("Greška prilikom upisa.");
        });
    }
}