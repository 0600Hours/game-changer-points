const USERS = ["Dax", "Latte", "RelaxingDragon", "Rory", "Takula", "Zingy"];

USERS.forEach((user) => {
    const linkWrapper = document.createElement("div");
    linkWrapper.className = "link-wrapper";
    const link = document.createElement("a");
    link.className = "link"
    link.href = `/${user}.html`;

    const capitals = user.match(/[A-Z]/g);
    if (capitals.length <= 1) {
        link.innerHTML = user;
    } else {
        let _user = user;
        let userIndex = 0, capsIndex = 0;
        while (capsIndex < capitals.length) {
            userIndex = _user.indexOf(capitals[capsIndex], userIndex);
            if (capsIndex > 0) {
                _user = _user.slice(0, userIndex) + '\u200B' + _user.slice(userIndex);
            }
            capsIndex++;
        }
        link.innerHTML = _user;
    }



    linkWrapper.appendChild(link);
    document.getElementById("links-container").appendChild(linkWrapper);
});