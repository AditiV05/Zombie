// Iteration 1: Declare variables required for this game
let zombieImgArr=[
    "zombie-1.png",
    "zombie-2.png",
    "zombie-3.png",
    "zombie-4.png",
    "zombie-5.png",
    "zombie-6.png",
]

let gameBody=document.getElementById("game-body");
let seconds = Number(document.getElementById("timer").textContent);
let zombieId=0;


// Iteration 1.2: Add shotgun sound
let shotgunSound = new Audio("./assets/shotgun.wav");
shotgunSound.volume=1;
gameBody.onclick=()=>{
    shotgunSound.pause();
    shotgunSound.currentTime=0;
    shotgunSound.play();
}

// Iteration 1.3: Add background sound
let backgroundSound = new Audio("./assets/bgm.mp3");
backgroundSound.play();
backgroundSound.loop=true;

// Iteration 1.4: Add lives
let maxLives=3;
let lives=maxLives;

// Iteration 2: Write a function to make a zombie
function makeZombie(){
    let zombie=document.createElement("img");
    let randomIndex=getRandomInt(0,zombieImgArr.length);
    let zombieName=zombieImgArr[randomIndex];
    let zombieImgSrc=`./assets/${zombieName}`;
    zombie.src=zombieImgSrc;
    zombie.setAttribute("class","zombie-image");
    zombie.setAttribute("id",`zombie-${zombieId}`);
    let randomLeftDist=getRandomInt(10,90);
    zombie.style.left=`${randomLeftDist}vw`;
    let animationDuration=getRandomInt(4,6);
    zombie.style.animationDuration=`${animationDuration}s`;
    gameBody.append(zombie);

    zombie.onclick=()=>{
        destructZombie(zombie);
    }
}
makeZombie();

// Iteration 3: Write a function to check if the player missed a zombie
function checkCollision(zombie){
    if(zombie.getBoundingClientRect().top <= 0){
        lives--;
        return true;
    } else {
        return false;
    }
}

// Iteration 4: Write a function to destroy a zombie when it is shot or missed
function destructZombie(zombie){
    zombie.style.display="none";
    zombieId++;
    makeZombie();
}

// Iteration 5: Creating timer
let timer=setInterval(()=>{
    seconds--;
    document.getElementById("timer").innerText=seconds;
    let zombie=document.getElementById("zombie-"+zombieId);
    if(checkCollision(zombie)==true){
        destructZombie(zombie);
        if(lives==0){
            clearInterval(timer);
            window.location.href="./game-over.html";
        }
    }
},1000);

// Iteration 6: Write a code to start the game by calling the first zombie
makeZombie();

// Iteration 7: Write the helper function to get random integer
function getRandomInt(min,max){
    min=Math.ceil(min);
    max=Math.floor(max);
    let randomNo= Math.floor(Math.random()*(max-min)+ min);
    return randomNo;
}

