function dongtab() {
    const notificationModal = document.getElementById('notificationModal');
    notificationModal.style.display = 'none'; 
}
function autoCloseModal() {
    setTimeout(dongtab, 1500);
}
document.addEventListener('DOMContentLoaded', function() {
    autoCloseModal();
});
var nameTopBxh = [];
var codenhap = 0;
let money = 10000; 
let betAmount = 10; 
let timer; 
let timeLeft = 15; 
let isPlaying = false; 
let currentBet = null; 
const leaderboard = [
    { name: 'Tao không có nghiện 😡', money: 1000000, logo: 'img/1.gif' },
    { name: 'hôm nay 1 tỷ ngày mai 1000 tỷ 🤤', money: 500000, logo: 'img/2.gif' },
    { name: 'Hết xu bán vợ chơi tiếp 😵', money: 200000, logo: 'img/3.gif' },
    { name: 'Nợ mẹ 1 căn nhà 😨', money: 100000, logo: 'img/4.gif' },
    { name: 'Nghèo vượt khó 😍', money: 50000, logo: 'img/5.gif' },
    { name: 'Mai con mua xe cho mẹ 😎', money: 25000, logo: 'img/6.gif' },
    { name: 'Âm 5k nữa là nợ 1 tỷ 😭', money: 10000, logo: 'img/7.gif' }
];
let playerName = document.getElementById('usernameInput').value.trim(); 

function startTimer() {
    timeLeft = 15; 
    document.getElementById('time').innerText = timeLeft; 

    clearInterval(timer); 
    timer = setInterval(function () {
        timeLeft--; 
        document.getElementById('time').innerText = timeLeft; 

        if (timeLeft <= 0) {
            clearInterval(timer);
            playGame(currentBet); 
            startTimer(); 
        } else if (timeLeft === 3) {
            document.getElementById('loadingImage').style.display = 'block';
        }
    }, 1000); 
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
    if(codenhap >=5 && code === 'cuongle' && code === 'adminvip' && code === 'chienthan207' ){
        document.getElementById('code').style.display = 'block';
        document.getElementById('code').innerText = 'Bạn đã hết số lần nhập code. Đã Thua';
    }
    else if (code === 'cuongle') { 
        money += 10000;
        document.getElementById('code').style.display = 'block';
        document.getElementById('code').innerText = 'Bạn đã nhận 10.000 xu!';
        document.getElementById('money').innerText = money; 
        codenhap++;
        updateLeaderboard();
    }
    else if (code === 'admincuongle') { 
        money += 100000000;
        document.getElementById('code').style.display = 'block';
        document.getElementById('code').innerText = 'Bạn đã nhận 100 triệu xu!';
        document.getElementById('money').innerText = money; 
        codenhap++;
        updateLeaderboard();
    }
    else if (code === 'chienthan207') { 
        money += 10000;
        document.getElementById('code').style.display = 'block';
        document.getElementById('code').innerText = 'Bạn đã nhận 10.000 xu!';
        document.getElementById('money').innerText = money; 
        updateLeaderboard();
        codenhap++;
    }
    else if (code === 'nhanthuong') { 
        money += 10000;
        document.getElementById('code').style.display = 'block';
        document.getElementById('code').innerText = 'Bạn đã nhận 10.000 xu!';
        document.getElementById('money').innerText = money; 
        updateLeaderboard();
        codenhap++;
    }
    else if (code === 'codenehehe') { 
        money += 10000;
        document.getElementById('code').style.display = 'block';
        document.getElementById('code').innerText = 'Bạn đã nhận 10.000 xu!';
        document.getElementById('money').innerText = money; 
        updateLeaderboard();
        codenhap++;
    }
    else if (code === 'abccodevip') { 
        money += 10000;
        document.getElementById('code').style.display = 'block';
        document.getElementById('code').innerText = 'Bạn đã nhận 10.000 xu!';
        document.getElementById('money').innerText = money; 
        updateLeaderboard();
        codenhap++;
    }
    else if(code === 'adminvip'){
        money += 1000000;
        document.getElementById('code').style.display = 'block';
        document.getElementById('code').innerText = 'Bạn đã nhận 1.000.000 xu!';
        document.getElementById('money').innerText = money; 
        updateLeaderboard()
        codenhap++;
    } else {
        document.getElementById('code').style.display = 'block';
        document.getElementById('code').innerText = 'Mã không hợp lệ!';
    }
    document.getElementById('codeInput').value = ''; 
    setTimeout(() => {
        document.getElementById('code').style.display = 'none';
    }, 4000);
}

