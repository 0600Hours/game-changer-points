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
            const user = window.location.pathname.substring(1, window.location.pathname.indexOf("."));
            console.log(data);
            console.log(user);
            const userScore = data.find((row) => row.contestant.toLowerCase() === user.toLowerCase()).score;
            updateDisplay(userScore);
        })
        .catch(error => console.log(error));
}

for (let i = 0; i < 4; i++) {
    document.getElementById("display-inner").appendChild(create7SegmentDigit());
}

setInterval(getScore, 250);

let wakeLock = null;
const requestWakeLock = async () => {
    if ('wakeLock' in navigator) {
        try {
            wakeLock = await navigator.wakeLock.request('screen');
            wakeLock.addEventListener('release', () => {
                console.log('Wake Lock was released');
                wakeLock = null;
            });
            console.log('Wake Lock is active');
        } catch (err) {
            console.error('Could not obtain wake lock:', err && err.name ? err.name : err, err && err.message ? err.message : '');
            wakeLock = null;
        }
    } else {
        console.log('Wake Lock API not supported in this browser.');
    }
};

document.addEventListener('visibilitychange', async () => {
    if (document.visibilityState === 'visible') {
        if (!wakeLock) {
            await requestWakeLock();
        }
    }
});


requestWakeLock();
document.addEventListener('click', () => {
    requestWakeLock();
})

window.addEventListener('unload', async () => {
    if (wakeLock) {
        try {
            await wakeLock.release();
        } catch (e) {
            // ignore
        }
        wakeLock = null;
    }
});