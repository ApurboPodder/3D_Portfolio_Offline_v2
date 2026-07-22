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

            viewerImage.src=currentGallery[currentImage];

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

    viewerImage.src=currentGallery[currentImage];

};

viewerPrev.onclick=function(){

    currentImage--;

    if(currentImage<0){

        currentImage=currentGallery.length-1;

    }

    viewerImage.src=currentGallery[currentImage];

};
const viewer=document.getElementById("imageViewer");
const viewerImg=document.getElementById("viewerImage");

const gallery=[...document.querySelectorAll(".modal-gallery img")];

let current=0;

let scale=1;

let tx=0;

let ty=0;

gallery.forEach((img,i)=>{

img.onclick=()=>{

current=i;

openImage();

};

});

function openImage(){

viewer.classList.add("active");

viewerImg.src=gallery[current].src;

scale=1;

tx=0;

ty=0;

updateTransform();

}

function updateTransform(){

viewerImg.style.transform=
`translate(${tx}px,${ty}px) scale(${scale})`;

}

document.querySelector(".viewer-close").onclick=()=>{

viewer.classList.remove("active");

};

document.querySelector(".viewer-prev").onclick=()=>{

current=(current-1+gallery.length)%gallery.length;

openImage();

};

document.querySelector(".viewer-next").onclick=()=>{

current=(current+1)%gallery.length;

openImage();

};

viewerImg.onwheel=(e)=>{

e.preventDefault();

scale+=e.deltaY<0?0.15:-0.15;

scale=Math.max(1,Math.min(scale,8));

updateTransform();

};

let dragging=false;

let sx=0;

let sy=0;

viewerImg.onmousedown=(e)=>{

dragging=true;

sx=e.clientX-tx;

sy=e.clientY-ty;

viewerImg.style.cursor="grabbing";

};

window.onmouseup=()=>{

dragging=false;

viewerImg.style.cursor="grab";

};

window.onmousemove=(e)=>{

if(!dragging)return;

tx=e.clientX-sx;

ty=e.clientY-sy;

updateTransform();

};

viewer.onclick=e=>{

if(e.target===viewer)

viewer.classList.remove("active");

};

window.onkeydown=e=>{

if(!viewer.classList.contains("active"))

return;

if(e.key==="ArrowRight")

document.querySelector(".viewer-next").click();

if(e.key==="ArrowLeft")

document.querySelector(".viewer-prev").click();

if(e.key==="Escape")

viewer.classList.remove("active");

};