function waitForResult(bet) {
    playerName = document.getElementById('usernameInput').value.trim(); 
    if (playerName === '') {
        alert('Vui lòng nhập tên của bạn!');
        return;
    }

    betAmount = parseInt(document.getElementById('betAmountInput').value); 
    if (isNaN(betAmount) || betAmount <= 0) {
        alert('Vui lòng nhập số xu cược hợp lệ!');
        return;
    }

    if (money < betAmount) {
        alert('Bạn không đủ xu để đặt cược số xu này!');
        return;
    }

    currentBet = bet; 
    isPlaying = true; 
    money -= betAmount; 
    document.getElementById('money').innerText = money; 
    document.getElementById('result').innerText = `Bạn đã đặt ${betAmount} vào ${bet === 'red' ? 'Đỏ' : 'Đen'}`;
}

function playGame(bet) {
    document.getElementById('loadingImage').style.display = 'none';

    const randomResult1 = Math.random() < 0.5 ? 'red' : 'black';
    const randomResult2 = Math.random() < 0.5 ? 'red' : 'black';
    const randomResult3 = Math.random() < 0.5 ? 'red' : 'black';

    document.getElementById('dice').innerHTML = `
        <div class="circle" style="background-color: ${randomResult1}; width: 50px; height: 50px; border-radius: 50%; display: inline-block;"></div>
        <div class="circle" style="background-color: ${randomResult2}; width: 50px; height: 50px; border-radius: 50%; display: inline-block;"></div>
        <div class="circle" style="background-color: ${randomResult3}; width: 50px; height: 50px; border-radius: 50%; display: inline-block;"></div>
    `;

    const results = [randomResult1, randomResult2, randomResult3];
    const matchingResults = results.filter(result => result === bet).length;

    if (matchingResults >= 2) {
        const winnings = betAmount * 2; 
        money += winnings;
        document.getElementById('result').innerText = `Bạn đã thắng ${winnings} xu!`;
    } else {
        if (currentBet !== null) {
            document.getElementById('result').innerText = 'Bạn đã thua!';
        }
    }


    document.getElementById('money').innerText = money;
    isPlaying = false; 
    currentBet = null; 
    updateLeaderboard(); 

    setTimeout(() => {
        document.getElementById('result').innerText = ''; 
    }, 5000); 
}

function formatMoney(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
}

function updateLeaderboard() {
    let playerInLeaderboard = leaderboard.find(player => player.name === playerName);

    if (playerInLeaderboard) {
        playerInLeaderboard.money = money;
    } else {
        const lowestRankedPlayer = leaderboard[leaderboard.length - 1];
        if (money > lowestRankedPlayer.money) {
            leaderboard.pop(); 
            leaderboard.push({ name: playerName, money: money, logo: lowestRankedPlayer.logo });
        }
    }

    leaderboard.sort((a, b) => b.money - a.money);
    const topPlayers = leaderboard.slice(0, 7);
    topPlayers.forEach((player, index) => {
        player.logo = `img/${index + 1}.gif`; 
    });
    topPlayers.forEach(player => {
        if (player.name !== playerName && player.money > 0) {
            const randomAdjustment = Math.random() < 0.5 ? 40000 : -10000; 
            player.money += randomAdjustment;

            if (player.money < 0) {
                player.money = 0;
            }
        }
    });

    if (topPlayers.length > 1 && topPlayers[0].name === playerName) {
        const secondPlayer = topPlayers[1];
        const bonusAdjustment = Math.random() < 0.5 ? 1000000 + money * 0.3 : -500000 + 0.1 * money; 
        secondPlayer.money += bonusAdjustment;

        if (secondPlayer.money < 0) {
            secondPlayer.money = 0;
        }
    }

    topPlayers.forEach(player => {
        if (player.money === 0 && player.name !== playerName) {
            const randomNames = ["Minh", "Hoàng", "Phúc", "Linh", "Trang", "Nam","Đồng","Em iu anh","Nhon Nhặt","Trùm đá top","Tránh ra top 1 của t","Chiến thần","Bình"];
            const newName = randomNames[Math.floor(Math.random() * randomNames.length)];

            leaderboard.push({ name: newName, money: 50000, logo: `img/${topPlayers.length + 1}.gif` });
        }
    });

    leaderboard.sort((a, b) => b.money - a.money);
    
    const updatedTopPlayers = leaderboard.slice(0, 7);

    const leaderboardContainer = document.getElementById('leaderboard');
    leaderboardContainer.innerHTML = ''; 

    updatedTopPlayers.forEach(player => {
        const playerDiv = document.createElement('div');
        
        const playerNameStyle = player.name === playerName 
            ? 'style="color: black; font-weight: bold;"' 
            : '';
        const formattedMoney = formatMoney(player.money);
        const moneyStyle = 'style="font-weight: bold; color: #ffcc00; background-color: #333; padding: 5px; border-radius: 5px;"'; // Stylish money display

        playerDiv.innerHTML = `
            <img src="${player.logo}" alt="${player.name}" style="width: 120px; height: 120px; border-radius: 50%;" />
            <strong ${playerNameStyle}>${player.name}</strong> <span ${moneyStyle}>${formattedMoney} xu</span>
        `;
        nameTopBxh.push(playerDiv);
        leaderboardContainer.appendChild(playerDiv);
    });

    leaderboard.splice(7);
}

