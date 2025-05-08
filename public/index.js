fetch(window.location.href + "status")
    .then((response) => response.json())
    .then((data) => {
        document.getElementById("number").innerHTML = data;
    })
    .catch(error => console.log(error));