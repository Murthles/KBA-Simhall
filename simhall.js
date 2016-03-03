        // Klassen som håller i gubben och dess bild
        function Gubbe() {
            
            this.x = 350;
            this.y = 600;
            this.vx = 0;
            this.vy = 0;
            this.img = document.getElementById("gubbeIMG");
        }

        // Variablerna för bilderna samt svarsalternativen

            // Canvas och resterande bilder
        var ctx, 
            c,
            // g är gubbens klass, fs är fråga och svar, sound är för ljuden
            s,
            d,
            g,
            fs,
            // variabeln som håller reda på vilken fråga vi är på
            ansCounter = 0,
            pointCounterRight = 0,
            pointCounterWrong = 0;
            
        
        
        // Klassen för våra frågor och svar
        function FragSvar(fraga,s1,s2,s3,rs){
            
            this.fraga = fraga;
            this.svar1 = s1;
            this.svar2 = s2;
            this.svar3 = s3;
            this.rs = rs;
        }
        // Klassen för dörrarna
        function Door(){
            // d1 står för dörr 1, x1 är vänsterkant, x2 är högerkant
            this.d1x1 = 70;
            this.d1x2 = 130;
            this.d2x1 = 300;
            this.d2x2 = 360;
            this.d3x1 = 500;
            this.d3x2 = 560;
        }

        // Klassen för ljuden
        function Sound() {
            
            this.right = new Audio("ping.mp3");
        }

        // Kör gameloopen, laddar bilderna, svaren och frågorna
        function start() {
            
            // Laddar klasserna
            g = new Gubbe(); 
            d = new Door();
            s = new Sound();
            fs = [new FragSvar("Varför duschar man innan man hoppar i basängen?", "1. För att bakterierna inte ska reagera med kloret i basängen.", "2. För att vattnet inte ska bli grönt.", "3. För att de inte ska behöva städa.", "Blue"),
                  
                  new FragSvar("Vad händer när kloret i basängen reagerar med bakterierna?", "1. Det bildas smutsiga saker i luften.", "2. Det bildas en sorts gas i luften.", "3. Det blir smutsigt på golven.", "Red"),
                  
                  new FragSvar("Vilken åldersgrupp är sämst på att duscha innan de hoppar i basängen?", "1. Barn, 3- 13 år", "2. Tånåringar, 13 - 19 år.", "3. 30 år och uppåt.", "Green")];
            
            // Laddar bilderna och gameloopen
            c = document.getElementById("c");
            ctx = c.getContext("2d");
            window.setInterval(gameLoop, 20);
            
            // Skriver ut fråga 1 och respektive svar
            document.getElementById("fraga").innerHTML = fs[0].fraga;
            document.getElementById("svar1").innerHTML = fs[0].svar1;
            document.getElementById("svar2").innerHTML = fs[0].svar2;
            document.getElementById("svar3").innerHTML = fs[0].svar3;
            
            // Skriver ut poängsystemet
            document.getElementById("pointsRight").innerHTML = "Antal rätt svar: " + pointCounterRight;
            document.getElementById("pointsWrong").innerHTML = "Antal fel svar: " + pointCounterWrong;
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
        
        // Kollar ifall vilken dörr man går in i, och ger ut ett värde på det
        function doorCheck(){
            
            if(g.x > d.d1x1 && g.x < d.d1x2 && g.y === 290){
                
                answerCheck("Blue");
            }
            
            if(g.x > d.d2x1 && g.x < d.d2x2 && g.y === 290){
                
                answerCheck("Red");
            }
            
            if(g.x > d.d3x1 && g.x < d.d3x2 && g.y === 290){
                
                answerCheck("Green");
            }
        }
        
        // Funktionen för svaren och frågorna
        function answerCheck(svar){
            
                // Kollar ifall dörrvärdet var rätt
                if(fs[ansCounter].rs === svar){
                    
                    // Flyttar tillbaka gubben till startposition och spelar ett ljud
                    g.y = 550;
                    g.x = 350;
                    ansCounter = ansCounter + 1;
                    s.right.play();
                    
                    // Kollar ifall värdet överstiger 2, och ändrar frågor och svar till fråga 1 med respektive svar. 
                    if( ansCounter > 2){
                        ansCounter = 0;
                    }
                    
                    // Skriver ut de nya frågorna 
                    document.getElementById("fraga").innerHTML = fs[ansCounter].fraga;
                    document.getElementById("svar1").innerHTML = fs[ansCounter].svar1;
                    document.getElementById("svar2").innerHTML = fs[ansCounter].svar2;
                    document.getElementById("svar3").innerHTML = fs[ansCounter].svar3;
                    console.log( ansCounter );
                    
                    // Lägger till poäng
                    pointCounterRight ++;
                    document.getElementById("pointsRight").innerHTML = "Antal rätt svar: " + pointCounterRight;
                }
            
            // Kollar ifall dörrvärdet var fel
            else if(fs[ansCounter].rs != svar){
                // Lägger till poäng på felmätaren
                pointCounterWrong ++;
                document.getElementById("pointsWrong").innerHTML = "Antal fel svar: " + pointCounterWrong;
                
                // Ändrar respektive dörrars svar till Fel
                if(svar === "Blue"){
                    
                    document.getElementById("svar1").innerHTML = "Fel svar";
                }
                
                if(svar === "Red"){
                    
                    document.getElementById("svar2").innerHTML = "Fel svar";
                }
                
                if(svar === "Green"){
                    
                    document.getElementById("svar3").innerHTML = "Fel svar";
                }
                
                // Flyttar tillbaka gubben till startposition
                g.y = 550;
                g.x = 350;
            }
    }

    

        






























