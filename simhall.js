        function Gubbe(){
            
            this.x = 350;
            this.y = 600;
            this.VX = 0;
            this.VY = 0;
            this.img = document.getElementById("gubbeIMG");
            
        }

        // Variablerna för bilderna samt gubbens positioner
        var doorX1 = 70,
            doorX2 = 130,
            door3 = "True",
            ctx, 
            c,
            img,
            g;
        
        // Variablerna för våra frågor och svar
        var fraga = document.getElementById("fraga"),
            svar1 = document.getElementById("svar1"),
            svar2 = document.getElementById("svar2"),
            svar3 = document.getElementById("svar3");

        function start() {
            
            // Kör gameloopen och laddar bilderna
            g = new Gubbe(); 
            c = document.getElementById("c");
            ctx = c.getContext("2d");
            window.setInterval(gameLoop, 20);
        }

        function gameLoop() {
            
            // Gameloopen som kallar på de andra funktionerna
            ctx.clearRect(0, 0, 700, 700);
            paintSimhall();
            paintGubbe();
            edgeCheck();
            doorCheck();
        }

        function paintSimhall() {
            
            // Målar ut simhallen på canvaset
            ctx.drawImage(simhallIMG, 0, 0, 700, 700);
        }

        function paintGubbe() {
            
            // Målar gubben Kenny
            ctx.drawImage(g.img, g.x, g.y, 70, 70);

            g.x = g.x + g.VX;
            g.y = g.y + g.VY;
        }

        function keyDown(ev) {

            // Upp
            if (ev.keyCode === 38) {

                g.VY = -2;
            }
            // Ner
            if (ev.keyCode === 40) {

                g.VY = 2;
            }
            // Höger
            if (ev.keyCode === 39) {

                g.VX = 2;
            }
            // Vänster
            if (ev.keyCode === 37) {

                g.VX = -2;
            }
        }

        function keyUp(ev) {

            // Upp
            if (ev.keyCode === 38) {

                g.VY = 0;
            }
            // Ner
            if (ev.keyCode === 40) {

                g.VY = 0;
            }
            // Höger
            if (ev.keyCode === 39) {

                g.VX = 0;
            }
            // Vänster
            if (ev.keyCode === 37) {

                g.VX = 0;
            }
        } 
        
        // Collision detection 
        function edgeCheck(){
            
            // Y-led nedre delen
            if (g.y > 620){
                
                g.y = 620
            }
            // Y-led öven delen
            if (g.y < 290) {
                
                g.y = 290
            }
            // X-led vänstra delen
            if (g.x < 10) {
                
                g.x = 10
            }
            // X-led hägra delen
            if (g.x > 620) {
                
                g.x = 620
            }
        }
        
        
        
        function doorCheck(){
            
            // Kollar ifall man har hittat rätt dörr
            
            // Kollar ifall man har rätt svar på fråga 1
            if (g.x > doorX1 && g.x < doorX2 && g.y === 290 && door3 === "True"){
                
                
                g.y = 600;
                doorX1 = 300;
                doorX2 = 360;
                door3 = "False";
                
                
                document.getElementById("fraga").innerHTML = "Vad händer ifall kloret reagerar med bakterierna";
                document.getElementById("svar1").innerHTML = "1. Det bildas smutsiga saker i luften";
                document.getElementById("svar2").innerHTML = "2. Det bildas en sorts gas i luften ";
                document.getElementById("svar3").innerHTML = "3. Det blir smutsigt på golven";
                
                // Kollar ifall man har rätt svar på svar 2
            } else if(g.x > doorX1 && g.x < doorX2 && g.y === 290 && door3 === "False"){
                    
                    g.y = 600;
                    doorX1 = 70;
                    doorX2 = 130;
                    door3 = "Ost";
                    document.getElementById("fraga").innerHTML = "Vilken åldersgrupp är sämst på att duscha?";
                    document.getElementById("svar1").innerHTML = "1. 30 år och uppåt";
                    document.getElementById("svar2").innerHTML = "2. Tånåringar, 13-19";
                    document.getElementById("svar3").innerHTML = "3. Barn, 3-13 ";
                    
                }
        }