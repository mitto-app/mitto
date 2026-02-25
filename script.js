// --- Elements ---
const bottleWrapper = document.getElementById('bottleWrapper');
const pickupBtn = document.getElementById('pickupBtn');

const inputCard = document.getElementById('inputCard');
const confirmCard = document.getElementById('confirmCard');

const questionText = document.getElementById('questionText');
const journalInput = document.getElementById('journalInput');
const toConfirmBtn = document.getElementById('toConfirmBtn');

const confirmQuestion = document.getElementById('confirmQuestion');
const confirmAnswer = document.getElementById('confirmAnswer');
const saveImageBtn = document.getElementById('saveImageBtn');
const releaseBtn = document.getElementById('releaseBtn');
const confirmActions = document.getElementById('confirmActions');
const captureTarget = document.getElementById('captureTarget');

// Menu
const menuBtn = document.querySelector('.menu-btn');
const sideMenu = document.getElementById('sideMenu');
const closeMenuBtn = document.getElementById('closeMenuBtn');

// --- State & Data ---
const questions = [
    "あなたが「手放したい悪習慣5つ」は？",
    "今日、心が動いた瞬間はありましたか？",
    "自分にかけてあげたい言葉は？",
    "今の自分を色で例えるなら？",
    "感謝したいことは何ですか？"
];

let currentQuestion = "";

// --- Init ---
function init() {
    // Check time for theme
    checkTime();
    setInterval(checkTime, 60000); // Check every minute

    // 1. Initial Setup
    currentQuestion = getTodayQuestion();
    questionText.textContent = currentQuestion;

    // 2. Event Listeners
    bottleWrapper.addEventListener('click', startFlow);
    pickupBtn.addEventListener('click', startFlow);
    toConfirmBtn.addEventListener('click', goToConfirmation);
    saveImageBtn.addEventListener('click', saveAsImage);
    releaseBtn.addEventListener('click', releaseToSea);

    // Menu Listeners
    menuBtn.addEventListener('click', () => {
        sideMenu.classList.add('visible');
    });
    closeMenuBtn.addEventListener('click', () => {
        sideMenu.classList.remove('visible');
    });

    // 3. Click Outside to Close
    document.addEventListener('click', (e) => {
        // If hidden, ignore
        if (inputCard.classList.contains('hidden') && confirmCard.classList.contains('hidden')) return;

        // If clicking inside card or on the pickup button, ignore
        if (e.target.closest('.card') || e.target.closest('#pickupBtn') || e.target.closest('.action-btn')) return;

        // Otherwise (clicking background/sea/sky), reset
        resetApp();
    });
}

function getTodayQuestion() {
    // Random selection
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
}

// --- Flow Steps ---

// Step 1: Pick up Bottle -> Show Input
function startFlow() {
    // Hide Button
    pickupBtn.classList.add('hidden');

    // Animate Bottle Float
    bottleWrapper.classList.remove('released'); // Just in case
    bottleWrapper.classList.add('floating');

    // Wait for float anim (1s) then show card
    setTimeout(() => {
        // Hide Bottle visually while showing card
        bottleWrapper.style.opacity = '0';
        showInputCard();
    }, 800);
}

// Show Input Card
function showInputCard() {
    inputCard.classList.remove('hidden');
    // small delay for transition
    setTimeout(() => {
        inputCard.classList.add('visible');
    }, 50);
}

// Step 2: Input -> Confirmation
function goToConfirmation() {
    const answer = journalInput.value;
    if (!answer.trim()) {
        alert("何か言葉を紡いでみましょう...");
        return;
    }

    // Populate Confirm Card
    confirmQuestion.textContent = currentQuestion;
    confirmAnswer.textContent = answer;

    // Transition
    inputCard.classList.add('exiting');
    inputCard.classList.remove('visible');
    setTimeout(() => {
        inputCard.classList.remove('exiting');
        inputCard.classList.add('hidden');

        confirmCard.classList.remove('hidden');
        setTimeout(() => {
            confirmCard.classList.add('visible');
        }, 50);
    }, 500);
}

