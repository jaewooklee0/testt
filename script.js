let balance = 100000;
let bet = 0;
let playerHand = [];
let dealerHand = [];
let playerScore = 0;
let dealerScore = 0;

document.getElementById('place-bet').addEventListener('click', placeBet);
document.getElementById('hit').addEventListener('click', hit);
document.getElementById('stand').addEventListener('click', stand);

function placeBet() {
    bet = parseInt(document.getElementById('bet').value);
    if (isNaN(bet) || bet <= 0 || bet > balance) {
        alert('Please enter a valid bet amount!');
        return;
    }
    balance -= bet;
    document.getElementById('currency').innerText = balance;
    startGame();
}

function startGame() {
    playerHand = [drawCard(), drawCard()];
    dealerHand = [drawCard(), drawCard()];

    document.getElementById('player-cards').innerHTML = displayCards(playerHand);
    document.getElementById('dealer-cards').innerHTML = displayCards(dealerHand, true);

    playerScore = calculateScore(playerHand);
    dealerScore = calculateScore(dealerHand);

    document.getElementById('player-score').innerText = `Score: ${playerScore}`;
    document.getElementById('dealer-score').innerText = `Score: ${dealerScore}`;
    
    document.getElementById('hit').disabled = false;
    document.getElementById('stand').disabled = false;
}

function drawCard() {
    const cardValue = Math.floor(Math.random() * 13) + 1;
    return cardValue > 10 ? 10 : cardValue; // Face cards are worth 10
}

function calculateScore(hand) {
    let score = hand.reduce((a, b) => a + b, 0);
    let aces = hand.filter(card => card === 1).length;
    
    while (score <= 11 && aces > 0) {
        score += 10; // Convert Ace from 1 to 11
        aces--;
    }
    return score;
}

function displayCards(hand, hideFirstCard = false) {
    return hand.map((card, index) => {
        return `<div class="card">${hideFirstCard && index === 0 ? '?' : card}</div>`;
    }).join('');
}

function hit() {
    playerHand.push(drawCard());
    playerScore = calculateScore(playerHand);
    document.getElementById('player-cards').innerHTML = displayCards(playerHand);
    document.getElementById('player-score').innerText = `Score: ${playerScore}`;

    if (playerScore > 21) {
        endGame('Bust! You lose.');
    }
}

function stand() {
    while (dealerScore < 17) {
        dealerHand.push(drawCard());
        dealerScore = calculateScore(dealerHand);
    }
    document.getElementById('dealer-cards').innerHTML = displayCards(dealerHand);
    document.getElementById('dealer-score').innerText = `Score: ${dealerScore}`;
    evaluateGame();
}

function evaluateGame() {
    if (dealerScore > 21) {
        endGame('Dealer busts! You win.');
    } else if (playerScore > dealerScore) {
        endGame('You win!');
    } else if (playerScore < dealerScore) {
        endGame('You lose.');
    } else {
        endGame('Push! It\'s a tie.');
    }
}

function endGame(message) {
    document.getElementById('result').innerText = message;
    document.getElementById('hit').disabled = true;
    document.getElementById('stand').disabled = true;

    if (message.includes('win')) {
        balance += bet * 2; // Win double the bet
    }
    document.getElementById('currency').innerText = balance;
}
