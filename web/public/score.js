const scoreTo7Segment = (score) => {
    const digitArray = [];
    const isNegative = score < 0;
    score = Math.abs(score);
    while (score > 9) {
        digitArray.unshift(score % 10);
        score = Math.floor(score / 10);
    }
    digitArray.unshift(score);
    if (isNegative) {
        digitArray.unshift("minus");
    }
    while (digitArray.length < 4) {
        digitArray.unshift("none");
    }
    return digitArray
}

const create7SegmentDigit = () => {
    const wrapper = document.createElement("span");
    wrapper.className = "digit-wrapper";
    ["top horiz", "top-left vert", "top-right vert", "middle horiz", "bottom-left vert", "bottom-right vert", "bottom horiz"].forEach((e) => {
        const segment = document.createElement("div");
        segment.className = e;
        const inner = document.createElement("div");
        inner.className = "inner";
        segment.appendChild(inner);
        wrapper.appendChild(segment);
    });
    return wrapper;
}

const updateDisplay = (score) => {
    const scoreDigits = scoreTo7Segment(score);
    [...document.getElementsByClassName("digit-wrapper")].forEach((e, i) => {
        e.className = `digit-wrapper digit-${scoreDigits[i]}`
    });
}

// TODO: enable wakelock once i have https figured out

// let wakeLock;
// const requestWakeLock = async () => {
//     console.log("requesting wake lock");
//     try {
//         wakeLock = await navigator.wakeLock.request('screen');

//         alert("wakelock successful");
//     } catch (err) {
//         console.log(err);
//         alert(err);
//     }
// }

// const handleVisibilityChange = () => {
//     if (document.visibilityState === 'visible') {
//       requestWakeLock();
//     }
//   }

// document.addEventListener('visibilitychange', handleVisibilityChange);
// document.addEventListener('click', requestWakeLock);

const requestFullscreen = () => {
    if (!document.fullscreenElement) {
        document.querySelector("body").requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

document.getElementById("display").addEventListener("click", requestFullscreen);

const getScore = () => {
    fetch(window.location.origin + "/status")
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            const user = window.location.pathname.substring(1, window.location.pathname.indexOf("."));
            console.log(user);
            const userScore = data.find((row) => row.contestant === user).score;
            console.log(userScore);
            updateDisplay(userScore);
            // setInterval(getScore, 250)
        })
        .catch(error => console.log(error));
}

for (let i = 0; i < 4; i++) {
    document.getElementById("display-inner").appendChild(create7SegmentDigit());
}
getScore();
