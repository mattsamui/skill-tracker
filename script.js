let skills = JSON.parse(localStorage.getItem("skills")) || [];

// Save skills to localStorage
function saveSkills() {
  localStorage.setItem("skills", JSON.stringify(skills));
}

// Render all skills
function renderSkills() {
  const skillsList = document.getElementById("skillsList");
  skillsList.innerHTML = "";

  skills.forEach((skill, index) => {
    // Calculate elapsed seconds if running
    if (skill.running && skill.startTime) {
      const elapsed = Math.floor((Date.now() - skill.startTime) / 1000);
      skill.seconds = skill.secondsSaved + elapsed;
    }

    const percent = Math.min(100, ((skill.seconds || 0) / (skill.targetHours * 3600)) * 100).toFixed(2);

    const div = document.createElement("div");
    div.className = "skill";
    div.innerHTML = `
      <strong>${skill.name}</strong>
      <p>Time Spent: ${formatTime(skill.seconds || 0)} / ${skill.targetHours}h</p>
      <div class="progress"><div class="progress-bar" style="width:${percent}%"></div></div>
      <button onclick="toggleTimer(${index})">${skill.running ? "Stop" : "Start"} Timer</button>
      <button onclick="addManual(${index})">+ Log Minutes</button>
      <button onclick="deleteSkill(${index})">Delete</button>
    `;
    skillsList.appendChild(div);
  });
}

// Format seconds into HH:MM:SS
function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m, s].map(v => v.toString().padStart(2,"0")).join(":");
}

// Add a new skill
document.getElementById("addSkillBtn").addEventListener("click", () => {
  const name = document.getElementById("skillName").value.trim();
  if (!name) return alert("Enter skill name.");
  skills.push({ name, targetHours: 10000, seconds: 0, secondsSaved: 0, running: false, startTime: null });
  saveSkills();
  renderSkills();
  document.getElementById("skillName").value = "";
});
// Add a new event
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("addSkillBtn").addEventListener("click", () => {
    const name = document.getElementById("skillName").value.trim();
    if (!name) return alert("Enter skill name.");
    skills.push({ name, targetHours: 10000, seconds: 0, secondsSaved: 0, running: false, startTime: null });
    saveSkills();
    renderSkills();
    document.getElementById("skillName").value = "";
  });
});

// Start/Stop timer
function toggleTimer(index) {
  const skill = skills[index];
  if (skill.running) {
    // stop timer
    skill.secondsSaved = skill.seconds;
    skill.running = false;
    skill.startTime = null;
  } else {
    skill.running = true;
    skill.startTime = Date.now();
  }
  saveSkills();
  renderSkills();
}

// Manually log minutes
function addManual(index) {
  const mins = prompt("Enter minutes:");
  const val = parseInt(mins);
  if (!isNaN(val) && val > 0) {
    skills[index].seconds += val * 60;
    skills[index].secondsSaved = skills[index].seconds;
    saveSkills();
    renderSkills();
  }
}

// Delete a skill
function deleteSkill(index) {
  if (confirm("Delete this skill?")) {
    skills.splice(index, 1);
    saveSkills();
    renderSkills();
  }
}

// Update timers every second
setInterval(() => {
  skills.forEach(skill => {
    if (skill.running && skill.startTime) {
      skill.seconds = skill.secondsSaved + Math.floor((Date.now() - skill.startTime)/1000);
    }
  });
  renderSkills();
}, 1000);

renderSkills();

