// --- Theme SVGs ---
const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 0 0-1.41 0c-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 0 0-1.41 0c-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 0 0 0-1.41c-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.01a.996.996 0 0 0 0-1.41c-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/></svg>`;
const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 3c.132 0 .263 0 .393.007a7.5 7.5 0 0 0 7.92 12.446A9 9 0 1 1 12 3z"/></svg>`;
const githubIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`;

// --- Initials Generation ---
function getInitials(name) {
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .substring(0, 2)
        .toUpperCase();
}

// --- Render Team Grid ---
const teamContainer = document.getElementById("teamContainer");
if (teamContainer && typeof teamMembers !== 'undefined') {
    teamMembers.forEach((member) => {
        const initials = getInitials(member.name);
        teamContainer.innerHTML += `
            <div class="team-card">
                <div class="avatar-placeholder" style="background-color: ${member.color}">
                    ${initials}
                </div>
                <h3>${member.name}</h3>
                <h4>${member.role}</h4>
                <p>${member.bio}</p>
                <a href="${member.github}" class="social-link" target="_blank" rel="noopener noreferrer">
                    ${githubIcon}
                    <span>GitHub</span>
                </a>
            </div>
        `;
    });
}

// --- Render Project Grid ---
const projectContainer = document.getElementById("projectContainer");
if (projectContainer && typeof projects !== 'undefined') {
    projects.forEach((project) => {
        let statusClass = 'status-planned';
        if (project.status.toLowerCase() === 'completed') {
            statusClass = 'status-completed';
        } else if (project.status.toLowerCase() === 'in progress') {
            statusClass = 'status-in-progress';
        }

        projectContainer.innerHTML += `
            <div class="project-card">
                <span class="badge ${statusClass}">
                    ${project.status}
                </span>
                <h3>${project.title}</h3>
                <p>${project.desc}</p>
            </div>
        `;
    });
}

// --- Theme Toggle Logic ---
const themeToggleBtn = document.getElementById("themeToggle");

function updateToggleIcon(isDark) {
    if (themeToggleBtn) {
        themeToggleBtn.innerHTML = isDark ? sunIcon : moonIcon;
    }
}

// Init theme state from local storage or system preference
const savedTheme = localStorage.getItem("theme");
const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const isDarkMode = savedTheme === "dark" || (!savedTheme && systemPrefersDark);

if (isDarkMode) {
    document.body.classList.add("dark");
    updateToggleIcon(true);
} else {
    document.body.classList.remove("dark");
    updateToggleIcon(false);
}

// Click event listener
if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        const currentlyDark = document.body.classList.contains("dark");
        localStorage.setItem("theme", currentlyDark ? "dark" : "light");
        updateToggleIcon(currentlyDark);
    });
}

// --- Active Nav Link Highlighting & Smooth Scroll ---
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 120)) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

// Handle smooth scroll clicks
navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 70, // navbar height offset
                behavior: "smooth"
            });
        }
    });
});