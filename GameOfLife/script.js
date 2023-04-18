
        let side = 27


        function setup() {
           
                createCanvas(23 * side, matrix.length * side)
               

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

