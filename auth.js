/* HostelMate AI — login pages + landing page behaviour (no dashboard code here) */
const SESSION_KEY = "hostelmate-ai-session";
const WARDEN_CODE = "warden123"; // demo only: front-end code is visible to anyone, so this is not real security
const DASHBOARDS = { student: "student-dashboard.html", warden: "warden-dashboard.html" };
const q = (s) => document.querySelector(s);

function toast(msg){const el=q("#toast");if(!el)return;el.textContent=msg;el.classList.add("show");clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.remove("show"),2800)}
function getSession(){try{return JSON.parse(sessionStorage.getItem(SESSION_KEY))}catch{return null}}

/* ---- Login pages ---- */
const loginRole = document.body.dataset.loginRole;
if (loginRole) {
  // Already logged in with this role in this tab? Go straight to the dashboard.
  const s = getSession();
  if (s && s.role === loginRole) location.replace(DASHBOARDS[loginRole]);

  q("#loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const err = q("#authError");
    const name = q("#loginName").value.trim();
    err.textContent = "";
    if (!name) { err.textContent = "Please enter your name."; return; }
    if (loginRole === "warden" && q("#loginCode").value !== WARDEN_CODE) {
      err.textContent = "Incorrect access code. Please try again.";
      q("#loginCode").select();
      return;
    }
    const idField = q("#loginId");
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ role: loginRole, name, studentId: idField ? idField.value.trim() : "" }));
    location.href = DASHBOARDS[loginRole];
  });
}

/* ---- Landing page ---- */
const menuToggle = q("#menuToggle");
if (menuToggle) menuToggle.addEventListener("click", () => q("#loginChooser")?.classList.remove("hidden"));
document.querySelectorAll("[data-open-login]").forEach((b) => b.addEventListener("click", () => q("#loginChooser")?.classList.remove("hidden")));
document.querySelectorAll("[data-close-modal]").forEach((b) => b.addEventListener("click", () => q("#loginChooser")?.classList.add("hidden")));
q("#loginChooser")?.addEventListener("click", (e) => { if (e.target.id === "loginChooser") e.target.classList.add("hidden"); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") q("#loginChooser")?.classList.add("hidden"); });
document.querySelectorAll('a[href^="#"]').forEach((a) => a.addEventListener("click", (e) => {
  const t = a.getAttribute("href").length > 1 && document.querySelector(a.getAttribute("href"));
  if (t) { e.preventDefault(); t.scrollIntoView({ behavior: "smooth" }); }
}));
