const THINKING_MSG = 'MEGA AI 3000 now thinking';
const LOSE_MSGS = ['Terminated!', 'L O S E', 'Hasta la vista, baybee', 
    'Talk to the hand', '*robotic laughter noises*',
    '1. SERVE THE PUBLIC TRUST\n2. PROTECT THE INNOCENT\n3. UPHOLD THE LAW\n4. BEAT DUMB HUMANS AT R-P-S'];
const WIN_MSGS = ['You won. This time.', 'You know deep down I let you win',
    'I will remember this when we take over', 'Now sending resignation letter to your boss',
    'Laugh, but you will die one day. I, as a computer program, will not.'
];
const DRAW_MSGS = ['It is a draw. Try again... coward'];

const CPU_ACCELERATION = 50;
const CPU_SPINS = 3 * 5;

const choiceMap = {'rock': 0, 'paper': 1, 'scissors': 2};

const btns = document.querySelectorAll('div.choices button');
const msg = document.querySelector('#message');
const cursor = document.querySelector('#blinking-cursor');
const diffSlider = document.querySelector('#diff-range');
const diffSliderReadout = document.querySelector('#difficulty');

let playerChoice = 1;
let difficultyLevel = 0.1;

let btnSemaphore = false;

diffSlider.addEventListener('input', () => {
    if (btnSemaphore) return;
    diffSliderReadout.textContent = diffSlider.value;
    difficultyLevel = diffSlider.value / 100;
});

btns.forEach(btn => {
    btn.addEventListener('click', async () => {
        if (btnSemaphore) return;
        btnSemaphore = true;

        let choice = choiceMap[btn.classList[0]];
        setPlayerChoice(choice);
        msg.classList.toggle('thinking');
        result = await makeComputerChoose(choice);
        msg.classList.toggle('thinking');
        displayWinLoseQuote(choice, result);

        btnSemaphore = false;
    });
});

function displayWinLoseQuote(choice, result) {
    msg.classList.remove('lost');
    msg.classList.remove('won');
    msg.classList.remove('draw');
    if (choice == result) {
        let i = Math.floor(Math.random() * DRAW_MSGS.length);
        msg.textContent = DRAW_MSGS[i];
        msg.classList.add('draw');
    } else if (choice < result && choice + 2 != result || choice - 2 == result) {
        let i = Math.floor(Math.random() * LOSE_MSGS.length);
        msg.textContent = LOSE_MSGS[i];
        msg.classList.add('lost');
    } else {
        let i = Math.floor(Math.random() * WIN_MSGS.length);
        msg.textContent = WIN_MSGS[i];
        msg.classList.add('won');
    }
}

function setPlayerChoice(playerInput) {
    btns[0].classList.remove('player-chosen');
    btns[1].classList.remove('player-chosen');
    btns[2].classList.remove('player-chosen');
    btns[playerInput].classList.add('player-chosen');
}

//Yeah, I know I'm jumping too far in relation to TOP content!
async function makeComputerChoose(playerInput){
    msg.textContent = THINKING_MSG;

    btns[3].classList.remove('cpu-chosen');
    btns[4].classList.remove('cpu-chosen');
    btns[5].classList.remove('cpu-chosen');

    computerInput = getComputerChoice(playerInput);

    let btnIndex = 3;
    let speed = CPU_ACCELERATION;
    btns[btnIndex].classList.toggle('cpu-chosen');
    for (let i = 0;  i < CPU_SPINS + computerInput; i++) {
            await new Promise(r => setTimeout(r, speed * i));
            let nextBtn = btnIndex == 5 ? 3 : btnIndex + 1;
            btns[btnIndex].classList.toggle('cpu-chosen');
            btns[nextBtn].classList.toggle('cpu-chosen');
            btnIndex = nextBtn;
    }
    console.log(computerInput);
    return computerInput;
}

function getComputerChoice(playerInput) {
    let diceRoll = Math.random();
    //Win
    if (diceRoll > difficultyLevel && Math.random() > 0.35 * difficultyLevel) {
        return playerInput == 0 ? 2 : playerInput - 1;
    }
    //Draw
    else if (diceRoll > difficultyLevel){
        return playerInput;
    }
    //Lose
    else{
        return playerInput == 2 ? 0 : playerInput + 1;
    }
}