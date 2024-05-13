let menuItems = [
    { name: '腊味', rest: 0, sold: 0, price: 15, color: "red-cell" },
    { name: '排骨', rest: 0, sold: 0, price: 15, color: "green-cell" },
    { name: '肥牛', rest: 0, sold: 0, price: 15, color: "blue-cell" },
    { name: '滑鸡', rest: 0, sold: 0, price: 13, color: "" },
    { name: '梅干菜', rest: 0, sold: 0, price: 13, color: "yello-cell" },
    // { name: '鸡杂', rest: 0, sold: 0, price: 11 },
    { name: '外婆菜', rest: 0, sold: 0, price: 11, color: "yello-cell" }
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
    const names = menuItems.map(item => item.name);
    const solds = menuItems.map(item => item.sold);
    const saledCountctx = document.getElementById('soldCount');
    new Chart(saledCountctx, {
        type: 'bar',
        data: {
            labels: names,
            datasets: [{
                label: '数量',
                data: solds,
                borderWidth: 2
            }]
        },
    });
}
function timeCount() {
    const times = soldList.map(item => item.time);
    var startTime = times[times.length - 1].substring(0, 5);
    var endTime = times[0].substring(0, 5);
    var timeRange = generateTimeRange(startTime, endTime);
    var soldCountByTime = {};
    timeRange.forEach(time => {
        soldCountByTime[time] = 0;
    });
    times.forEach(item => {
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
function generateTimeRange(start, end) {
    var startTime = new Date('2000-01-01 ' + start);
    var endTime = new Date('2000-01-01 ' + end);
    var timeRange = [];
    while (startTime <= endTime) {
      var time = startTime.toTimeString().substring(0, 5);
      timeRange.push(time);
      startTime.setMinutes(startTime.getMinutes() + 1);
    }
    return timeRange;
  }