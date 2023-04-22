var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs")

app.use(express.static("."))

app.get("/", function (req, res) {
        res.redirect("index.html")

}
)
server.listen(3000, function () {
        console.log("server is run");
})

/// matrix generator

function matrixGenerator(matrixSize, grass, grassEater, predator, cat, mouse) {
        var matrix = []
        ////  matrix սարքելու հատված
        for (let i = 0; i < matrixSize; i++) {
                matrix.push([])
                for (let j = 0; j < matrixSize; j++) {
                        matrix[i].push(0)
                }
        }

        // 1 -եր այսինքն խոտեր քցելու հատված մատռիքսում
        for (let i = 0; i < grass; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 1
        }
        //GrassEater 2

        for (let i = 0; i < grassEater; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 2
        }
        //3 predator


        for (let i = 0; i < predator; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 3
        }
        for (let y = 0; y < matrix.length; y++) {
                for (let x = 0; x < matrix[y].length; x++) {
                        if (x == 0 && y % 2 == 0) {
                                matrix[y][x] = 4
                        }
                }
        }
        for (let i = 0; i < cat; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 5
        }
        for (let i = 0; i < mouse; i++) {
                let x = Math.floor(Math.random() * matrixSize)
                let y = Math.floor(Math.random() * matrixSize)
                matrix[y][x] = 6
        }
        return matrix

}
matrix = matrixGenerator(23, 17, 7, 4, 1, 4)

io.sockets.emit("send matrix", matrix)
/// array
grassArr = []
grassEaterArr = []
predatorArr = []
wallArr = []
catArr = []
mouseArr = []

///moduls
Grass = require("./grass")
GrassEater = require("./grassEater")
Cat = require("./cat")
Predator = require("./predator")
Wall = require("./wall")
Mouse = require("./mouse")


function createobject() {
        for (let y = 0; y < matrix.length; y++) {
                for (let x = 0; x < matrix[y].length; x++) {
                        if (matrix[y][x] == 1) {
                                let grass = new Grass(x, y)

                                grassArr.push(grass)


                        } else if (matrix[y][x] == 2) {
                                let grEat = new GrassEater(x, y)
                                grassEaterArr.push(grEat)
                        } else if (matrix[y][x] == 3) {
                                let pre = new Predator(x, y)
                                predatorArr.push(pre)
                        } else if (matrix[y][x] == 4) {
                                let wall = new Wall(x, y)
                                wallArr.push(wall)
                        } else if (matrix[y][x] == 5) {
                                let cat = new Cat(x, y)
                                catArr.push(cat)
                        } else if (matrix[y][x] == 6) {
                                let mouse = new Mouse(x, y)
                                mouseArr.push(mouse)
                        }


                }
        }
        io.sockets.emit("send matrix", matrix)
}


function game() {
        for (let i in grassArr) {
                grassArr[i].mul()
        }


        for (let i in grassEaterArr) {
                grassEaterArr[i].eat()
        }



        for (let i in predatorArr) {
                predatorArr[i].eat()
        }

        for (let i in wallArr) {
                wallArr[i].move()
        }
        for (let i in catArr) {
                catArr[i].eat()
        }
        for (let i in mouseArr) {
                mouseArr[i].move()
        }

        io.sockets.emit("send matrix", matrix)

}
setInterval(game, 300)

io.on("connection",function(){
        createobject()

})