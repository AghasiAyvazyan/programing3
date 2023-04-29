        var socket=io()
        side = 27


        function setup() {
           
                createCanvas(24 * side, 24 * side)
               

        }

        socket.on("Winter", function (data) {
                weath = data;
            })
            socket.on("Summer", function (data) {
                weath = data;
            })
            socket.on("Spring", function (data) {
                weath = data;
            })
            socket.on("Autumn", function (data) {
                weath = data;
            })
             var weath = "spring";

        function changeColor(matrix) {
                for (let y = 0; y < matrix.length; y++) {
                        for (let x = 0; x < matrix[y].length; x++) {
                                 var toBot = side - side * 0.3
                                 textSize(toBot);
                                if (matrix[y][x] == 1) {
                                        if(weath == "summer"){
                                        fill("darkgreen")
                                        }
                                        else if(weath == "autumn"){
                                                fill("orange")
                                        }
                                        else if (weath == "winter"){
                                                fill("white")
                                        }
                                        else if (weath == "spring"){
                                                fill("lightgreen")
                                        }
                                
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
                                else if (weath == "winter"){
                                        fill("white")
                                        rect(x * side, y * side, side, side)
                                }
                                else if (weath == "summer"){
                                        fill("darkgreen")
                                        rect(x * side, y * side, side, side)
                                }
                                else if (weath =="spring"){
                                        fill("green")
                                        rect(x * side, y * side, side, side)
                                }
                                else if(weath=="autumn"){
                                        fill("darkorange")
                                        rect(x * side, y * side, side, side)
                                }
                                      

                        }
                }



   
        }
        
        
        socket.on("send matrix",changeColor)


        function Winter() {
            socket.emit("winter");
        }
        function Summer() {
            socket.emit("summer");
        }
        function Spring() {
            socket.emit("spring");
        }
        function Autumn() {
            socket.emit("autumn");
        }
        function AddGrass(){
            socket.emit("addGrass");
        }
        function AddGrassEater(){
            socket.emit("addGrassEater");
        }
        function KillAll(){
            socket.emit("killAll");
        }
        function AddPredator(){
            socket.emit("addPredator");
        }
        function AddWall(){
            socket.emit("addWall");
        }
        function AddCat(){
            socket.emit("addCat");
        }
        function AddMouse(){
            socket.emit("addMouse");
        
        }