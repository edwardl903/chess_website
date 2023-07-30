// JavaScript code to handle roster and bracket generation
document.addEventListener("DOMContentLoaded", () => {
  const rosterIndicator = document.getElementById("roster-indicator");
  const rosterList = document.getElementById("roster-list");
  const addParticipantForm = document.getElementById("add-participant-form");
  const generateBracketsBtn = document.getElementById("generate-brackets-btn");
  const nextRoundBtn = document.getElementById("next-round-btn");
  const newTournamentBtn = document.getElementById("new-tournament-btn");
  const bracketsContainer = document.getElementById("brackets");
  const historyList = document.getElementById("history-list");
  const winnerMessage = document.getElementById("winner-message");
  const winnerName = document.getElementById("winner-name");

  let roster = [];
  let matches = [];
  let round = 0;
  let winnersHistory = [];

  addParticipantForm.addEventListener("submit", addParticipant);
  generateBracketsBtn.addEventListener("click", generateBrackets);
  nextRoundBtn.addEventListener("click", nextRound);
  newTournamentBtn.addEventListener("click", newTournament);

  function addParticipant(event) {
    event.preventDefault();
    const participantNameInput = document.getElementById("participant-name");
    const participantName = participantNameInput.value.trim();

    if (participantName === "") return;

    if (roster.length >= 16) {
      alert("Roster is already full (16 participants).");
      return;
    }

    if (!roster.includes(participantName)) {
      roster.push(participantName);
      updateRoster();
    } else {
      alert("Participant is already in the roster.");
    }

    participantNameInput.value = "";
  }

  function updateRoster() {
    rosterIndicator.textContent = `${roster.length}/16`;
    rosterList.innerHTML = "";
    roster.forEach((participant, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = `Participant ${index + 1}: ${participant}`;
      rosterList.appendChild(listItem);
    });
  }

  function generateBrackets() {
    if (roster.length < 2) {
      alert("Insufficient participants in the roster. Minimum 2 participants required.");
      return;
    }

    if (roster.length % 2 !== 0) {
      alert("Number of participants in the roster must be even to create brackets.");
      return;
    }

    matches = generateMatches(roster);
    displayBrackets(matches);
    round = 1;
    nextRoundBtn.disabled = false;
    newTournamentBtn.disabled = true;
    generateBracketsBtn.disabled = true;
  }

  function generateMatches(roster) {
    const shuffledRoster = shuffleArray(roster);
    const matches = [];
    for (let i = 0; i < shuffledRoster.length; i += 2) {
      const match = [shuffledRoster[i], shuffledRoster[i + 1]];
      matches.push(match);
    }
    return matches;
  }

  function displayBrackets(matches) {
    bracketsContainer.innerHTML = "";
    matches.forEach((match, index) => {
      const matchContainer = document.createElement("div");
      matchContainer.classList.add("match");
      bracketsContainer.appendChild(matchContainer);

      const participant1 = match[0] || "BYE";
      const participant2 = match[1] || "BYE";

      const participant1Elem = createParticipantElement(participant1, index, 0);
      const participant2Elem = createParticipantElement(participant2, index, 1);

      const vsElem = createVsElement();

      matchContainer.appendChild(participant1Elem);
      matchContainer.appendChild(vsElem);
      matchContainer.appendChild(participant2Elem);

      const winnerButton1 = createWinnerButton(index, 0);
      const winnerButton2 = createWinnerButton(index, 1);

      matchContainer.appendChild(winnerButton1);
      matchContainer.appendChild(winnerButton2);
    });
  }

  function createParticipantElement(participant, matchIndex, participantIndex) {
    const participantElem = document.createElement("button");
    participantElem.classList.add("participant");
    participantElem.textContent = participant;
    participantElem.addEventListener("click", () => markWinner(matchIndex, participantIndex));
    return participantElem;
  }

  function createVsElement() {
    const vsElem = document.createElement("div");
    vsElem.classList.add("vs");
    vsElem.textContent = "VS";
    return vsElem;
  }

  function createWinnerButton(matchIndex, winnerIndex) {
    const winnerButton = document.createElement("button");
    winnerButton.classList.add("winner-button");
    winnerButton.textContent = "Select Winner";
    winnerButton.addEventListener("click", () => markWinner(matchIndex, winnerIndex));
    return winnerButton;
  }

  function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
    }
    return shuffledArray;
  }

  function markWinner(matchIndex, winnerIndex) {
    const matchContainer = bracketsContainer.children[matchIndex];
    const winnerButtons = matchContainer.querySelectorAll(".winner-button");
    const winner = matches[matchIndex][winnerIndex];
    winnerButtons.forEach((button, index) => {
      if (index === winnerIndex) {
        button.textContent = `${winner} (Winner)`;
        button.disabled = true;
      } else {
        button.textContent = "Select Winner";
        button.disabled = false;
      }
    });
  }

  function nextRound() {
    const winners = [];
    for (let i = 0; i < matches.length; i++) {
      const matchContainer = bracketsContainer.children[i];
      const winnerButtons = matchContainer.querySelectorAll(".winner-button");
      let winner = null;
      winnerButtons.forEach((button, index) => {
        if (!button.disabled) {
          alert("Please select a winner for each match.");
          winner = null;
          return;
        }
        if (button.textContent.includes("Winner")) {
          winner = matches[i][index];
        }
      });
      if (winner !== null) {
        winners.push(winner);
      } else {
        return;
      }
    }

    if (winners.length === matches.length) {
      if (winners.length === 1) {
        showWinnerMessage(winners[0]);
        nextRoundBtn.disabled = true;
        newTournamentBtn.disabled = false;
      } else {
        updateHistory(winners);
        roster = winners;
        rosterIndicator.textContent = `${roster.length}/16`;
        generateBrackets();
        round++;
        nextRoundBtn.disabled = true;
        newTournamentBtn.disabled = true;
      }
    }
  }

  function updateHistory(winners) {
    const roundItem = document.createElement("li");
    roundItem.textContent = `Round ${round}: ${winners.join(" > ")}`;
    historyList.appendChild(roundItem);
  }

  function showWinnerMessage(winner) {
    winnerMessage.style.display = "block";
    winnerName.textContent = winner;
  }

  function newTournament() {
    roster = [];
    matches = [];
    round = 0;
    winnersHistory = [];
    nextRoundBtn.disabled = true;
    generateBracketsBtn.disabled = false;
    newTournamentBtn.disabled = true;
    updateRoster();
    bracketsContainer.innerHTML = "";
    historyList.innerHTML = "";
    winnerMessage.style.display = "none";
    winnerName.textContent = "";
  }
});
