const closeBtn = document.getElementById("close");
const nav_page = document.querySelector(".navPage");
const navBtn = document.getElementById("navBtn");
const overlay = document.querySelector(".overlay");

function open_navbar(){
    if(window.getComputedStyle(nav_page).display === "none"){
        nav_page.style.display = "block";
        closeBtn.style.display = "block";
        navBtn.style.display = "none";
        contact_page.style.display = "none";
        c_icon.style.display = "block";
        cancel.style.display = "none";
        overlay.style.display = "block";
        closeCategory();
    }
}

function hide_navbar(){
    nav_page.style.display = "none";
    closeBtn.style.display = "none";
    navBtn.style.display = "block";
    overlay.style.display = "none";
}

closeBtn.addEventListener("click", hide_navbar)

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
        overlay.style.display = "block";
        closeCategory();

    }
}

function closeContact(){
    contact_page.style.display = "none";
    c_icon.style.display = "block";
    cancel.style.display = "none";
    overlay.style.display = "none";
}

overlay.addEventListener("click", ()=>{
    closeCategory();
    if(contact_page.style.display === "block"){
        return closeContact();
    }else if(nav_page.style.display === "block"){
        return hide_navbar();
    }
})

const addDate = document.getElementById("currentyear");
const currentYear = new Date().getFullYear();

addDate.textContent = currentYear+",";

//portfolio js
const graphic_design = document.querySelector(".images");
const web_design = document.querySelector(".w-images");
const videography = document.querySelector(".v-images");
const video_edit = document.querySelector(".e-images");
const photography = document.querySelector(".ph-images");
const graphic = document.getElementById("graphic");
const web = document.getElementById("web");
const edit = document.getElementById("edit");
const video = document.getElementById("video");
const photo = document.getElementById("photo");
const page = document.getElementById("page");
const icon = document.getElementById("icon");
const cate_button = document.querySelector(".button");
const category = document.querySelector(".cate-page")

function openCategory(){
    if(window.getComputedStyle(category).display === "none"){
        category.style.display = "block";
        icon.style.transform = "rotate(270deg)";
        overlay.style.display = "block";
    } else {
        return closeCategory();
    }
}

function closeCategory(){
    category.style.display = "none";
    icon.style.transform = "rotate(90deg)";
    overlay.style.display = "none";
}

page.addEventListener("click", openCategory)

graphic.addEventListener("click", ()=>{
    page.textContent = "Graphic Design Portfolio";
    closeCategory();
})

web.addEventListener("click", ()=>{
    closeCategory();
    page.textContent = "Web Design Portfolio";
})

edit.addEventListener("click", ()=>{
    page.textContent = "Video Editing Portfolio";
    closeCategory();
})

video.addEventListener("click", ()=>{
    page.textContent = "Videography Portfolio";
    closeCategory();
})

photo.addEventListener("click", ()=>{
    page.textContent = "Photography Portfolio";
    closeCategory();
})
