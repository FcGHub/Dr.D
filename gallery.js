const scroll = document.querySelector(".gallery-scroll");
document.querySelector(".next").onclick = () => scroll.scrollBy({left:300, behavior:'smooth'});
document.querySelector(".prev").onclick = () => scroll.scrollBy({left:-300, behavior:'smooth'});

const lb = document.getElementById("lightbox");
const lbImg = lb.querySelector("img");

scroll.querySelectorAll("img").forEach(img => {
    img.onclick = () => {
        lb.classList.remove("hidden");
        lbImg.src = img.src;
    };
});
lb.onclick = () => lb.classList.add("hidden");
