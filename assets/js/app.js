// ======================================
// Premium Portfolio v2
// Apurbo Podder
// ======================================

const modal = document.getElementById("projectModal");
const modalBody = document.getElementById("modalBody");

const closeBtn = document.getElementById("closeModal");
const nextBtn = document.getElementById("nextProject");
const prevBtn = document.getElementById("prevProject");

const cards = document.querySelectorAll(".card");

let currentProject = 0;

const projects = [

{
title:"Luxury Eyewear",

hero:"assets/images/4.jpg",

software:"Rhino 8 + Blender",

year:"2026",

description:

`Premium acetate eyewear concept developed
with a focus on luxury proportions,
surface continuity and manufacturing quality.`,

gallery:[

"assets/images/4.jpg",
"assets/images/BG2.jpg",
"assets/images/BG3.jpg",
"assets/images/BG4.jpg"

]

},

{

title:"Metal Frame Concept",

hero:"assets/images/BG2.jpg",

software:"Rhino 8 + Blender",

year:"2026",

description:

`Luxury optical frame concept inspired by
modern titanium eyewear and precision engineering.`,

gallery:[

"assets/images/BG2.jpg",
"assets/images/BG3.jpg",
"assets/images/BG4.jpg",
"assets/images/4.jpg"

]

},

{

title:"Fashion Collection",

hero:"assets/images/BG3.jpg",

software:"Rhino 8 + Blender",

year:"2026",

description:

`High-end fashion eyewear collection
created using Rhino and rendered
inside Blender.`,

gallery:[

"assets/images/BG3.jpg",
"assets/images/BG4.jpg",
"assets/images/BG2.jpg",
"assets/images/4.jpg"

]

},

{

title:"Premium Collection",

hero:"assets/images/BG4.jpg",

software:"Rhino 8 + Blender",

year:"2026",

description:

`Luxury product visualization focused
on clean industrial design,
premium materials and realistic lighting.`,

gallery:[

"assets/images/BG4.jpg",
"assets/images/BG3.jpg",
"assets/images/BG2.jpg",
"assets/images/4.jpg"

]

}

];



// ================================
// OPEN PROJECT
// ================================

function openProject(index){console.log("Opening project:", index);

    currentProject = index;

    const template = document.getElementById(
        `project${index + 1}`
    );
console.log(template);

    if(!template){
        console.error("Template not found");
        return;
    }

    modalBody.innerHTML = template.innerHTML;

    modal.classList.add("active");

    document.body.style.overflow = "hidden";

}

// ================================
// CLOSE
// ================================

function closeProject(){

modal.classList.remove("active");

document.body.style.overflow="";

}



// ================================
// NEXT
// ================================

function nextProject(){

currentProject++;

if(currentProject>=4){

currentProject=0;

}

openProject(currentProject);

}



// ================================
// PREVIOUS
// ================================

function previousProject(){

currentProject--;

if(currentProject < 0){

    currentProject = cards.length - 1;

}

openProject(currentProject);

}



// ================================
// CARD CLICK
// ================================

cards.forEach((card,index)=>{

card.addEventListener("click",()=>{

openProject(index);

});

});



// ================================
// BUTTONS
// ================================

closeBtn.addEventListener("click",closeProject);

nextBtn.addEventListener("click",nextProject);

prevBtn.addEventListener("click",previousProject);



// ================================
// CLICK OUTSIDE
// ================================

modal.addEventListener("click",(e)=>{

if(e.target===modal || e.target.classList.contains("modal-overlay")){

closeProject();

}

});



// ================================
// ESC
// ================================

document.addEventListener("keydown",(e)=>{

if(e.key==="Escape"){

closeProject();

}

});



// ================================
// ARROW KEYS
// ================================

document.addEventListener("keydown",(e)=>{

if(!modal.classList.contains("active")) return;

if(e.key==="ArrowRight"){

nextProject();

}

if(e.key==="ArrowLeft"){

previousProject();

}

});



// ================================
// HERO BACKGROUND SLIDESHOW
// ================================

const hero=document.querySelector(".hero");

const backgrounds=[

"assets/images/background.jpg",

"assets/images/BG2.jpg",

"assets/images/BG3.jpg",

"assets/images/BG4.jpg"

];

let bg=0;

setInterval(()=>{

bg++;

if(bg>=backgrounds.length){

bg=0;

}

hero.style.backgroundImage=`url(${backgrounds[bg]})`;

},6000);



// ================================
// FADE IN
// ================================

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity=1;

entry.target.style.transform="translateY(0)";

}

});

});

document.querySelectorAll("section").forEach(section=>{

section.style.opacity=0;

section.style.transform="translateY(40px)";

section.style.transition="1s";

observer.observe(section);

});
// ======================================
// FULLSCREEN IMAGE VIEWER
// ======================================

const viewer = document.getElementById("imageViewer");
const viewerImage = document.getElementById("viewerImage");
const closeViewer = document.getElementById("closeViewer");

let zoomLevel = 1;
let startX = 0;
let startY = 0;
let isDragging = false;
let isPinching = false;
let pinchStartDistance = 0;
let pinchStartZoom = 1;
let currentTranslateX = 0;
let currentTranslateY = 0;

