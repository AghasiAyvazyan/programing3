let LivingCreature= require("./LivingCreature")
class Wall extends LivingCreature{
    constructor(x, y) {
       super(x,y)
        this.energy = 15
        this.directions = []
    }


    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x + 1, this.y + 1],
        ];
    }

    chooseCell(char) {
        this.getNewCoordinates()
        let found = []


        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == char) {
                    found.push(this.directions[i])
                }
            }

           
        }


        return found

    }
    move(){
        let emptyCell = this.chooseCell(0)
        let newCell = emptyCell(Math.random() * emptyCell.length)

            if(newCell){
                let newX = newCell[0]
                let newY = newCell[1]

                matrix[newY][newX] = 4
            
                
                this.x = newX
                this.y = newY

                

              
            }
     }



}


