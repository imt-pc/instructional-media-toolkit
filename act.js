document.addEventListener("DOMContentLoaded", () => {

    // ================= UI =================
    const icon = document.createElement("div");
    icon.className = "activity-icon";
    icon.textContent = "📊";
    document.body.appendChild(icon);

    const popup = document.createElement("div");
    popup.className = "activity-popup";
    popup.innerHTML = `
        <h4>Platform Activity</h4>
        <p>🟢 Online: <span id="online">0</span></p>
        <p>🔴 Offline: <span id="offline">0</span></p>
        <h5>Recent Visits</h5>
        <ul id="visits"></ul>
    `;
    document.body.appendChild(popup);

    // Toggle
    icon.onclick = () => popup.classList.toggle("show");

    document.addEventListener("click", (e) => {
        if (!popup.contains(e.target) && !icon.contains(e.target)) {
            popup.classList.remove("show");
        }
    });

    // ================= LOGIC =================

    const userId = "u_" + Date.now();

    let users = JSON.parse(localStorage.getItem("users")) || {};
    let visits = JSON.parse(localStorage.getItem("visits")) || [];
    let total = localStorage.getItem("total") || 0;

    total++;
    localStorage.setItem("total", total);

    users[userId] = Date.now();

    visits.push(new Date().toLocaleTimeString());
    if (visits.length > 5) visits.shift();

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("visits", JSON.stringify(visits));

    function clean() {
        const now = Date.now();
        for (let id in users) {
            if (now - users[id] > 10000) delete users[id];
        }
        localStorage.setItem("users", JSON.stringify(users));
    }

    function update() {
        clean();

        const online = Object.keys(users).length;
        const offline = total - online;

        document.getElementById("online").textContent = online;
        document.getElementById("offline").textContent = offline;

        const ul = document.getElementById("visits");
        ul.innerHTML = "";

        visits.slice().reverse().forEach(v => {
            const li = document.createElement("li");
            li.textContent = v;
            ul.appendChild(li);
        });
    }

    setInterval(() => {
        users[userId] = Date.now();
        localStorage.setItem("users", JSON.stringify(users));
        update();
    }, 2000);

    update();
});