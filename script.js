let groupA = [];
let groupB = [];

// Function to collect names and start matching
function startMatching() {
    let groupAInput = document.getElementById("groupAInput").value.trim();
    let groupBInput = document.getElementById("groupBInput").value.trim();

    groupA = groupAInput.split("\n").map(name => name.trim()).filter(name => name !== "");
    groupB = groupBInput.split("\n").map(name => name.trim()).filter(name => name !== "");

    if (groupA.length === 0 && groupB.length === 0) {
        alert("يعني احا دخّلي اسماء عشان تطلع التيمات");
        return;
    }

    matchGroups();
}

// Function to generate a shuffled list of unique colors
function getShuffledColors(numPairs) {
    const colors = ["#85C1E9", "#F7C6C7", "#F9E79F", "#A3E4D7", "#D2B4DE", "#82E0AA", "#F0B27A", "#BB8FCE", "#E59866"];
    let shuffled = colors.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numPairs);
}

// Function to match teams
function matchGroups() {
    let resultContainer = document.getElementById("resultContainer");
    resultContainer.innerHTML = ""; // Clear previous results

    let pairs = [];

    if (groupA.length > 0 && groupB.length > 0) {
        // Shuffle and match from both groups
        let shuffledA = [...groupA].sort(() => Math.random() - 0.5);
        let shuffledB = [...groupB].sort(() => Math.random() - 0.5);

        for (let i = 0; i < Math.min(shuffledA.length, shuffledB.length); i++) {
            pairs.push({ teamA: shuffledA[i], teamB: shuffledB[i] });
        }
    } else {
        // If one group is empty, match names within the same group
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

    // Display results with unique colors
    pairs.forEach((pair, index) => {
        let matchDiv = document.createElement("div");
        matchDiv.className = "match";
        matchDiv.style.backgroundColor = colors[index]; // Assign unique color
        matchDiv.innerHTML = `<span>${pair.teamA}</span> 🎮 <span>${pair.teamB}</span>`;
        resultContainer.appendChild(matchDiv);
    });
}
