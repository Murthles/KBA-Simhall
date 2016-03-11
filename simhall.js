            // Canvas och resterande bilder
        var ctx, 
            c,
            // s är för ljudklassen, d är för dörrklassen, g är gubbens klass, fs är fråga- och svar-klassen
            s,
            d,
            g,
            fs,
            // Variabeln som håller reda på vilken fråga vi är på
            ansCounter = 0,
            // Variablerna som håller i spelarens poäng
            pointCounterRight = 0,
            pointCounterWrong = 0,
            // Variabeln som håller i spelarens feedback
            feedback,
            // variabeln som håller i gameLoopen
            loop;
 
        // Klassen som håller i gubben och dess bild
        function Gubbe() {
            // Gubbens koordinater
            this.x = 350;
            this.y = 600;
            // Gubbens hastighet upp och ner
            this.vx = 0;
            this.vy = 0;
            // Gubbens bild
            this.img = document.getElementById("gubbeIMG");
        }
            
        // Klassen för våra frågor, svar och rätt svar
        function FragSvar(fraga,s1,s2,s3,rs){
            // Frågan
            this.fraga = fraga;
            // Svarsalternativen
            this.svar1 = s1;
            this.svar2 = s2;
            this.svar3 = s3;
            // Rätt svarsalternativ
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
            // Ljudet som spelas när man går in i rätt dörr
            this.right = new Audio("ping.mp3");
            // Ljudet som spelas när man går in i fel dörr
            this.wrong = new Audio("error.mp3");
            // Ljudet som spelas ifall man inte fick några fel
            this.ingafel = new Audio("klapp.mp3");
        }

        // Kör gameloopen, laddar bilderna, svaren och frågorna
        function start() {
            // Instansierar följande objekt
            // Gubben
            g = new Gubbe();
            // Dörrarna
            d = new Door();
            // Ljuden
            s = new Sound();
            // Frågorna och svaren 
            fs = [new FragSvar("Varför duschar man innan man hoppar i basängen?", "1. För att bakterierna inte ska reagera med kloret i basängen.", "2. För att vattnet inte ska bli grönt.", "3. För att de inte ska behöva städa.", "Blue"),
                  
                  new FragSvar("Vad händer när kloret i basängen reagerar med bakterierna?", "1. Det bildas smutsiga saker i luften.", "2. Det bildas en sorts gas i luften.", "3. Det blir smutsigt på golven.", "Red"),
                  
                  new FragSvar("Vilken åldersgrupp är sämst på att duscha innan de hoppar i basängen?", "1. Barn, 3- 13 år", "2. Tånåringar, 13 - 19 år.", "3. 30 år och uppåt.", "Green")];
            
            // Laddar bilderna och gameloopen
            c = document.getElementById("c");
            ctx = c.getContext("2d");
            loop = window.setInterval(gameLoop, 20);
            
            // Skriver ut fråga 1 med respektive svar
            document.getElementById("fraga").innerHTML = fs[0].fraga;
            document.getElementById("svar1").innerHTML = fs[0].svar1;
            document.getElementById("svar2").innerHTML = fs[0].svar2;
            document.getElementById("svar3").innerHTML = fs[0].svar3;
            
            // Skriver ut poängräknaren
            document.getElementById("pointsRight").innerHTML = "Antal rätt svar: " + pointCounterRight;
            document.getElementById("pointsWrong").innerHTML = "Antal fel svar: " + pointCounterWrong;
        }

        // Gameloopen som kallar på de andra funktionerna
        function gameLoop() {
            // Suddar ut gubbens spår samt frågorna när de byts. 
            ctx.clearRect(0, 0, 700, 700);
            // Kallar på funktionen som målar simhallen
            paintSimhall();
            // Kallar på funktionen som målar gubben
            paintGubbe();
            // Kallar på funktionen som håller ordning på collision detection för kanterna på canvaset
            edgeCheck();
            // Kallar på funktionen som håller reda på vilken dörr man går in i 
            doorCheck();
        }

        // Målar ut simhallen på canvaset
        function paintSimhall() {
            
            ctx.drawImage(simhallIMG, 0, 0, 700, 700);
        }

        // Målar ut gubben på canvaset
        function paintGubbe() {
            // Målar ut gubben på dens start-koordinater
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
        
        // Collision detection för kanterna på canvaset
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
        
        // Kollar vilken dörr man går in i, och ger ut ett värde på det
        function doorCheck(){
            // Blå dörr
            if(g.x > d.d1x1 && g.x < d.d1x2 && g.y === 290){
                // Kallar på funktionen som kollar ifall det var rät dörr man gick in i samt ger variabeln "svar" ett värde, i detta fallet "Blue".
                answerCheck("Blue");
            }
            // Röd dörr
            if(g.x > d.d2x1 && g.x < d.d2x2 && g.y === 290){
                
                answerCheck("Red");
            }
            // Grön dörr
            if(g.x > d.d3x1 && g.x < d.d3x2 && g.y === 290){
                
                answerCheck("Green");
            }
        }
        
        // Funktionen som jämför vilken dörr du gick in i med den dörren som var rätt svar, ifall det blev fel eller rätt
        function answerCheck(svar){
                // Kollar ifall dörrvärdet var rätt
                if(fs[ansCounter].rs === svar){
                    // Flyttar tillbaka gubben till startposition och spelar ett ljud
                    g.y = 550;
                    g.x = 350;
                    ansCounter = ansCounter + 1;
                    s.right.play();
                    
                    // Skriver ut de nya frågorna 
                    document.getElementById("fraga").innerHTML = fs[ansCounter].fraga;
                    document.getElementById("svar1").innerHTML = fs[ansCounter].svar1;
                    document.getElementById("svar2").innerHTML = fs[ansCounter].svar2;
                    document.getElementById("svar3").innerHTML = fs[ansCounter].svar3;
                    // Lägger till poäng på rättmätaren
                    pointCounterRight ++;
                    document.getElementById("pointsRight").innerHTML = "Antal rätt svar: " + pointCounterRight;
                }
            
            // Kollar ifall dörrvärdet var fel
            else if(fs[ansCounter].rs != svar){
                // Lägger till poäng på felmätaren
                pointCounterWrong ++;
                s.wrong.play();
                document.getElementById("pointsWrong").innerHTML = "Antal fel svar: " + pointCounterWrong;
                
                // Ändrar respektive dörrars svar till Fel
                // Blå dörr
                if(svar === "Blue"){
                    
                    document.getElementById("svar1").innerHTML = "Fel svar";
                }
                // Röd dörr
                if(svar === "Red"){
                    
                    document.getElementById("svar2").innerHTML = "Fel svar";
                }
                // Grön dörr
                if(svar === "Green"){
                    
                    document.getElementById("svar3").innerHTML = "Fel svar";
                }
                // Flyttar tillbaka gubben till startposition
                g.y = 550;
                g.x = 350;
            }
            
            // Kallar på endGame funktionen när man har svarat rätt på alla frågor
            if(pointCounterRight === 3){
            
                endGame();
                }
            }
        
        // Funktionen som avslutar spelet och visar ditt resultat
        function endGame(){ 
            // Stannar gameLoopen
            window.clearInterval(loop);
            // Suddar ut frågor och svar
            document.getElementById("fraga").innerHTML = "";
            document.getElementById("svar1").innerHTML = "";
            document.getElementById("svar2").innerHTML = "";
            document.getElementById("svar3").innerHTML = "";
            // Suddar ut poängräknarna
            document.getElementById("pointsRight").innerHTML = "";
            document.getElementById("pointsWrong").innerHTML = "";
            // Suddar ut simhallen och gubben
            ctx.clearRect(0, 0, 700, 700);
            // Visar hur mycket poäng du fick
            document.getElementById("antalRatt").innerHTML = "Du fick " + pointCounterRight + " rätt " + pointCounterWrong + " fel."
            // Kallar på feedBack funktionen som ger dig feedback beroende på hur många fel du hade i slutet av spelet
            feedBack();
        }

        // Funktionen som ger dig feedback
        function feedBack(){
            // Man får olika feedbacks beroende på hur många fel man fick
            if(pointCounterWrong === 0){
                feedback = "WoW! Du är riktigt duktigt! Du får lov att bada!";
                s.ingafel.play();
            }
            else if(pointCounterWrong > 0 && pointCounterWrong < 3){
                feedback = "Du är duktig men borde nog tänka till lite mera innan du badar.";
            }
            else if(pointCounterWrong > 2 && pointCounterWrong < 6){
                feedback = "Du bör studera lite mera om simhalls-hygienen";
            }
            else if(pointCounterWrong > 6 && pointCounterWrong < 12){
                feedback = "Du får inte lov att gå in i simhallen förrän du har duschat och vet varför!";
            }
            else if(pointCounterWrong === 12){
                feedback = "Du får inte lov att bada alls...";
            }
            else if(pointCounterWrong > 12){
                feedback = "...";
            }
            // Ger spelaren lite feedback
            document.getElementById("feedback").innerHTML = feedback;
        }

    

        






























