let groupA = [];
let groupB = [];

// وظيفة جمع الأسماء والبدء في التوزيع
function startMatching() {
    let groupAInput = document.getElementById("groupAInput").value.trim();
    let groupBInput = document.getElementById("groupBInput").value.trim();

    groupA = groupAInput.split("\n").map(name => name.trim()).filter(name => name !== "");
    groupB = groupBInput.split("\n").map(name => name.trim()).filter(name => name !== "");

    if (groupA.length === 0 && groupB.length === 0) {
        alert("يرجى إدخال الأسماء لتكوين الفرق!");
        return;
    }

    matchGroups();
}

// وظيفة إنشاء قائمة ألوان عشوائية
function getShuffledColors(numPairs) {
    const colors = ["#85C1E9", "#F7C6C7", "#F9E79F", "#A3E4D7", "#D2B4DE", "#82E0AA", "#F0B27A", "#BB8FCE", "#E59866"];
    let shuffled = colors.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numPairs);
}

// وظيفة تكوين الفرق
function matchGroups() {
    let resultContainer = document.getElementById("resultContainer");
    resultContainer.innerHTML = ""; // مسح النتائج السابقة

    let pairs = [];

    if (groupA.length > 0 && groupB.length > 0) {
        // توزيع الأسماء عشوائيًا من المجموعتين
        let shuffledA = [...groupA].sort(() => Math.random() - 0.5);
        let shuffledB = [...groupB].sort(() => Math.random() - 0.5);

        for (let i = 0; i < Math.min(shuffledA.length, shuffledB.length); i++) {
            pairs.push({ teamA: shuffledA[i], teamB: shuffledB[i] });
        }
    } else {
        // إذا كانت مجموعة واحدة فقط، وزّع داخلها
        let singleGroup = groupA.length > 0 ? groupA : groupB;
        let shuffledSingle = [...singleGroup].sort(() => Math.random() - 0.5);

        for (let i = 0; i < shuffledSingle.length - 1; i += 2) {
            pairs.push({ teamA: shuffledSingle[i], teamB: shuffledSingle[i + 1] });
        }

        if (shuffledSingle.length % 2 === 1) {
            pairs.push({ teamA: shuffledSingle[shuffledSingle.length - 1], teamB: "بدون شريك" });
        }
    }

    let colors = getShuffledColors(pairs.length);

    // عرض النتائج مع تنسيق الفرق
    pairs.forEach((pair, index) => {
        let matchDiv = document.createElement("div");
        matchDiv.className = "match";
        matchDiv.style.backgroundColor = colors[index]; // تعيين لون فريد لكل فريق
        matchDiv.style.display = "flex";
        matchDiv.style.justifyContent = "space-between"; // يجعل رقم الفريق في أقصى اليسار
        matchDiv.style.alignItems = "center";
        matchDiv.style.padding = "10px";

        let teamNumber = document.createElement("strong");
        teamNumber.textContent = `الفريق ${index + 1}`;
        teamNumber.style.marginRight = "auto"; // دفع رقم الفريق إلى أقصى اليسار

        let teamNames = document.createElement("span");
        teamNames.innerHTML = `${pair.teamA} 🎮 ${pair.teamB}`;
        teamNames.style.margin = "0 auto"; // يجعل الأسماء في المنتصف

        matchDiv.appendChild(teamNumber);
        matchDiv.appendChild(teamNames);
        resultContainer.appendChild(matchDiv);
    });
}