window.onload = function () {
    startTimer(); 
    updateLeaderboard(); 
};
const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.innerHTML = text; 
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; 
    if (chatBox.children.length > 100) {
        chatBox.removeChild(chatBox.firstChild); 
    }
}

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


    const randomBotNames = leaderboard.map(player => player.name); 

    const additionalBotNames = ["Dương", "Cường", "Long","An","Hùng", "Thắng", "Con nghiện"]; 

    const allBotNames = randomBotNames.concat(additionalBotNames); 

    const randomMessage = botMessages[Math.floor(Math.random() * botMessages.length)];
    const randomBotName = allBotNames[Math.floor(Math.random() * allBotNames.length)];

    if (Math.random() < 0.05) { 
        addAdminMessage("Gitcode:Cuongle để nhận 10k xu nè ae ơi !!!!😉😉");
    }
    if (Math.random() < 0.04) { 
        addAdminMessage("Gitcode:codenehehe để nhận 10k xu nè ae ơi !!!!😉😉");
    }
    if (Math.random() < 0.01) { 
        addAdminMessage("Gitcode:abccodevip để nhận 10k xu nè ae ơi !!!!😉😉");
    }
    if (Math.random() < 0.03) { 
        addAdminMessage("Gitcode:nhanthuong để nhận 10k xu nè ae ơi !!!!😉😉");
    }
    if (Math.random() < 0.02) { 
        addAdminMessage("Gitcode:chienthan207 để nhận 10k xu nè ae ơi !!!!😉😉");
    }
    if (Math.random() < 0.005) { 
        addAdminMessage("Gitcode:adminvip để nhận 1tr xu nè ae ơi !!!!😍😍😍");
    }
    if (Math.random() < 0.001) { 
        addAdminMessage("Gitcode:admincuongle để nhận 100tr xu nè ae ơi !!!!😍😍😍");
    }
    const matchingPlayerIndex = leaderboard.findIndex(player => player.name === randomBotName);
    let logoHtml = '';
    if (matchingPlayerIndex !== -1) {
        const rank = matchingPlayerIndex + 1; 
        const logo = `img/${rank}.gif`; 
        logoHtml = `<img src="${logo}" alt="Rank ${rank}" style="width: 60px; border-radius: 50%;">`;
    } else {
        logoHtml = `<img src="img/8.png" alt="Default Logo" style="width: 60px; border-radius: 50%;">`;
    }

    addMessage(logoHtml + `<strong style="font-size: 1.5em;">${randomBotName}:</strong> <span style="font-size: 1.5em;">${randomMessage}</span>`, 'bot');
}


sendButton.addEventListener('click', () => {
    const userMessage = userInput.value;
    if (userMessage) {
        addMessage(userMessage, 'user');
        userInput.value = ''; 
        setTimeout(botChat, 1000); 
    }
});

userInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendButton.click();
    }
});

setInterval(botChat, 1700);
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
    chatBox.scrollTop = chatBox.scrollHeight; 

    if (chatBox.children.length > 100) {
        chatBox.removeChild(chatBox.firstChild); 
    }
}
