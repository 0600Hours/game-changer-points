const playSound = () => {
    const audio = new Audio("/point.mp3");
    audio.play();
}

document.getElementById("play-sound").addEventListener("click", playSound);

let score;

const getScore = () => {
    fetch(window.location.origin + "/status")
        .then((response) => response.json())
        .then((data) => {   
            if (JSON.stringify(score) !== JSON.stringify(data)) {
                console.log("score changed");
                if (score !== undefined) {
                    console.log("playing sound");
                    playSound();
                }
            }
            score = data;
        })
        .catch(error => console.log(error));
}

setInterval(getScore, 100);