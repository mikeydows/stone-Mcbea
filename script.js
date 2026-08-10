const closeBtn = document.getElementById("close");
const nav_page = document.querySelector(".navPage");
const navBtn = document.getElementById("navBtn");

function open_navbar(){
    if(window.getComputedStyle(nav_page).display === "none"){
        nav_page.style.display = "block";
        closeBtn.style.display = "block";
        navBtn.style.display = "none";
        contact_page.style.display = "none";
        c_icon.style.display = "block";
        cancel.style.display = "none";
    }
}

closeBtn.addEventListener("click", () =>{
    nav_page.style.display = "none";
        closeBtn.style.display = "none";
        navBtn.style.display = "block";
})

const contact_page = document.querySelector(".contact");
const c_icon = document.getElementById("c-icon");
const cancel = document.getElementById("cancel");

function openContact(){
    if(window.getComputedStyle(contact_page).display === "none"){
        contact_page.style.display = "block";
        c_icon.style.display = "none";
        cancel.style.display = "block";
        nav_page.style.display = "none";
        closeBtn.style.display = "none";
        navBtn.style.display = "block";
    }else{
        contact_page.style.display = "none";
        c_icon.style.display = "block";
        cancel.style.display = "none";
    }
}

const addDate = document.getElementById("currentyear");
const currentYear = new Date().getFullYear();

addDate.textContent = currentYear+",";