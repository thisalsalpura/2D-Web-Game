//Run Sound

var runSound = new Audio("run.mp3");
runSound.loop = true;

//Jump Sound

var jumpSound = new Audio("jump.mp3");

//Dead Sound

var deadSound = new Audio("dead.mp3");



//Key Event

function keyCheck(event) {

    //Enter Key

    if (event.which == 13) {

        if (runWorkerId == 0) {

            runWorkerId = setInterval(run, 100);
            runSound.play();

            moveBackgroundWorkerId = setInterval(moveBackground, 100);

            createBlockWorkerId = setInterval(createBlock, 100);

            moveBlockWorkerId = setInterval(moveBlock, 100);

            scoreWorkerId = setInterval(updateScore, 100);
        }

    }




    //Space Key

    if (event.which == 32) {

        if (jumpWorkerId == 0) {

            clearInterval(runWorkerId);
            runWorkerId = -1;
            runSound.pause();

            jumpWorkerId = setInterval(jump, 100);
            jumpSound.play();
        }

    }
}

//Boy Run

var boyId = document.getElementById("boy");

var runImageNumber = 1;

var runWorkerId = 0;

function run() {

    runImageNumber++;

    if (runImageNumber == 9) {
        runImageNumber = 1
    }

    boyId.src = "Run (" + runImageNumber + ").png";
}

//Boy Jump

var jumpImageNumber = 1;

var jumpWorkerId = 0;

var boyMarginTop = 300;

function jump() {

    jumpImageNumber++;

    if (jumpImageNumber <= 7) {

        boyMarginTop = boyMarginTop - 30;

        boyId.style.marginTop = boyMarginTop + "px";

    }

    if (jumpImageNumber >= 8) {

        boyMarginTop = boyMarginTop + 30;

        boyId.style.marginTop = boyMarginTop + "px";
    }



    if (jumpImageNumber == 13) {
        jumpImageNumber = 1;

        clearInterval(jumpWorkerId);

        jumpWorkerId = 0;

        runWorkerId = setInterval(run, 100);
        runSound.play();

        if (moveBackgroundWorkerId == 0) {
            moveBackgroundWorkerId = setInterval(moveBackground, 100);

        }


        if (scoreWorkerId == 0) {
            scoreWorkerId = setInterval(updateScore, 100);

        }

        if (createBlockWorkerId == 0) {
            createBlockWorkerId = setInterval(createBlock, 100);
        }

        if (moveBlockWorkerId == 0) {
            moveBlockWorkerId = setInterval(moveBlock, 100);

        }



    }

    boyId.src = "Jump (" + jumpImageNumber + ").png";
}

//Create Block

var blockMarginLeft = 300;

var createBlockWorkerId = 0;

var blockId = 1;

function createBlock() {

    var block = document.createElement("div");

    block.className = "block";

    block.id = "block" + blockId;

    blockId++;

    var gap = Math.random() * (1000 - 400) + 400;

    blockMarginLeft = blockMarginLeft + gap;

    block.style.marginLeft = blockMarginLeft + "px";

    document.getElementById("background").appendChild(block);


}

//Move Block

var moveBlockWorkerId = 0;

function moveBlock() {

    for (var i = 1; i <= blockId; i++) {

        var currentBlock = document.getElementById("block" + i);

        var currentBlockMarginLeft = currentBlock.style.marginLeft;

        var newBlockMarginLeft = parseInt(currentBlockMarginLeft) - 20;

        currentBlock.style.marginLeft = newBlockMarginLeft + "px";


        //alert(newBlockMarginLeft);
        //122-42

        if (newBlockMarginLeft < 122 & newBlockMarginLeft > 42) {
            //alert(boyMarginTop);
            //alert("Dead");
            //210

            if (boyMarginTop > 210) {

                clearInterval(runWorkerId);
                runSound.pause();

                clearInterval(jumpWorkerId);
                jumpWorkerId = -1;

                clearInterval(moveBackgroundWorkerId);
                clearInterval(createBlockWorkerId);
                clearInterval(moveBlockWorkerId);
                clearInterval(scoreWorkerId);

                deadWorkerId = setInterval(dead, 100);
                deadSound.play();
            }
        }

    }
}

//Dead

var deadImageNumber = 1;

var deadWorkerId = 0;

function dead() {

    deadImageNumber++;

    if (deadImageNumber == 11) {
        deadImageNumber = 10;

        boyId.style.marginTop = "300px";

        document.getElementById("endScreen").style.visibility = "visible";
        document.getElementById("endScore").innerHTML = newScore;
    }


    boyId.src = "Dead (" + deadImageNumber + ").png";
}







//Move Background

var backgroundId = document.getElementById("background");

var backgroundX = 0;

var moveBackgroundWorkerId = 0;

function moveBackground() {

    backgroundX = backgroundX - 20;

    backgroundId.style.backgroundPositionX = backgroundX + "px";

}

//Score

var scoreId = document.getElementById("score");

var newScore = 0;

var scoreWorkerId = 0;

function updateScore() {

    newScore++;

    scoreId.innerHTML ="SCORE = " + newScore;


}

//Reload

function reload() {

    location.reload();
}
