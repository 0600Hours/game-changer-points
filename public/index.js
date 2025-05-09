fetch(window.location.href + "status")
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        document.getElementById("number").innerHTML = data;
    })
    .catch(error => console.log(error));

const create7SegmentDigit = (digit) => {
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
    if (digit !== undefined) {
        if (typeof digit === "number") {
            wrapper.classList.add(`digit-${digit}`);
        } else {
            wrapper.classList.add(digit);
        }
    }
    return wrapper;
}

document.getElementById("display").appendChild(create7SegmentDigit("minus"));
for (var i = 0; i <= 9; i++) {
    document.getElementById("display").appendChild(create7SegmentDigit(i));
}
