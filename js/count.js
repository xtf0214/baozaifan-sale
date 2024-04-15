let menuItems = [
    { name: '腊味', quantity: 0, price: 15 },
    { name: '排骨', quantity: 0, price: 15 },
    { name: '肥牛', quantity: 0, price: 15 },
    { name: '滑鸡', quantity: 0, price: 13 },
    { name: '梅干菜', quantity: 0, price: 13 },
    // { name: '鸡杂', quantity: 0, price: 11 },
    { name: '外婆菜', quantity: 0, price: 11 }
];
let soldList = [];

function loadData() {
    const today = new Date().toLocaleDateString();
    if (localStorage.getItem(today) == null) {
        localStorage.setItem(today, JSON.stringify({ 'menuItems': menuItems, 'soldList': soldList }));
    } else {
        const tmp = JSON.parse(localStorage.getItem(today));
        menuItems = tmp.menuItems;
        soldList = tmp.soldList;
    }
}

function soldCount() {
    console.log("soldCount");
    const names = menuItems.map(item => item.name);
    const quantities = menuItems.map(item => item.quantity);
    const saledCountctx = document.getElementById('soldCount');
    new Chart(saledCountctx, {
        type: 'bar',
        data: {
            labels: names,
            datasets: [{
                label: '数量',
                data: quantities,
                borderWidth: 2
            }]
        },
    });
}
function timeCount() {
    const times = soldList.map(item => item.time);
    var startTime = times[times.length - 1];
    var endTime = times[0];
    var timeRange = generateTimeRange(startTime, endTime);
    var soldCountByTime = {};
    timeRange.forEach(function (time) {
        soldCountByTime[time] = 0;
    });
    times.forEach(function (item) {
        var time = item.substring(0, 5);
        soldCountByTime[time]++;
    });
    const timeCountctx = document.getElementById('timeCount');
    new Chart(timeCountctx, {
        type: 'bar',
        data: {
            labels: Object.keys(soldCountByTime),
            datasets: [{
                label: '数量',
                data: Object.values(soldCountByTime),
                borderWidth: 2
            }]
        },
    });
}
// 生成完整的时间范围
function generateTimeRange(startTime, endTime) {
    let timeRange = [];
    let startMin = parseInt(startTime.substring(0, 2)) * 60 + parseInt(startTime.substring(3, 5));
    let endMin = parseInt(endTime.substring(0, 2)) * 60 + parseInt(endTime.substring(3, 5));
    for (let Min = startMin; Min <= endMin; Min++) {
        timeRange.push(`${parseInt(Min / 60)}:${Min % 60}`);
    }
    return timeRange;
}
