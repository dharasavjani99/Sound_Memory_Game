$(document).ready(function(){

    let colors = ["red", "green", "blue", "yellow"];
    let gameSeq = [];
    let userSeq = [];
    let level = 0;
    let started = false;

    let highScore = parseInt(localStorage.getItem("highScore_hard")) || 0;
    $("#status").text("Level 0 | High Score: " + highScore);
    $("#score").text("High Score: " + highScore);

    let gameSpeed = 400;

    $("#start").click(function(){
        if(!started){
            started = true;
            level = 0;
            gameSeq = [];
            nextLevel();
        }
    });

    $("#restart").click(function(){
        $("#gameOverScreen").addClass("hidden");
        level = 0;
        gameSeq = [];
        started = true;
        nextLevel();
    });

    function nextLevel(){
        userSeq = [];
        level++;
        $("#status").text("Level " + level + " | High Score: " + highScore);

        let randomColor = colors[Math.floor(Math.random() * 4)];
        gameSeq.push(randomColor);

        flashSequence();
    }

    function flashSequence(){
        let i = 0;

        let interval = setInterval(function(){

            let color = gameSeq[i];

            $("#" + color).addClass("active");
            playSound(color);

            setTimeout(() => {
                $("#" + color).removeClass("active");
            }, 300);

            i++;
            if(i >= gameSeq.length){
                clearInterval(interval);
            }

        }, gameSpeed);
    }

    $(".box").click(function(){

        if(!started) return;

        let userColor = $(this).attr("id");
        userSeq.push(userColor);

        $(this).addClass("active");
        playSound(userColor);

        setTimeout(() => {
            $(this).removeClass("active");
        }, 200);

        checkAnswer(userSeq.length - 1);
    });

    function checkAnswer(index){
        if(userSeq[index] === gameSeq[index]){

            if(userSeq.length === gameSeq.length){
                setTimeout(nextLevel, 800);
            }

        } else {

            if(level - 1 > highScore){
                highScore = level - 1;
                localStorage.setItem("highScore_hard", highScore);
            }

            $("#score").text("High Score: " + highScore);
            $("#finalScore").text("Your Score: Level " + (level - 1));

            $("#gameOverScreen").removeClass("hidden");
            started = false;
        }
    }

    function playSound(color){
        let audio = document.getElementById(color + "Sound");
        if(audio){
            audio.currentTime = 0;
            audio.play();
        }
    }

});