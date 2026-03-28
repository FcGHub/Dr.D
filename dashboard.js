const PASS_CORRECTA = "mhebert123";

document.addEventListener("DOMContentLoaded", () => {
    initApp();
});

function initApp() {
    if (window.lucide) lucide.createIcons();
    
    // Eventos de botones
    document.getElementById("entryBtn").addEventListener("click", login);
    document.getElementById("logoutBtn").addEventListener("click", logout);
    document.getElementById("clearAllBtn").addEventListener("click", clearAll);
    
    // Enter para entrar
    document.getElementById("adminPass").addEventListener("keypress", (e) => {
        if (e.key === "Enter") login();
    });

    // Sincronización entre pestañas
    window.addEventListener('storage', (e) => {
        if (e.key === 'msgs') renderDashboard();
    });

    checkSession();
}

function login() {
    const p = document.getElementById("adminPass").value;
    if (p === PASS_CORRECTA) {
        sessionStorage.setItem("mhebert_auth", "true");
        showDashboard();
    } else {
        const err = document.getElementById("loginError");
        err.style.display = "block";
        setTimeout(() => err.style.display = "none", 3000);
    }
}

function checkSession() {
    const auth = sessionStorage.getItem("mhebert_auth");
    if (auth !== "true") {
        document.getElementById("dashboard").classList.add("hidden");
        document.getElementById("loginOverlay").style.display = "flex";
    } else {
        showDashboard();
    }
}

function showDashboard() {
    document.getElementById("loginOverlay").style.display = "none";
    document.getElementById("dashboard").classList.remove("hidden");
    renderDashboard();
}

function renderDashboard() {
    const msgs = JSON.parse(localStorage.getItem("msgs") || "[]");
    const tbody = document.getElementById("msgBody");
    document.getElementById("totalMsgs").innerText = msgs.length;
    document.getElementById("current-date").innerText = new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });

    if (msgs.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:3rem; color:#888;">No hay mensajes nuevos</td></tr>`;
        return;
    }

    // Mostrar los más nuevos arriba
    tbody.innerHTML = msgs.slice().reverse().map((m, index) => {
        const realIndex = msgs.length - 1 - index;
        return `
        <tr>
            <td><strong>${m.n}</strong></td>
<td>
    <div style="margin-bottom: 5px;">
        <small style="color:var(--primary)">Email:</small><br>
        <a href="mailto:${m.e}" style="color:#fff; text-decoration:none; font-size:0.8rem;">${m.e}</a>
    </div>
    <div>
        <small style="color:#25D366">WhatsApp:</small><br>
        <a href="https://wa.me/${m.w.replace(/\D/g,'')}" target="_blank" style="color:#fff; text-decoration:none; font-size:0.8rem;">${m.w}</a>
    </div>
            </td>            <td><div class="msg-wrap">${m.m}</div></td>
            <td><small>${m.d.split(',')[0]}</small></td>
            <td>
                <div style="display:flex; gap:10px;">
                    <button class="action-btn reply" onclick="reply('${m.e}')"><i data-lucide="send"></i></button>
                    <button class="action-btn del" onclick="delMsg(${realIndex})"><i data-lucide="trash-2"></i></button>
                </div>
            </td>
        </tr>`;
    }).join("");
    
    lucide.createIcons();
}

// FUNCIONES GLOBALES (Aisladas para que no fallen)
window.delMsg = (i) => {
    // Alerta de confirmación estilo "Dark Mode"
    Swal.fire({
        title: '¿Eliminar mensaje?',
        text: "Esta acción no se puede deshacer.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ff4757', // Rojo peligro
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, borrar',
        cancelButtonText: 'Cancelar',
        background: '#12121a',
        color: '#fff'
    }).then((result) => {
        if (result.isConfirmed) {
            // Si dice que sí, ejecutamos TU lógica original de borrado
            let msgs = JSON.parse(localStorage.getItem("msgs"));
            msgs.splice(i, 1);
            localStorage.setItem("msgs", JSON.stringify(msgs));
            renderDashboard();

            // Pequeña notificación de éxito
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                background: '#1abc9c',
                color: '#fff'
            });
            Toast.fire({ icon: 'success', title: 'Mensaje eliminado' });
        }
    });
};

window.reply = (email) => {
    window.location.href = `mailto:${email}?subject=Contacto Café MHEBERT`;
};

window.exportData = () => {
    const data = localStorage.getItem("msgs") || "[]";
    const blob = new Blob([data], {type: "application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "mensajes_mhebert.json"; a.click();
};

function clearAll() {
    if(confirm("¿Borrar TODO el historial?")) {
        localStorage.removeItem("msgs");
        renderDashboard();
    }
}

function logout() {
    sessionStorage.removeItem("mhebert_auth");
    location.reload();
}
