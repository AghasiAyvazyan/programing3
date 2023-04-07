function matrixGenerator(matrixSize, grass, grassEater, predator,cat,mouse) {
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

        let matrix = matrixGenerator(23, 17, 7, 4,1,4)
        let side = 27
        ///օբյեկտներ պահելու զանգվածներ
        var grassArr = []
        var grassEaterArr = []
        var predatorArr = []
        var wallArr = []
        var catArr = []
        var mouseArr = []

        function setup() {
                frameRate(9)
                createCanvas(matrix[0].length * side, matrix.length * side)
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
                                }else if (matrix[y][x] == 5) {
                                        let cat = new Cat(x, y)
                                        catArr.push(cat)
                                }else if (matrix[y][x] == 6) {
                                        let mouse = new Mouse(x, y)
                                        mouseArr.push(mouse)
                                }


                        }
                }

        }


        function draw() {
                for (let y = 0; y < matrix.length; y++) {
                        for (let x = 0; x < matrix[y].length; x++) {
                                 var toBot = side - side * 0.3
                                 textSize(toBot);
                                if (matrix[y][x] == 1) {
                                        fill("green")
                                        rect(x * side, y * side, side, side)
                                        text('🍀', x * side, y * side + toBot);
                                } else if (matrix[y][x] == 2) {
                                        fill("yellow")
                                        rect(x * side, y * side, side, side)
                                        text('🐮', x * side, y * side + toBot);
                                } else if (matrix[y][x] == 3) {
                                        fill("red")
                                        rect(x * side, y * side, side, side)
                                        text('🐯', x * side, y * side + toBot);
                                } else if (matrix[y][x] == 4) {
                                        fill("black")
                                        rect(x * side, y * side, side, side)
                       }else if (matrix[y][x] == 5) {
                                        fill("darkgray")
                                        rect(x * side, y * side, side, side)
                                        text('🐈', x * side, y * side + toBot);
                                }else if (matrix[y][x] == 6) {
                                        fill("darkgray")
                                        rect(x * side, y * side, side, side)
                                        text('🐭', x * side, y * side + toBot);
                                }
                                else {
                                        fill("grey")
                                        rect(x * side, y * side, side, side)
                                }
                                      

                        }
                }



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



        }