// Step 3a: Save Image
function saveAsImage() {
    // We want to capture the card content but NOT the buttons.
    // Let's capture `confirmCard` but hide buttons temporarily just in case style bleeds.
    confirmActions.style.display = 'none';

    // 長い文章が途切れないように、一時的に高さの制限とスクロールを解除
    const originalMaxHeight = confirmCard.style.maxHeight;
    const originalOverflow = confirmCard.style.overflow;
    confirmCard.style.maxHeight = 'none';
    confirmCard.style.overflow = 'visible';

    html2canvas(confirmCard, {
        scale: 2, // High res
        backgroundColor: null, // Transparent corners if rounded
        logging: false,
        useCORS: true
    }).then(canvas => {
        // 元のスタイルとボタンを復元
        confirmActions.style.display = 'flex';
        confirmCard.style.maxHeight = originalMaxHeight;
        confirmCard.style.overflow = originalOverflow;

        // Download
        const link = document.createElement('a');
        link.download = `mitto_${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
}

function checkTime() {
    // 1. Debug/Preview Override via URL (e.g., ?theme=morning)
    const urlParams = new URLSearchParams(window.location.search);
    const themeOverride = urlParams.get('theme');
    if (themeOverride) {
        if (themeOverride === 'day') {
            document.body.removeAttribute('data-theme');
        } else {
            document.body.setAttribute('data-theme', themeOverride);
        }
        return; // Skip time check
    }

    // 2. Normal Time-based Logic
    const now = new Date();
    const hour = now.getHours();

    // Morning: 4 - 9
    if (hour >= 4 && hour < 9) {
        document.body.setAttribute('data-theme', 'morning');
    }
    // Day: 9 - 16
    else if (hour >= 9 && hour < 16) {
        document.body.removeAttribute('data-theme'); // Default
    }
    // Sunset: 16 - 19
    else if (hour >= 16 && hour < 19) {
        document.body.setAttribute('data-theme', 'sunset');
    }
    // Night: 19 - 4
    else {
        document.body.setAttribute('data-theme', 'night');
    }
}
// Step 3b: Release
function releaseToSea() {
    const answer = journalInput.value;
    saveLog(currentQuestion, answer);

    // 1. Hide Card
    confirmCard.classList.add('exiting');
    confirmCard.classList.remove('visible');

    setTimeout(() => {
        confirmCard.classList.remove('exiting');
        confirmCard.classList.add('hidden');

        // 2. Show Bottle Again (for release anim)
        bottleWrapper.style.opacity = '1';
        bottleWrapper.classList.remove('floating');
        bottleWrapper.classList.add('released');

        // 3. Reset after animation
        setTimeout(() => {
            resetApp();
        }, 5000);
    }, 500);
}

function saveLog(question, answer) {
    const log = {
        id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
        timestamp: new Date().toISOString(),
        content: { question, answer }
    };
    try {
        const logs = JSON.parse(localStorage.getItem('mitto_logs') || '[]');
        logs.push(log);
        localStorage.setItem('mitto_logs', JSON.stringify(logs));
        console.log("Saved:", log);
    } catch (e) { console.error(e); }
}

function resetApp() {
    // Reset inputs
    journalInput.value = "";

    // Hide Cards
    inputCard.classList.remove('visible', 'exiting');
    inputCard.classList.add('hidden');
    confirmCard.classList.remove('visible', 'exiting');
    confirmCard.classList.add('hidden');

    // Reset Bottle classes
    bottleWrapper.classList.remove('released');
    bottleWrapper.classList.remove('floating');
    bottleWrapper.classList.add('horizontal');
    bottleWrapper.style.opacity = ''; // Make visible

    // Show pickup button
    pickupBtn.classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', init);