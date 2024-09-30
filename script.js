document.getElementById('drop-btn').addEventListener('click', dropDisk);

function dropDisk() {
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
            disk.style.top = `${top}px`;
            // Randomly change direction
            if (Math.random() < 0.5) {
                x += 5;
            } else {
                x -= 5;
            }
            disk.style.left = `${Math.max(0, Math.min(board.clientWidth - 20, x))}px`;
        } else {
            clearInterval(fallInterval);
            calculateResult(x);
            disk.remove();
        }
    }, 100);
}

function calculateResult(x) {
    const slots = document.querySelectorAll('.slot');
    const slotWidth = slots[0].clientWidth;
    const slotIndex = Math.floor(x / slotWidth);
    const value = slots[slotIndex].getAttribute('data-value');
    document.getElementById('result').innerText = `You dropped into slot: ${value}`;
}
