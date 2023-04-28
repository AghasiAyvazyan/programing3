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
matrix = matrixGenerator(18, 17, 7, 4, 1, 4)

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


function createObject() {
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
setInterval(game, 200)

var weath;

function Winter() {
        weath = "winter";
        io.sockets.emit('Winter', weath);
    }
    
    function Summer() {
        weath = "summer";
        io.sockets.emit('Summer', weath);
    }
    
    function Spring() {
        weath = "spring";
        io.sockets.emit('Spring', weath);
    }
    function Autumn() {
        weath = "autumn";
        io.sockets.emit('Autumn', weath);
    }
    function AddGrass() {
        for (var i = 0; i < 7; i++) {
            var x = Math.floor(Math.random() * matrix[0].length)
            var y = Math.floor(Math.random() * matrix.length)
            if (matrix[y][x] == 0) {
                matrix[y][x] = 1;
                var grass = new Grass(x, y);
                grassArr.push(grass)
                
            }
        }
        io.sockets.emit("send matrix", matrix);
    }
    function AddGrassEater() {
        let count = 0;
        for (var i = 0; i < 50; i++) {
            var x = Math.floor(Math.random() * matrix[0].length)
            var y = Math.floor(Math.random() * matrix.length)
            if (count < 7) {
                if (i < 30) {
                    if (matrix[y][x] == 0) {
                        count++;
                        matrix[y][x] = 2;
                        var grEat = new GrassEater(x, y)
                                grassEaterArr.push(grEat)
                    }
    
                } else if (i >= 30) {
                    if (matrix[y][x] == 0 || matrix[y][x] == 1) {
                        count++;
                        matrix[y][x] = 2;
                        var grEat = new GrassEater(x, y)
                        grassEaterArr.push(grEat)
                    }
                }
            }
    
    
        }
    
        io.sockets.emit("send matrix", matrix);
    }
    function AddPredator() {
        for (var i = 0; i < 7; i++) {
            var x = Math.floor(Math.random() * matrix[0].length)
            var y = Math.floor(Math.random() * matrix.length)
            if (matrix[y][x] == 0) {
                matrix[y][x] = 3;
                let pre = new Predator(x, y)
                 predatorArr.push(pre)
            }
        }
        io.sockets.emit("send matrix", matrix);
    }
   
    
//     function AddWall() {
//         for (var i = 0; i < 7; i++) {
//             var x = Math.floor(Math.random() * matrix[0].length)
//             var y = Math.floor(Math.random() * matrix.length)
//             if (matrix[y][x] == 0) {
//                 matrix[y][x] = 4;
//                 let wall = new Wall(x, y)
//                 wallArr.push(wall)
//             }
//         }
//         io.sockets.emit("send matrix", matrix);
//     }
    
    function AddCat() {
        for (var i = 0; i < 7; i++) {
            var x = Math.floor(Math.random() * matrix[0].length)
            var y = Math.floor(Math.random() * matrix.length)
            if (matrix[y][x] == 0) {
                matrix[y][x] = 5;
                let cat = new Cat(x, y)
                catArr.push(cat)
            }
        }
        io.sockets.emit("send matrix", matrix);
    }
    
    function AddMouse() {
        for (var i = 0; i < 7; i++) {
            var x = Math.floor(Math.random() * matrix[0].length)
            var y = Math.floor(Math.random() * matrix.length)
            if (matrix[y][x] == 0) {
                matrix[y][x] = 6;
                let mouse = new Mouse(x, y)
                mouseArr.push(mouse)
            }
        }
        io.sockets.emit("send matrix", matrix);
    }
    function Kill() {
        grassArr = [];
        grassEaterArr = [];
        predatorArr = [];
        catArr = [];
        mouseArr = [];
        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {
                matrix[y][x] = 0;
            }
        }
        io.sockets.emit("send matrix", matrix);
    }
    
    
    io.on('connection', function (socket) {
        createObject();
        socket.on("spring", Spring);
        socket.on("summer", Summer);
        socket.on("autumn", Autumn);
        socket.on("winter", Winter);
        socket.on("addGrass", AddGrass);
        socket.on("addGrassEater", AddGrassEater);
        socket.on("killAll", Kill);
        socket.on("addPredator", AddPredator); 
        socket.on("addCat", AddCat);
        socket.on("addMouse", AddMouse);
    })  
    var statistics = {};
setInterval(function () {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    statistics.predator = predatorArr.length;
    statistics.wall = wallArr.length;
    statistics.cat = catArr.length;
    statistics.mouse = mouseArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
    })
}, 1000);
    