document.addEventListener("DOMContentLoaded", () => {
    console.log("Sistema MHEBERT Iniciado");

    // --- 1. CARGA DE PRODUCTOS DINÁMICOS ---
    const contenedorProductos = document.getElementById("lista-productos");
    
    // Solo se ejecuta si existe el contenedor (para no dar error en otras páginas)
    if (contenedorProductos) {
        const productos = [
            {
                titulo: "Café Molido",
                desc: "Sabor balanceado y aroma intenso.",
                img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80"
            },
            {
                titulo: "Grano Entero",
                desc: "Para los amantes del café recién molido.",
                img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=400&q=80"
            },
            {
                titulo: "Libra y Kilos",
                desc: "Comodidad sin sacrificar calidad.",
                img: "https://images.unsplash.com/photo-1600185367440-4aa7200e1f35?auto=format&fit=crop&w=400&q=80"
            },
            {
                titulo: "Edición Barista",
                desc: "Notas de chocolate oscuro y nuez.",
                img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=400&q=80"
            }
        ];

        let htmlGenerado = "";
        productos.forEach(prod => {
            htmlGenerado += `
                <article class="card">
                    <img src="${prod.img}" alt="${prod.titulo}">
                    <h3>${prod.titulo}</h3>
                    <p>${prod.desc}</p>
                </article>
            `;
        });
        contenedorProductos.innerHTML = htmlGenerado;
    }

    // --- 2. TU LÓGICA DE GALERÍA ORIGINAL (Preservada) ---
    const scroll = document.querySelector(".gallery-scroll");
    const lightbox = document.getElementById("lightbox");
    
    if (scroll && lightbox) {
        const lbImg = lightbox.querySelector("img");

        document.querySelector(".next").onclick = () => scroll.scrollBy({left:300, behavior:'smooth'});
        document.querySelector(".prev").onclick = () => scroll.scrollBy({left:-300, behavior:'smooth'});

        // Optimización: Usamos delegación de eventos para no añadir onclick a cada foto
        scroll.addEventListener('click', (e) => {
            if(e.target.tagName === 'IMG') {
                lightbox.classList.remove("hidden");
                lbImg.src = e.target.src;
            }
        });

        lightbox.onclick = () => lightbox.classList.add("hidden");
    }
});