function resetViewerTransform(){

    zoomLevel = 1;
    currentTranslateX = 0;
    currentTranslateY = 0;
    viewerImage.style.transform = "translate(0px, 0px) scale(1)";

}

function setViewerImage(src){

    viewerImage.src = src;
    resetViewerTransform();

}

viewerImage.addEventListener("wheel", function(e){

    e.preventDefault();

    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const nextZoom = Math.min(3, Math.max(1, zoomLevel + delta));

    zoomLevel = nextZoom;
    viewerImage.style.transform = `translate(${currentTranslateX}px, ${currentTranslateY}px) scale(${zoomLevel})`;

}, { passive: false });

viewerImage.addEventListener("mousedown", function(e){

    if(zoomLevel <= 1) return;

    isDragging = true;
    startX = e.clientX - currentTranslateX;
    startY = e.clientY - currentTranslateY;

});

window.addEventListener("mousemove", function(e){

    if(!isDragging) return;

    currentTranslateX = e.clientX - startX;
    currentTranslateY = e.clientY - startY;
    viewerImage.style.transform = `translate(${currentTranslateX}px, ${currentTranslateY}px) scale(${zoomLevel})`;

});

window.addEventListener("mouseup", function(){

    isDragging = false;

});

viewerImage.addEventListener("touchstart", function(e){

    if(e.touches.length === 2){

        isPinching = true;
        pinchStartDistance = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
        );
        pinchStartZoom = zoomLevel;

    } else if(e.touches.length === 1 && zoomLevel > 1){

        isDragging = true;
        startX = e.touches[0].clientX - currentTranslateX;
        startY = e.touches[0].clientY - currentTranslateY;

    }

}, { passive: false });

viewerImage.addEventListener("touchmove", function(e){

    if(e.touches.length === 2 && isPinching){

        e.preventDefault();

        const distance = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
        );

        const ratio = distance / pinchStartDistance;
        zoomLevel = Math.min(3, Math.max(1, pinchStartZoom * ratio));
        viewerImage.style.transform = `translate(${currentTranslateX}px, ${currentTranslateY}px) scale(${zoomLevel})`;

    } else if(e.touches.length === 1 && isDragging){

        e.preventDefault();
        currentTranslateX = e.touches[0].clientX - startX;
        currentTranslateY = e.touches[0].clientY - startY;
        viewerImage.style.transform = `translate(${currentTranslateX}px, ${currentTranslateY}px) scale(${zoomLevel})`;

    }

}, { passive: false });

viewerImage.addEventListener("touchend", function(){

    isDragging = false;
    isPinching = false;

});

function setupImageZoomHover(){

    const zoomTargets = document.querySelectorAll(".hero-image, .modal-project > img");

    zoomTargets.forEach((img)=>{

        if(img.closest(".image-zoom-wrapper")) return;

        const wrapper = document.createElement("div");

        wrapper.className = "image-zoom-wrapper";

        img.parentNode.insertBefore(wrapper, img);

        wrapper.appendChild(img);

        img.addEventListener("mouseenter", function(){

            img.style.transform = "scale(2)";

        });

        img.addEventListener("mousemove", function(e){

            const rect = img.getBoundingClientRect();

            const x = ((e.clientX - rect.left) / rect.width) * 100;

            const y = ((e.clientY - rect.top) / rect.height) * 100;

            img.style.transformOrigin = `${x}% ${y}%`;

        });

        img.addEventListener("mouseleave", function(){

            img.style.transform = "scale(1)";

            img.style.transformOrigin = "center center";

        });

    });

}

document.addEventListener("DOMContentLoaded", setupImageZoomHover);

// Enable click on gallery images
function enableImageViewer(){

    const images = document.querySelectorAll(".gallery-item img");

    currentGallery = [];

    images.forEach(img=>{

        currentGallery.push(img.src);

    });

    images.forEach((img,index)=>{

        img.onclick=function(){

            currentImage=index;

            setViewerImage(currentGallery[currentImage]);

            viewer.classList.add("active");

        };

    });

}

// Attach after every project opens
const originalOpenProject = openProject;

openProject = function(index){

    originalOpenProject(index);

    enableImageViewer();

};

// Close button
closeViewer.onclick = function(){

    viewer.classList.remove("active");

    document.body.style.overflow = "hidden";

};

// Click outside image
viewer.onclick = function(e){

    if(e.target === viewer){

        viewer.classList.remove("active");

        document.body.style.overflow = "hidden";

    }

};

// ESC key
document.addEventListener("keydown",function(e){

    if(e.key === "Escape"){

        viewer.classList.remove("active");

    }
if(viewer.classList.contains("active")){

    if(e.key==="ArrowRight"){

        viewerNext.click();

    }

    if(e.key==="ArrowLeft"){

        viewerPrev.click();

    }

}

});
const viewerPrev = document.getElementById("viewerPrev");
const viewerNext = document.getElementById("viewerNext");

let currentGallery = [];
let currentImage = 0;
viewerNext.onclick=function(){

    currentImage++;

    if(currentImage>=currentGallery.length){

        currentImage=0;

    }

    setViewerImage(currentGallery[currentImage]);

};

viewerPrev.onclick=function(){

    currentImage--;

    if(currentImage<0){

        currentImage=currentGallery.length-1;

    }

    setViewerImage(currentGallery[currentImage]);

};
