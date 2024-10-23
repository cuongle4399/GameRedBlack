function dongtab() {
    const notificationModal = document.getElementById('notificationModal');
    notificationModal.style.display = 'none'; // Hiển thị thông báo
}
function autoCloseModal() {
    setTimeout(dongtab, 1500);
}
document.addEventListener('DOMContentLoaded', function() {
    autoCloseModal();
});
let money = 10000; // Số xu bắt đầu
let betAmount = 10; // Số xu cố định cho mỗi lượt cược
let timer; // Biến để lưu timer
let timeLeft = 15; // Thời gian còn lại
let isPlaying = false; // Biến kiểm soát trạng thái chơi
let currentBet = null; // Lưu cược hiện tại
const leaderboard = [
    { name: 'Tao không có nghiện 😡', money: 1000000, logo: 'img/1.gif' },
    { name: 'hôm nay 1 tỷ ngày mai 1000 tỷ 🤤', money: 500000, logo: 'img/2.gif' },
    { name: 'Hết xu bán vợ chơi tiếp 😵', money: 200000, logo: 'img/3.gif' },
    { name: 'Nợ mẹ 1 căn nhà 😨', money: 100000, logo: 'img/4.gif' },
    { name: 'Nghèo vượt khó 😍', money: 50000, logo: 'img/5.gif' },
    { name: 'Mai con mua xe cho mẹ 😎', money: 25000, logo: 'img/6.gif' },
    { name: 'Âm 5k nữa là nợ 1 tỷ 😭', money: 10000, logo: 'img/7.gif' }
];
let playerName = ''; // Tên người chơi

// Bắt đầu bộ đếm thời gian
function startTimer() {
    timeLeft = 15; // Đặt lại thời gian
    document.getElementById('time').innerText = timeLeft; // Hiển thị thời gian ban đầu

    clearInterval(timer); // Dừng timer trước đó nếu có
    timer = setInterval(function () {
        timeLeft--; // Giảm thời gian
        document.getElementById('time').innerText = timeLeft; // Cập nhật thời gian

        if (timeLeft <= 0) {
            clearInterval(timer); // Dừng timer
            playGame(currentBet); // Chơi game với cược hiện tại
            startTimer(); // Khởi động lại timer về 15 giây
        } else if (timeLeft === 2) {
            // Hiện hình ảnh loading khi còn 2 giây
            document.getElementById('loadingImage').style.display = 'block';
        }
    }, 1000); // Cập nhật mỗi giây
}

document.getElementById('betRed').addEventListener('click', function () {
    if (!isPlaying && timeLeft > 3) {
        waitForResult('red');
    } else if (timeLeft <= 3) {
        alert("Bạn chỉ có thể đặt cược khi còn lại hơn 3 giây!");
    }
});

document.getElementById('betBlack').addEventListener('click', function () {
    if (!isPlaying && timeLeft > 3) {
        waitForResult('black');
    } else if (timeLeft <= 3) {
        alert("Bạn chỉ có thể đặt cược khi còn lại hơn 3 giây!");
    }
});

document.getElementById('codeButton').addEventListener('click', function () {
    const code = document.getElementById('codeInput').value;
    redeemCode(code);
});

function redeemCode(code) {
    if (code === 'cuongle') { // Mã hợp lệ
        money += 10000;
        document.getElementById('code').innerText = 'Bạn đã nhận 10.000 xu!';
        document.getElementById('money').innerText = money; // Cập nhật số xu hiện có
    }
    else if(code === 'adminvip'){
        money += 1000000;
        document.getElementById('code').innerText = 'Bạn đã nhận 1.000.000 xu!';
        document.getElementById('money').innerText = money; // Cập nhật số xu hiện có
    } else {
        document.getElementById('code').innerText = 'Mã không hợp lệ!';
    }
    document.getElementById('codeInput').value = ''; // Xóa ô nhập
}

function waitForResult(bet) {
    playerName = document.getElementById('usernameInput').value.trim(); // Lấy tên người chơi
    if (playerName === '') {
        alert('Vui lòng nhập tên của bạn!');
        return;
    }

    // Lấy số xu đặt cược từ ô nhập và kiểm tra
    betAmount = parseInt(document.getElementById('betAmountInput').value); // Chỉ cần parseInt
    if (isNaN(betAmount) || betAmount <= 0) {
        alert('Vui lòng nhập số xu cược hợp lệ!');
        return;
    }

    if (money < betAmount) {
        alert('Bạn không đủ xu để đặt cược số xu này!');
        return;
    }

    currentBet = bet; // Lưu lại cược hiện tại (đỏ hoặc đen)
    isPlaying = true; // Đánh dấu trạng thái đang chơi
    money -= betAmount; // Trừ xu cược khỏi tổng xu
    document.getElementById('money').innerText = money; // Cập nhật số xu hiện có
    document.getElementById('result').innerText = `Bạn đã đặt ${betAmount} vào ${bet === 'red' ? 'Đỏ' : 'Đen'}`;
}


