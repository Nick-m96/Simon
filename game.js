const btnEmpezar = document.getElementById('btnEmpezar')

const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')

class Juego {
    constructor() {
        this.colors = {
            celeste,
            violeta,
            naranja,
            verde
        }
        this.init()
    }
    
    init() {
        btnEmpezar.classList.add('hide')
        this.pickColor = this.pickColor.bind(this)
        this.level = 0
        this.sublevel = 0
        this.secuencia = new Array(10).fill(0).map(n => Math.floor(Math.random() * 4))
        this.nextLevel()
    }

    addEvents() {
        this.colors.celeste.addEventListener("click", this.pickColor)
        this.colors.violeta.addEventListener("click", this.pickColor)
        this.colors.naranja.addEventListener("click", this.pickColor)
        this.colors.verde.addEventListener("click", this.pickColor)
    }

    removeEvents() {
        this.colors.celeste.removeEventListener("click", this.pickColor)
        this.colors.violeta.removeEventListener("click", this.pickColor)
        this.colors.naranja.removeEventListener("click", this.pickColor)
        this.colors.verde.removeEventListener("click", this.pickColor)
    }

    pickColor(event) {
        const color = event.target.dataset.color
        const num = this.colorToNum(color)
        this.setLight(color)
        if (this.secuencia[this.sublevel] == num) {
            console.log('Bien Pibe')
            this.sublevel++
            if (this.sublevel == this.level) {
                this.removeEvents()
                if (this.secuencia.length == this.sublevel - 1){
                    console.log('Ganaste')
                } else {
                    this.nextLevel()
                }
            }
        } else {
            this.removeEvents()
            console.log('Fallaste')
            this.restart()
        }
    }

    nextLevel() {
        this.level++
        this.sublevel = 0
        setTimeout(() => this.continue(), 900)
    }

    continue() {
        this.printArray()
        this.addEvents()
    }

    restart() {
        btnEmpezar.classList.remove('hide')
        this.level = 0
    }

    printArray() {
        for(let i = 0; i < this.level; i++) {
            const color = this.numToColor(this.secuencia[i])
            setTimeout(() => this.setLight(color), 900 * i)
        }
    }

    numToColor(num) {
        switch(num) {
            case 0: return "celeste"
            case 1: return "violeta"
            case 2: return "naranja"
            case 3: return "verde"
        } 
    }

    colorToNum(color) {
        switch(color) {
            case "celeste": return 0
            case "violeta": return 1
            case "naranja": return 2
            case "verde": return 3
        } 
    }

    setLight(color) {
        this.colors[color].classList.add('light')
        setTimeout(() => this.removeLight(color), 300)
    }

    removeLight(color) {
       this.colors[color].classList.remove('light')
    }
}

function newGame() {
     window.juego = new Juego()
}