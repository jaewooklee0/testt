let balance = 100;
const pegsCount = 10; // Number of pegs in each row
const slotsCount = 17; // Total slots

document.getElementById('drop-btn').addEventListener('click', dropDisk);

// Create pegs on the board
function createPegs() {
    const pegsContainer = document.getElementById('pegs');
    const rows = 10;
    const offset = 30;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < pegsCount; j++) {
            const peg = document.createElement('div');
            peg.className = 'peg';
            peg.style.left = `${j * (300 / pegsCount) + (i % 2) * (300 / (pegsCount * 2)) + offset}px`;
            peg.style.top = `${i * 50 + 30}px`;
            pegsContainer.appendChild(peg);
        }
    }
}

// Drop the disk
function dropDisk() {
    const bet = parseInt(document.getElementById('bet').value);
    if (isNaN(bet) || bet <= 0 || bet > balance) {
        alert('Please enter a valid bet amount!');
        return;
    }

    balance -= bet;
    document.getElementById('currency').innerText = balance;

    const board = document.getElementById('plinko-board');
    const disk = document.createElement('div');
    disk.className = 'disk';
    board.appendChild(disk);

    let x = Math.random() * (board.clientWidth - 20);
    disk.style.left = `${x}px`;
    disk.style.top = '0px';
    
    let fallInterval = setInterval(() => {
        let top = parseFloat(disk.style.top);
        if (top < board.clientHeight - 20) {
            top += 5;
            x += (Math.random() < 0.5 ? 5 : -5);
            disk.style.top = `${top}px`;
            disk.style.left = `${Math.max(0, Math.min(board.clientWidth - 20, x))}px`;
        } else {
            clearInterval(fallInterval);
            const result = calculateResult(x);
            updateBalance(result);
            disk.remove();
        }
    }, 100);
}

// Calculate result based on disk's landing position
function calculateResult(x) {
    const slots = document.querySelectorAll('.slot');
    const slotWidth = slots[0].clientWidth;
    const slotIndex = Math.floor(x / slotWidth);
    const value = parseFloat(slots[slotIndex].getAttribute('data-value'));
    return value;
}

// Update balance based on winnings
function updateBalance(winning) {
    balance += winning * bet; // Winnings based on bet
    document.getElementById('currency').innerText = balance;
    document.getElementById('result').innerText = `You won: ${winning * bet} coins!`;
}

// Initialize the game by creating pegs
createPegs();
