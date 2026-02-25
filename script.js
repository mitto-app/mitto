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
    "この24時間で、あなたの心の中で一番大きな面積を占めていた感情は何ですか？",
    "直近の自分に対して「よくやった」と声をかけたくなったのは、どんな瞬間・行動ですか？",
    "最近、あなたの心を一瞬でもパッと明るくしてくれた出来事は何ですか？",
    "誰の許可もいらないとしたら、今この瞬間に何をしたいですか？",
    "心の中に残っている「モヤモヤ」を書き出してみてください。",
    "もし過去の自分に「そのままで大丈夫だよ」と伝えるなら、いつの自分になんと言いたいですか？",
    "他人の評価を完全に無視していいなら、あなたが純粋に「好き」と言えるものは何？",
    "自分を少しだけ楽にするために、今すぐできる「小さな親切」は何ですか？",
    "あなたの弱さをさらけ出しても「安全だ」と感じられる人は誰ですか？",
    "直近で、あなたのエネルギーを奪ったものと、逆に充電してくれたものは何？",
    "あなたが人生で最も大切にしたい「価値観」を3つだけ挙げてください。",
    "最近出会った言葉の中で、今のあなたを支えてくれているものはありますか？",
    "子供の頃のあなたが今のあなたを見たら、どんな感想を持つでしょうか？",
    "今、あなたの成長を足止めしている「古い思い込み」を手放すとしたら何ですか？",
    "誰かにかけられた言葉で、あなたの心の温度を1度上げてくれたものは？",
    "もし一切の制限がないとしたら、どんな一日に最高の幸福を感じますか？",
    "昨日と比較して、ほんの数ミリでも「変化したな」と思う部分はありますか？",
    "頑張っている自分に、物ではない「体験のプレゼント」を贈るなら何がいい？",
    "過去の自分に対して「あれで良かったんだよ」と許してあげたいことは？",
    "あなたがこれまでの逆境から学んだ、最も強力な「生きる知恵」は何ですか？",
    "今、物理的な距離を超えて、心の中でハグしたい人は誰ですか？",
    "あなたの人生の「今の章」にタイトルをつけるなら、何になりますか？",
    "最近、感情が動いて涙が出そうになった時、あなたの心は何を叫んでいましたか？",
    "あなたがこれまでの人生で、周囲に流されずに下した「最高の決断」は何？",
    "「〜しなければならない」という鎖から、自分を一本だけ解き放つなら？",
    "理想の休日の過ごし方は？",
    "あなたの心を一瞬でフラットに戻してくれる「音」や「香り」は何ですか？",
    "あなたが「ここにいていいんだ」と心の底から安心できるのはどんな時？",
    "あなたの感性に深い影響を与えた、忘れられない一冊や一作は何ですか？",
    "直近で食べたものの中で、あなたの細胞が喜んでいると感じた味は何ですか？",
    "今の生活で、あなたが最も「自分らしくコントロールできている」のはどこ？",
    "もう十分使い古した、そろそろ卒業したい「思考のパターン」は何ですか？",
    "今の自分に「もっと自由になっていいよ」と許可を出せることは何ですか？",
    "どんな環境や条件が揃った時、あなたの本来の輝きが一番増しますか？",
    "今、誰かに「助けて」や「寂しい」と言いたいけれど、飲み込んでいることは？",
    "あなたがこれまでに受け取った言葉のギフトの中で、一番の宝物は何ですか？",
    "最近、新しくインストールした「世界を見るための視点」はありますか？",
    "あなたにとっての「豊かな人生」を、資産以外の言葉で表現してください。",
    "直近で、見返りを期待せずに誰かに差し出した「優しさ」はありますか？",
    "今のあなたにとって、最高のリフレッシュになる「逃避行」はどんなもの？",
    "もし明日が人生最後の日だとしたら、一番伝えたい言葉は何ですか？",
    "あなたの親友が今のあなたと同じ状況なら、どんな優しい言葉をかけますか？",
    "あなたが「尊敬する人」の要素や条件は？",
    "今、特定の誰かに対して抱いている「未消化のメッセージ」はありますか？",
    "あなたが「自分を100%解放している」と感じるのは、どんな瞬間ですか？",
    "あなたが「生きてるって素晴らしいな」と、理屈抜きで感じる瞬間は？",
    "今の自分に「合格点」をあげるとしたら、どの部分を一番評価したいですか？",
    "あなたが一生大切に抱えていきたい、心が震えた「あの時の景色」は？",
    "今、この瞬間に目の前にあるもので、感謝できることを3つ見つけてください。",
    "今、この瞬間の自分の幸福度を0〜10で測ると？その理由は？",
    "あなたが理想とするパートナーの条件を3つ挙げるとしたら何ですか？",
    "大切な人に「これだけは理解してほしい」と思っている自分の性質は？",
    "人間関係において、あなたが絶対に譲れない「誠実さ」の基準は何ですか？"
];

let currentQuestion = "";

// --- Init ---
function init() {
    // Check time for theme immediately to prevent flash
    checkTime();

    // Remove the preload class after a very brief delay so CSS transitions can turn back on
    setTimeout(() => {
        document.body.classList.remove('preload');
    }, 50);

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
async function saveAsImage() {
    // We want to capture the card content but NOT the buttons.
    // Let's capture `confirmCard` but hide buttons temporarily just in case style bleeds.
    confirmActions.style.display = 'none';
    confirmCard.classList.add('capturing');

    // 長い文章が途切れないように、一時的に高さの制限とスクロールを解除
    const originalMaxHeight = confirmCard.style.maxHeight;
    const originalOverflow = confirmCard.style.overflow;
    confirmCard.style.maxHeight = 'none';
    confirmCard.style.overflow = 'visible';

    // 1. html2canvasの実行
    const canvas = await html2canvas(confirmCard, {
        scale: 2, // High res
        backgroundColor: null, // Transparent corners if rounded
        logging: false,
        useCORS: true
    });

    // 元のスタイルとボタンを復元
    confirmActions.style.display = 'flex';
    confirmCard.classList.remove('capturing');
    confirmCard.style.maxHeight = originalMaxHeight;
    confirmCard.style.overflow = originalOverflow;

    // 2. Blobへの変換を待機
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
    const file = new File([blob], "mitto_message.png", { type: "image/png" });

    // 3. 共有の実行（ここを async/await で直結させる）
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
            await navigator.share({
                files: [file],
                title: 'mitto',
                text: '心を海に放ちました。',
            });
        } catch (err) {
            // 失敗時やキャンセル時は、予備としてダウンロードを実行
            downloadFallback(canvas);
        }
    } else {
        downloadFallback(canvas);
    }
}

// 予備のダウンロード処理
function downloadFallback(canvas) {
    const link = document.createElement('a');
    link.href = canvas.toDataURL("image/png");
    link.download = 'mitto_message.png';
    link.click();
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