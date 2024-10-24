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
var nameTopBxh = []
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
let playerName = document.getElementById('usernameInput').value.trim(); // Tên người chơi

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
        } else if (timeLeft === 3) {
            // Hiện hình ảnh loading khi còn 3 giây
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
        document.getElementById('code').style.display = 'block';
        document.getElementById('code').innerText = 'Bạn đã nhận 10.000 xu!';
        document.getElementById('money').innerText = money; // Cập nhật số xu hiện có
    }
    else if(code === 'adminvip'){
        money += 1000000;
        document.getElementById('code').style.display = 'block';
        document.getElementById('code').innerText = 'Bạn đã nhận 1.000.000 xu!';
        document.getElementById('money').innerText = money; // Cập nhật số xu hiện có
    } else {
        document.getElementById('code').style.display = 'block';
        document.getElementById('code').innerText = 'Mã không hợp lệ!';
    }
    document.getElementById('codeInput').value = ''; // Xóa ô nhập
    // Ẩn thông báo sau 2 giây
    setTimeout(() => {
        document.getElementById('code').style.display = 'none';
    }, 2000);
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
        top = index;
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
        nameTopBxh.push(playerDiv);
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
const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');

// Hàm thêm tin nhắn vào chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.innerHTML = text; // Dùng innerHTML để hỗ trợ hình ảnh
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Cuộn xuống dưới cùng
    if (chatBox.children.length > 100) {
        chatBox.removeChild(chatBox.firstChild); // Xóa tin nhắn đầu tiên
    }
}

// Bot tự động chat
function botChat() {
    const botMessages = [
        "Chào bạn! Hôm nay bạn có khỏe không?",
        "Thời tiết hôm nay đẹp ghê, đi chơi không?",
        "Bạn có thích lập trình không? Mình đang học đây!",
        "Đi đá phò khum :)) Haha, nhớ cẩn thận nhé!",
        "Hành trình lên top 1 web có vẻ khó nhỉ? Ai cùng tham gia không?",
        "Đen rồi, đặt đi thôi! Không thử thì sao biết được!",
        "Ván này đỏ, mình cược hết! Bạn cược gì?",
        "Web này có rút tiền được không nhỉ? Ai biết không?",
        "T sợ đi tù quá bây ơi, chơi có chừng mực nha!",
        "Chán quá, t nợ 1 tỷ r, phải tìm cách kiếm lại!",
        "Đi ăn sáng không bây? Ăn uống cho có sức chơi nào!",
        "Nghiện game rồi, không dứt ra được luôn! Help!",
        "Ai cho tiền t chơi với? Chán quá đi!",
        "gifcode: cuongle nhận được 10k xu á! Ai dùng chưa?",
        "Có code nhận dc 1 tỷ á ae, ai mò ra chưa?",
        "Nghèo rồi, hic, phải cố gắng thôi!",
        "Web bịp, cảm giác như bị lừa á! Máaaaaaa!",
        "Đ* mọe web l*n, chơi mà cứ bị thua!",
        "Đặt cược có phải là một trò chơi may rủi không nhỉ? Ai nghĩ sao?",
        "Chơi đen đỏ mà không quản lý vốn thì dễ lắm, phải cẩn thận nha!",
        "Bạn có chiến lược nào khi chơi game này không? Chia sẻ đi!",
        "Chơi thử ván này xem sao, có thể sẽ thắng lớn! Ai cược không?",
        "Cảm giác thắng cược thật đã, nhưng cũng phải cẩn thận nhé!",
        "Có ai đã từng thua hết tiền vì đặt cược chưa? Chia sẻ đi!",
        "Chơi game đen đỏ có thể gây nghiện đấy, ai cảm thấy thế không?",
        "Thời điểm nào là thời điểm tốt để đặt cược nhỉ?",
        "Có ai biết mẹo nào để thắng trong game này không? Chia sẻ với mình!",
        "Đặt cược nhiều quá có thể ảnh hưởng tới tâm lý đấy, nhớ giữ bình tĩnh!",
        "Bạn có thấy những người thắng cược thường có mẹo gì không?",
        "Chia sẻ kinh nghiệm chơi game của bạn đi! Mình cũng muốn học hỏi!",
        "Mỗi lần đặt cược là một lần thử thách bản thân! Cố lên nào!",
        "Có khi nào bạn đặt cược mà không biết mình đang làm gì không?",
        "Cảm giác hồi hộp khi đặt cược thật khó tả! Ai đồng ý không?",
        "Có ai đã từng thắng lớn trong một ván cược không? Chuyện gì xảy ra vậy?",
        "Chơi game này cần phải kiên nhẫn và bình tĩnh! Ai có bí quyết không?",
        "Bạn có thường tham gia các giải đấu đặt cược không? Thú vị ghê!",
        "Nên đặt cược một cách có trách nhiệm nhé! Đừng quá đà nha!",
        "Có khi nào bạn đặt cược chỉ vì cảm hứng nhất thời không?",
        "Mỗi lần thua là một bài học quý giá! Hãy nhớ điều đó!",
        "Chơi đen đỏ, bạn tin vào vận may hay kỹ năng? Ai có ý kiến?",
        "Thời gian tốt nhất để đặt cược là khi nào nhỉ?",
        "Có ai biết cách phân tích tình huống trong game không? Giúp mình với!",
        "Chơi một mình hay chơi cùng bạn bè thì vui hơn nhỉ? Thích cùng nhau hơn!",
        "Đừng để cảm xúc chi phối quyết định đặt cược của bạn! Giữ bình tĩnh nhé!",
        "Có khi nào bạn cảm thấy hối hận vì đã đặt cược không? Chia sẻ đi!",
        "Hãy luôn chuẩn bị tinh thần cho cả thắng và thua! Ai đồng ý không?",
        "Có những lúc thắng nhưng vẫn cảm thấy trống rỗng, bạn có thấy vậy không?",
        "Chơi game này có thể tạo ra nhiều kỷ niệm đáng nhớ! Ai có kỷ niệm vui?",
        "Bạn có nghĩ rằng may mắn cũng là một yếu tố quan trọng không?",
        "Có khi nào bạn cảm thấy mình đã chơi quá lâu không?",
        "Hãy nhớ rằng, chơi chỉ để vui chứ đừng quá nghiêm trọng!",
        "Có ai đã từng đặt cược theo linh cảm không? Ai tin vào linh cảm?",
        "Mỗi ván cược đều có câu chuyện riêng của nó! Kể cho mình nghe đi!",
        "Có khi nào bạn muốn dừng lại nhưng lại không làm được không?",
        "Chơi đen đỏ, có khi nào bạn nghĩ đến những điều khác ngoài tiền không?",
        "Nên tìm hiểu trước về các quy tắc của game trước khi chơi nhé!",
        "Bạn có thường xuyên theo dõi các trận đấu lớn không? Ai có đội yêu thích?",
        "Cảm giác khi đặt cược vào đội mình yêu thích thật phấn khích!"
    ];

    // Lấy tên bot ngẫu nhiên từ bảng xếp hạng
    const randomBotNames = leaderboard.map(player => player.name); 

    // Danh sách tên bot không có trong bảng xếp hạng
    const additionalBotNames = ["Dương", "Cường", "Long","An","Hùng", "Thắng", "Con nghiện"]; // Thay thế tên bằng những cái tên bạn muốn

    // Kết hợp hai danh sách tên bot
    const allBotNames = randomBotNames.concat(additionalBotNames); 

    // Lấy tin nhắn ngẫu nhiên và tên bot ngẫu nhiên
    const randomMessage = botMessages[Math.floor(Math.random() * botMessages.length)];
    const randomBotName = allBotNames[Math.floor(Math.random() * allBotNames.length)];

    // Tìm chỉ số của người chơi trong bảng xếp hạng
    if (Math.random() < 0.05) { // 10% xác suất
        addAdminMessage("Gitcode:Cuongle để nhận 10k xu nè ae ơi !!!!");
    }
    const matchingPlayerIndex = leaderboard.findIndex(player => player.name === randomBotName);
    let logoHtml = '';
    if (matchingPlayerIndex !== -1) {
        const rank = matchingPlayerIndex + 1; // Lấy thứ hạng (chỉ số bắt đầu từ 1)
        const logo = `img/${rank}.gif`; // Đường dẫn đến logo
        logoHtml = `<img src="${logo}" alt="Rank ${rank}" style="width: 60px; border-radius: 50%;">`;
    } else {
        // Nếu không phải tên trong bảng xếp hạng, sử dụng logo mặc định
        logoHtml = `<img src="img/8.png" alt="Default Logo" style="width: 60px; border-radius: 50%;">`;
    }

    // Thêm tin nhắn với logo và tên
    addMessage(logoHtml + `<strong style="font-size: 1.5em;">${randomBotName}:</strong> <span style="font-size: 1.5em;">${randomMessage}</span>`, 'bot');
}


