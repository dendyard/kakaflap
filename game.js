document.addEventListener('DOMContentLoaded', () => { 

    var reqAnim;
    //var fps = 60;
    var gravity = 0.6;
    var velocity = 0;
    var kepak = -8;
    var startgame = false;
    var gameover = false;
    var skornya = 0;
    var pipepose = [
        0,
        90,
        -80,
        50,
        -50
    ]
    
    let yaxis = 200;
    TweenLite.to(kaka, 0, {
                y:yaxis,
                ease: Sine.easeOut
            }); 
    TweenLite.to(pi1, 0, {
                x:400,
                ease: Sine.easeOut
            }); 
    TweenLite.to(pi2, 0, {
                x:400,
                ease: Sine.easeOut
            }); 
    
    
    taparea.addEventListener('click', birdjump);
    restart.addEventListener('click', () => {
                             location.reload();
                             ;});
    
    
    function movethepipe(){
        TweenLite.to(pi1, 3, {
                x:-100,
                ease: Linear.easeOut, onComplete:rethepipe, onCompleteParams:[pi1]
            });
        
        TweenLite.to(pi2, 3, {
                x:-100,
                ease: Linear.easeOut, delay:2, onComplete:rethepipe, onCompleteParams:[pi2]
            });
    }   
    
    function rethepipe(idp) {
        let pppose;
        skornya ++;
        skor.innerHTML = skornya;
        poin.play();
        pppose = pipepose[Math.floor(Math.random() * (pipepose.length))];
        TweenLite.to(idp, 0, {
                x:400, y:pppose,
                ease: Linear.easeOut
        });
        
        // get random pipe pose 
        TweenLite.to(idp, 3, {
                x:-100, 
                ease: Linear.easeOut, delay:1, onComplete:rethepipe, onCompleteParams:[idp]
            });
            
    }
    
    function birdjump(){
        if (!startgame) { movethepipe(); startgm(); startgame = true;}
        velocity = kepak;
        flap.currentTime = 0;
        flap.play();
    }
        
    function startgm() {
        srt.style.display = 'none';
        requestAnimationFrame(update);   
        openFullscreen();
    }
    
    function gameoverme(){
        TweenMax.killAll();

        kakaanim.style.display = 'none';
        kakaanim2.style.display = 'block';
        TweenLite.to(kaka, 0.4, {
                    y:500, rotation:180, x:-50,
                    ease: Sine.easeIn
            });
        
        TweenLite.to(kaka, 0, {
                y:yaxis,
                ease: Sine.easeOut
            });
        skor.style.zIndex = 100;
        judul.style.zIndex = 100;
        
        TweenLite.to(skor, 0.5, {
                y:120,
                ease: Back.easeOut
            });
        restart.style.display = 'block';
        TweenLite.to(restart, 0, {
                scale:0,
                ease: Sine.easeOut
            });
        
        TweenLite.to(restart, 0.3, {
                scale:1,
                ease: Back.easeOut, delay:0.3
            });
        
        
        
        TweenLite.to(judul, 0.5, {
                y:112,
                ease: Back.easeOut, delay:0.2
            });
        
        
        
        kena.play();
        cancelAnimationFrame(update);
    }
    
    
    function openFullscreen() {
        var elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            /* IE11 */
            elem.msRequestFullscreen();
        }
    }
    
    function collisionDetect(){
        var breakable = [
            $("#hitkaka").collision( "#pp1"),
            $("#hitkaka").collision( "#pp2"),
            $("#hitkaka").collision( "#pp3"),
            $("#hitkaka").collision( "#pp4"),
                        ];
        
        breakable.forEach(ifhit => {
            if (ifhit.length != 0) {
                gameover = true;
                gameoverme();
            }    
        });
        
        
    }
    
    function update() {
        
        velocity += gravity;
        yaxis += velocity;
        
        TweenLite.to(kaka, 0, {
            y:yaxis ,
            ease: Sine.easeOut
        });
        
        if (yaxis >= 450) {
           velocity = 0;
           TweenLite.to(kaka, 0, {
                y:450,
                ease: Sine.easeOut
            }); 
            gameover = true;
            gameoverme();
        }
        
        if (yaxis <= 0) {
           velocity = 0;    
           TweenLite.to(kaka, 0, {
                y:0,
                ease: Sine.easeOut
            }); 
        }
        
        collisionDetect();
        if (!gameover) {
            requestAnimationFrame(update);    
        }
        
    }

});