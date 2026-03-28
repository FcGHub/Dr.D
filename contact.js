const form = document.getElementById("contactForm");

form.onsubmit = async (e) => {
    e.preventDefault();
    
    // Captura de datos
    const fd = new FormData(form);
    const nombre = fd.get("name") ? fd.get("name").trim() : "";
    const email = fd.get("email") ? fd.get("email").trim() : "";
    const whatsapp = fd.get("whatsapp") ? fd.get("whatsapp").trim() : "";
    const mensaje = fd.get("message") ? fd.get("message").trim() : "";

    // VALIDACIÓN: Nombre y mensaje obligatorios
    if (!nombre || !mensaje) {
        Swal.fire({
            title: 'Campos incompletos',
            text: 'Por favor, escribe tu nombre y tu mensaje.',
            icon: 'warning',
            background: '#151521',
            color: '#fff',
            confirmButtonColor: '#1abc9c'
        });
        return;
    }

    // VALIDACIÓN: Al menos Email o WhatsApp
    if (!email && !whatsapp) {
        Swal.fire({
            title: 'Dato de contacto',
            text: 'Necesitamos tu Email o tu WhatsApp para responderte.',
            icon: 'info',
            background: '#151521',
            color: '#fff',
            confirmButtonColor: '#c5a059'
        });
        return;
    }

    const btn = document.getElementById("submitBtn");
    btn.disabled = true;
    btn.innerText = "Enviando...";

    // Guardado Local para el Dashboard
    const localData = {
        n: nombre,
        e: email || "No indicado",
        w: whatsapp || "No indicado",
        m: mensaje,
        d: new Date().toLocaleString()
    };

    const msgs = JSON.parse(localStorage.getItem("msgs") || "[]");
    msgs.push(localData);
    localStorage.setItem("msgs", JSON.stringify(msgs));
    localStorage.setItem('last_msg_time', Date.now()); 

    // Envío a Formspree
    try {
        const resp = await fetch(form.action, {
            method: 'POST',
            body: fd,
            headers: { 'Accept': 'application/json' }
        });
        
        if (resp.ok) {
            Swal.fire({
                title: '¡Mensaje Enviado!',
                text: 'Te contactaremos muy pronto.',
                icon: 'success',
                background: '#151521',
                color: '#fff',
                confirmButtonColor: '#1abc9c'
            });
            form.reset();
        }
    } catch (error) {
        Swal.fire({
            title: 'Nota de envío',
            text: 'No pudimos conectar con el servidor de correo, pero tu mensaje quedó registrado en nuestro panel administrativo.',
            icon: 'warning',
            background: '#151521',
            color: '#fff'
        });
    } finally {
        btn.disabled = false;
        btn.innerText = "Enviar Mensaje";
    }
};
