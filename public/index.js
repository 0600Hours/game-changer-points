fetch(window.location.href + "status")
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        document.getElementById("number").innerHTML = data;
    })
    .catch(error => console.log(error));

const create7SegmentDigit = () => {
    const wrapper = document.createElement("div");
    wrapper.className = "digit-wrapper";
    ["top horiz", "top-left vert", "top-right vert", "middle horiz", "bottom-left vert", "bottom-right vert", "bottom horiz"].forEach((e) => {
        const segment = document.createElement("div");
        segment.className = e;
        wrapper.appendChild(segment);
    });
    return wrapper;
}

document.getElementById("display").appendChild(create7SegmentDigit());