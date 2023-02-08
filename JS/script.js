/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var ok = false;
var character;
var addsec;
var counter = 0;
var game = document.getElementById("game");
var x = 0;
var marg = 130;
var rnd = 4;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function Gen(diff) {
    var pass = document.getElementById("pass").value;
    document.getElementById("start").remove();
    game = document.getElementById("game");
    game.classList.add("game");
    var audioElement = document.createElement("audio");
    audioElement.id = "music";
    audioElement.src = "Audio/UtopianDream.mp3";
    audioElement.volume = 0.2;

    if (diff == 2)
        game.style.backgroundImage = "url('Pic/wallpaper2.png')";
    else if (diff == 1.5)
        game.style.backgroundImage = "url('Pic/wallpaper3.png')";
    game.childNodes[1].id = "character";

    if (pass != "") {
        if (pass == "Anima") {
            game.childNodes[1].style.backgroundImage = "url('Pic/char2.png')";
            document.getElementById("body").style.backgroundImage = "url('Pic/background2.png')";
            document.getElementById("scoreSpan").style.backgroundColor = "black";
            document.getElementById("scoreSpan").style.color = "whitesmoke";
        } else if (pass == "Rebuild") {
            game.childNodes[1].style.backgroundImage = "url('Pic/char3.png')";
            game.style.backgroundImage = "url('Pic/wallpaper4.png')";
        } else if (pass == "Rei")
            audioElement.src = "Audio/THE_IMAGE_OF_ME.mp3";
        else if (pass == "Asuka")
            audioElement.src = "Audio/EverythingYouveEverDreamed.mp3";
        else if (pass == "Thanatos")
            audioElement.src = "Audio/THANATOSpart4overcome.mp3";
        else if (pass == "Kaworu") {
            rnd = -1;
        } else {
            if ((Math.floor(Math.random() * 2) + 1) == 1) {
                var audio = new Audio('Audio/Anta_baka.mp3');
                audio.volume = 0.2;
            } else
                var audio = new Audio('Audio/Asuka_How_Disgusting.mp3');
            audio.play();

        }
    }

    document.getElementById("scoreSpan").innerHTML = "Score:" + (counter / 1000) + "m";
    document.getElementById("scoreSpan").style.visibility = "visible";

    setTimeout(function() {
        game.childNodes[3].id = "block1";
        game.childNodes[3].style.animation = "block " + diff + "s infinite linear";
        ok = true;

        addsec = diff;
        audioElement.play()
        document.body.appendChild(audioElement);
    }, 1111);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function jump() {
    if (character != null) {
        if (character.classList == "animate") { return }
        character.classList.add("animate");
        setTimeout(function() {
            character.classList.remove("animate");
        }, 300);
    }
}

var loop = setInterval(function() {
    if (ok) {
        character = document.getElementById("character");
        var audioElement = document.getElementById("music")
        var block1 = document.getElementById("block1");
        var checkDead = setInterval(function() {
            let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
            let block1Left = parseInt(window.getComputedStyle(block1).getPropertyValue("left"));
            if ((block1Left < marg && block1Left > 90) && characterTop >= 261) {
                block1.style.animation = "none";
                audioElement.pause();
                audioElement.currentTime = 0;
                alert("AT-Field distrutto. L'EVA ha viaggiato per: " + (counter / 1000) + " metri");
                counter = 0;
                block1.style.animation = "block " + addsec + "s infinite linear";
                audioElement.play();
            } else if (block1Left < -20) {
                ran = (Math.floor(Math.random() * rnd) + 1);
                block1.style.backgroundImage = "url('Pic/angel" + ran + ".png')";
            } else {
                x--;
                counter++;
                var score = counter / 1000;
                document.getElementById("scoreSpan").innerHTML = ("Score: " + score + "m").replace(".", ",");

                /*if (score == 50)
                    game.style.backgroundImage = "url('Pic/wallpaper2.png')";
                else if (score == 100)
                    game.style.backgroundImage = "url('Pic/wallpaper3.png')";
                else if (score == 200)
                    game.style.backgroundImage = "url('Pic/wallpaper4.png')";
                else if (score == 400)
                    game.style.backgroundImage = "url('Pic/wallpaper5.png')";
                else if (score == 800)
                    game.style.backgroundImage = "url('Pic/wallpaper6.png')";*/

                game.style.backgroundPositionX = (x / 9) + "px";
            }
        }, 1);
    }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////