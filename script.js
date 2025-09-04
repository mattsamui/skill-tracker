let skills = JSON.parse(localStorage.getItem("skills")) || [];

function saveSkills() {
  localStorage.setItem("skills", JSON.stringify(skills));
}

function renderSkills() {
  const skillsList = document.getElementById("skillsList");
  skillsList.innerHTML = "";
  skills.forEach((skill, index) => {
    let progress = ((skill.hours / 10000) * 100).toFixed(2);

    let div = document.createElement("div");
    div.className = "skill";
    div.innerHTML = `
      <strong>${skill.name}</strong>
      <p>${skill.hours} / 10,000 hours</p>
      <div class="progress"><div class="progress-bar" style="width:${progress}%"></div></div>
      <button onclick="addHour(${index})">+1 Hour</button>
      <button onclick="deleteSkill(${index})">Delete</button>
    `;
    skillsList.appendChild(div);
  });
}

function addSkill() {
  const skillName = document.getElementById("skillName").value.trim();
  if (skillName) {
    skills.push({ name: skillName, hours: 0 });
    saveSkills();
    renderSkills();
    document.getElementById("skillName").value = "";
  }
}

function addHour(index) {
  skills[index].hours++;
  saveSkills();
  renderSkills();
}

function deleteSkill(index) {
  skills.splice(index, 1);
  saveSkills();
  renderSkills();
}

renderSkills();
