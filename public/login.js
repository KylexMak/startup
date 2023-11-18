function login(){
    const nameEl = document.querySelector("#username");
    const familyCodeEl = document.querySelector("#familyCode");
    localStorage.setItem("Username", nameEl.value);
    localStorage.setItem("Family Code", familyCodeEl.value);
    window.location.href = "selection.html"
}