// Gửi tin nhắn của người dùng
sendButton.addEventListener('click', () => {
    const userMessage = userInput.value;
    if (userMessage) {
        addMessage(userMessage, 'user');
        userInput.value = ''; // Xóa ô nhập
        setTimeout(botChat, 1000); // Bot trả lời sau 0.3 giây
    }
});

// Xử lý nhấn phím Enter
userInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendButton.click();
    }
});

// Gọi bot chat mỗi 5 giây
setInterval(botChat, 1700);
// Hàm để gửi thông báo ADMIN
function addAdminMessage(text) {
    const adminMessage = text || "Thông báo từ ADMIN: Hãy chơi có trách nhiệm!";
    const adminLogoHtml = `<img src="img/admin.png" alt="ADMIN" style="width: 50px; height: 50px; border-radius: 50%; margin-right: 10px;">`;

    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', 'admin');
    messageDiv.innerHTML = `
        <div style="display: flex; align-items: center; background-color: rgba(255, 0, 0, 0.1); padding: 10px; border-radius: 5px;">
            ${adminLogoHtml}
            <strong style="color: red; font-size: 2.2em; font-weight: bold;">ADMIN:</strong>
            <span style="color: red; font-size: 2.2em; font-weight: bold; margin-left: 5px;">${adminMessage}</span>
        </div>
    `;
    
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Cuộn xuống dưới cùng

    // Giới hạn số lượng tin nhắn trong kênh chat
    if (chatBox.children.length > 100) {
        chatBox.removeChild(chatBox.firstChild); // Xóa tin nhắn đầu tiên
    }
}
