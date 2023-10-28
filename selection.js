const Username = document.querySelector(".user");
Username.textContent = this.GetUserName();

function GetUserName(){
    return localStorage.getItem("Username") ?? "Unknown";
}