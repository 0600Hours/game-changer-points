const USERS = ["Dax", "Latte", "RelaxingDragon", "Rory", "Takula", "Zingy"];

USERS.forEach((user) => {
    const linkWrapper = document.createElement("div");
    linkWrapper.className = "link-wrapper";
    const link = document.createElement("a");
    link.className = "link"
    link.href = `/${user.toLowerCase()}.html`;

    const capitals = user.match(/[A-Z]/g);
    if (capitals.length <= 1) {
        link.innerHTML = user;
    } else {
        let _user = user;
        let userIndex = 0, capsIndex = 0;
        while (capsIndex < capitals.length) {
            console.log(userIndex);
            console.log(capsIndex);
            userIndex = _user.indexOf(capitals[capsIndex], userIndex);
            console.log(userIndex);
            if (capsIndex > 0) {
                _user = _user.slice(0, userIndex) + '\u200B' + _user.slice(userIndex);
            }
            capsIndex++;
            console.log("---");
        }
        link.innerHTML = _user;
    }



    linkWrapper.appendChild(link);
    document.getElementById("links-container").appendChild(linkWrapper);
});