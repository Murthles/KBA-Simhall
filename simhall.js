        // Klassen som håller i gubben och dess bild
        function Gubbe(){
            
            this.x = 350;
            this.y = 600;
            this.vx = 0;
            this.vy = 0;
            this.img = document.getElementById("gubbeIMG");
        }

        // Klassen som håller i svarsalternativen
        function DoorSvar() {
            
            this.x1 = 70;
            this.x2 = 130;
            this.ans = "Blue";
        }

        // Variablerna för bilderna samt svarsalternativen

            // Canvas och resterande bilder
        var ctx, 
            c,
            
            // g är gubbens klass, d är dörrarnas klass, fs är fråga och svar
            g,
            d,
            fs;
        
        // Klassen för våra frågor och svar
        function FragSvar(fraga,s1,s2,s3) {
            
            this.fraga = fraga;
            this.svar1 = s1;
            this.svar2 = s2;
            this.svar3 = s3;
        }

        // Kör gameloopen, laddar bilderna, svaren och frågorna
        function start() {
            
            // Laddar klasserna
            g = new Gubbe(); 
            d = new DoorSvar();
            fs = [new FragSvar("Varför duschar man innan man hoppar i basängen?", "1. För att bakterierna inte ska reagera med kloret i basängen.", "2. För att vattnet inte ska bli grönt.", "3. För att de inte ska behöva städa."),
                  new FragSvar("Vad händer när kloret i basängen reagerar med bakterierna?", "1. Det bildas smutsiga saker i luften.", "2. Det bildas en sorts gas i luften.", "3. Det blir smutsigt på golven."),
                  new FragSvar("Vilken åldersgrupp är sämst på att duscha innan de hoppar i basängen?", "1. 30 år och uppåt.", "2. Tånåringar, 13 - 19 år.", "3. Barn, 3 - 13 år.")];
            
            // Laddar bilderna och gameloopen
            c = document.getElementById("c");
            ctx = c.getContext("2d");
            window.setInterval(gameLoop, 20);
            
            // Skriver ut fråga1 och respektive svar
            document.getElementById("fraga").innerHTML = fs[0].fraga;
            document.getElementById("svar1").innerHTML = fs[0].svar1;
            document.getElementById("svar2").innerHTML = fs[0].svar2;
            document.getElementById("svar3").innerHTML = fs[0].svar3;
            
        }

        // Gameloopen som kallar på de andra funktionerna
        function gameLoop() {
            
            ctx.clearRect(0, 0, 700, 700);
            paintSimhall();
            paintGubbe();
            edgeCheck();
            doorCheck();
        }

        // Målar ut simhallen på canvaset
        function paintSimhall() {
            
            ctx.drawImage(simhallIMG, 0, 0, 700, 700);
        }

        // Målar gubben 
        function paintGubbe() {
            
            ctx.drawImage(g.img, g.x, g.y, 70, 70);
            
            // Gubbens koordinater när man trycker på Upp-, Ner-, Vänster- och Höger-knapparna
            g.x = g.x + g.vx;
            g.y = g.y + g.vy;
        }
        
        // Hanterar knapptryck för pil-tangenterna
        function keyDown(ev) {

            // Upp
            if (ev.keyCode === 38) {

                g.vy = -2;
            }
            
            // Ner
            if (ev.keyCode === 40) {

                g.vy = 2;
            }
            
            // Höger
            if (ev.keyCode === 39) {

                g.vx = 2;
            }
            
            // Vänster
            if (ev.keyCode === 37) {

                g.vx = -2;
            }
        }
        
        // Hanterar knappuppsläpp för pil-tangenterna
        function keyUp(ev) {

            // Upp
            if (ev.keyCode === 38) {

                g.vy = 0;
            }
            
            // Ner
            if (ev.keyCode === 40) {

                g.vy = 0;
            }
            
            // Höger
            if (ev.keyCode === 39) {

                g.vx = 0;
            }
            
            // Vänster
            if (ev.keyCode === 37) {

                g.vx = 0;
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
        
        // Kollar ifall man har hittat rätt dörr
        function doorCheck(){
            
            // Kollar ifall man har rätt svar på fråga 1
            if (g.x > d.x1 && g.x < d.x2 && g.y === 290 && d.ans === "Blue"){
                
                // Ändrar gubbens Y-koordinat
                g.y = 600;
                
                // Ändrar svarsalternativen 
                d.x1 = 300;
                d.x2 = 360;
                d.ans = "Red";
                
                // Ställer om frågorna och svaren till nästa set av frågor och svar
                document.getElementById("fraga").innerHTML = fs[1].fraga;
                document.getElementById("svar1").innerHTML = fs[1].svar1;
                document.getElementById("svar2").innerHTML = fs[1].svar2;
                document.getElementById("svar3").innerHTML = fs[1].svar3;
                
                // Kollar ifall man har rätt svar på svar 2
            } else if(g.x > d.x1 && g.x < d.x2 && g.y === 290 && d.ans === "Red"){
                    
                    // Ändrar gubbens Y-koordinat
                    g.y = 600;
                
                    // Ändrar svarsalternativen
                    d.x1 = 70;
                    d.x2 = 130;
                    d.ans = "Blue2";
                
                    // Ställer om frågorna och svaren till nästa set av frågor och svar
                
                    document.getElementById("fraga").innerHTML = fs[2].fraga;
                    document.getElementById("svar1").innerHTML = fs[2].svar1;
                    document.getElementById("svar2").innerHTML = fs[2].svar2;
                    document.getElementById("svar3").innerHTML = fs[2].svar3;
                }
        } 