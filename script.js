const paragraphs = {
    easy: "This is a simple typing test.",
    medium: "The quick brown fox jumps over the lazy dog.",
    hard: "Typing tests can measure speed and accuracy effectively."
};

const startButton = document.getElementById("start-button");
const userInput = document.getElementById("user-input");
const testParagraph = document.getElementById("test-paragraph");
const difficulty = document.getElementById("difficulty");
const progress = document.getElementById("progress");
const speedDisplay = document.getElementById("speed");
const accuracyDisplay = document.getElementById("accuracy");

let startTime, timer, charCount = 0;

startButton.addEventListener("click", () => {
    const selectedDifficulty = difficulty.value;
    testParagraph.textContent = paragraphs[selectedDifficulty];
    userInput.value = "";
    userInput.disabled = false;
    userInput.focus();
    startTime = new Date();
    charCount = paragraphs[selectedDifficulty].length;

    progress.style.width = "0";
    speedDisplay.textContent = "";
    accuracyDisplay.textContent = "";

    userInput.addEventListener("input", onTyping);
    timer = setInterval(updateProgress, 100);
});

function onTyping() {
    const text = userInput.value;
    const testText = testParagraph.textContent;

    const typedLength = text.length;
    let correctCount = 0;

    for (let i = 0; i < typedLength; i++) {
        if (text[i] === testText[i]) correctCount++;
    }

    if (typedLength === charCount || text === testText) {
        clearInterval(timer);
        userInput.disabled = true;

        const timeTaken = (new Date() - startTime) / 1000;
        const speed = Math.round((typedLength / timeTaken) * 60);
        const accuracy = Math.round((correctCount / charCount) * 100);

        speedDisplay.textContent = `Typing Speed: ${speed} WPM`;
        accuracyDisplay.textContent = `Accuracy: ${accuracy}%`;
    }
}

function updateProgress() {
    const typedLength = userInput.value.length;
    const progressPercentage = (typedLength / charCount) * 100;
    progress.style.width = `${progressPercentage}%`;
}