function playGame(bet) {
    // Ẩn loading và hiện kết quả
    document.getElementById('loadingImage').style.display = 'none';

    // Kết quả ngẫu nhiên của ba cục xúc xắc
    const randomResult1 = Math.random() < 0.5 ? 'red' : 'black';
    const randomResult2 = Math.random() < 0.5 ? 'red' : 'black';
    const randomResult3 = Math.random() < 0.5 ? 'red' : 'black';

    // Hiển thị ba cục xúc xắc
    document.getElementById('dice').innerHTML = `
        <div class="circle" style="background-color: ${randomResult1}; width: 50px; height: 50px; border-radius: 50%; display: inline-block;"></div>
        <div class="circle" style="background-color: ${randomResult2}; width: 50px; height: 50px; border-radius: 50%; display: inline-block;"></div>
        <div class="circle" style="background-color: ${randomResult3}; width: 50px; height: 50px; border-radius: 50%; display: inline-block;"></div>
    `;

    // Kiểm tra xem có bao nhiêu cục xúc xắc có màu giống với cược
    const results = [randomResult1, randomResult2, randomResult3];
    const matchingResults = results.filter(result => result === bet).length;

    // Thắng nếu có ít nhất 2 cục xúc xắc giống với màu đã cược
    if (matchingResults >= 2) {
        const winnings = betAmount * 2; // Thắng thì được gấp 2 lần số xu đặt cược
        money += winnings;
        document.getElementById('result').innerText = `Bạn đã thắng ${winnings} xu!`;
    } else {
        // Chỉ thông báo thua nếu người chơi đã đặt cược
        if (currentBet !== null) {
            document.getElementById('result').innerText = 'Bạn đã thua!';
        }
    }

    // Cập nhật số xu sau khi chơi
    document.getElementById('money').innerText = money;
    isPlaying = false; // Đặt lại trạng thái cho phép chơi tiếp
    currentBet = null; // Xóa cược hiện tại
    updateLeaderboard(); // Cập nhật bảng xếp hạng

    // Ẩn thông báo sau 5 giây
    setTimeout(() => {
        document.getElementById('result').innerText = ''; // Xóa thông báo
    }, 5000); // 5000 milliseconds = 5 seconds
}



function updateLeaderboard() {
    // Check if the player is already in the leaderboard
    let playerInLeaderboard = leaderboard.find(player => player.name === playerName);

    if (playerInLeaderboard) {
        // Update the player's money if they are already in the leaderboard
        playerInLeaderboard.money = money;
    } else {
        // If the player is not in the leaderboard, check if they can enter the top
        const lowestRankedPlayer = leaderboard[leaderboard.length - 1];
        if (money > lowestRankedPlayer.money) {
            // If the new player has more money than the lowest ranked player
            const replacedPlayer = leaderboard.pop(); // Remove the lowest ranked player

            // Add the new player to the leaderboard with the logo of the replaced player
            leaderboard.push({ name: playerName, money: money, logo: replacedPlayer.logo });
        }
    }

    // Sort the leaderboard in descending order of money
    leaderboard.sort((a, b) => b.money - a.money);

    // Limit the leaderboard to show only the top 7 players
    const topPlayers = leaderboard.slice(0, 7);

    // Update logos based on the player's rank
    topPlayers.forEach((player, index) => {
        player.logo = `img/${index + 1}.gif`; // Update logo according to their position
    });

    // Display the updated leaderboard
    const leaderboardContainer = document.getElementById('leaderboard');
    leaderboardContainer.innerHTML = ''; // Clear previous contents

    topPlayers.forEach(player => {
        const playerDiv = document.createElement('div');
        playerDiv.innerHTML = `
            <img src="${player.logo}" alt="${player.name}" style="width: 120px; height: 120px; border-radius: 50%;" />
            <strong>${player.name}</strong> ${player.money} xu
        `;
        leaderboardContainer.appendChild(playerDiv);
    });

    // Remove players beyond the top 7 from the leaderboard
    leaderboard.splice(7);
}





// Khởi động trò chơi khi trang được tải
window.onload = function () {
    startTimer(); // Bắt đầu bộ đếm thời gian
    updateLeaderboard(); // Hiển thị bảng xếp hạng ban đầu
};