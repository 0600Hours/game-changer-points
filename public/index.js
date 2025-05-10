const USERS = ["Dax", "Latte", "RelaxingDragon", "Rory", "Takula", "Zingy"];

USERS.forEach((user) => {
    const link = document.createElement("a");
    link.href = `/${user.toLowerCase()}.html`;
    link.innerHTML = user;
    document.getElementById("links-container").appendChild(link);
});