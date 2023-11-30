const menu = ['腊味', '排骨', '肥牛', '滑鸡', '梅干菜', '鸡杂', '外婆菜'];
const price = {
    '腊味': 15, '排骨': 15, '肥牛': 15, '滑鸡': 13, '梅干菜': 13, '鸡杂': 11, '外婆菜': 11
};
function initRest() {
    var today = new Date().toLocaleDateString();
    console.log(today);
    if (localStorage.getItem(today) == null) {
        localStorage.setItem(today, "1");
        clearNum();
    } else {
        for (var item of menu) {
            var rest = localStorage.getItem(item + 'rest');
            document.getElementById(item).innerText = rest;
        }
    }
}
function initList() {
    for (let item of menu) {
        let curElement = document.getElementById(item).parentNode;
        
    }
    table = document.getElementById('saledList');
    for (var i = table.rows.length - 1; i >= 0; i--)
        table.removeChild(table.rows[i]);
    var saledList = localStorage.getItem("saledList").split(",");
    if (saledList[0] == '')
        saledList.shift();
    for (var i = saledList.length - 1; i >= 0; i--) {
        var tr = document.createElement("tr");
        var id = document.createElement("td");
        var text = document.createElement("td");
        id.innerText = i + 1;
        text.innerText = saledList[i];
        tr.appendChild(id);
        tr.appendChild(text);
        table.appendChild(tr);
    }
}
function clearNum() {
    console.log("clear");
    for (var item of menu) {
        document.getElementById(item).innerText = 0;
        localStorage.setItem(item + "rest", 0);
        localStorage.setItem(item + 'saled', 0);
    }
    localStorage.setItem("saledNum", 0);
    localStorage.setItem("saledList", "");
}
function changeNum(item, num) {
    console.log("change" + item + " num = " + num);
    var rest = parseInt(localStorage.getItem(item + 'rest'));
    if (rest + num >= 0) {
        document.getElementById(item).innerText = rest + num;
        localStorage.setItem(item + 'rest', rest + num);
    }
}
function saleItem(item) {
    console.log("saleItem: " + item);
    var rest = parseInt(localStorage.getItem(item + 'rest'));
    if (rest > 0) {
        document.getElementById(item).innerText = rest - 1;
        localStorage.setItem(item + 'rest', rest - 1);

        var saled = parseInt(localStorage.getItem(item + 'saled'));
        localStorage.setItem(item + 'saled', saled + 1);

        var saledNum = parseInt(localStorage.getItem("saledNum"));
        localStorage.setItem("saledNum", saledNum + 1);

        var saledList = localStorage.getItem("saledList").split(",");
        if (saledList[0] == '')
            saledList.shift();
        var curTime = new Date().toLocaleTimeString();
        saledList.push(curTime + ' ' + item);
        localStorage.setItem("saledList", saledList);

        initList();
    }
}
function revoke() {
    console.log("revoke");
    var saledNum = parseInt(localStorage.getItem("saledNum"));
    if (saledNum > 0) {
        localStorage.setItem("saledNum", saledNum - 1);

        var saledList = localStorage.getItem("saledList").split(",");
        if (saledList[0] == '')
            saledList.shift();
        var item = saledList.pop().split(" ")[1];
        localStorage.setItem("saledList", saledList);

        var rest = parseInt(localStorage.getItem(item + 'rest'));
        document.getElementById(item).innerText = rest + 1;
        localStorage.setItem(item + 'rest', rest + 1);

        var saled = parseInt(localStorage.getItem(item + 'saled'));
        localStorage.setItem(item + 'saled', saled - 1);

        initList();
    }
}
function saledCount() {
    var saledCounts = [];
    for (var item of menu)
        saledCounts.push(parseInt(localStorage.getItem(item + 'saled')));
    const saledCountctx = document.getElementById('saledCount');
    new Chart(saledCountctx, {
        type: 'bar',
        data: {
            labels: menu,
            datasets: [{
                label: '数量',
                data: saledCounts,
                borderWidth: 2
            }]
        },
    });
}
// 生成完整的时间范围
function generateTimeRange(startTime, endTime) {
    var timeRange = [];
    var currentTime = startTime;
    while (currentTime <= endTime) {
        timeRange.push(currentTime);
        var parts = currentTime.split(":");
        var minutes = parseInt(parts[1]) + 1;
        if (minutes >= 60) {
            minutes = 0;
            var hours = parseInt(parts[0]) + 1;
            if (hours < 10) {
                hours = "0" + hours;
            }
            currentTime = hours + ":00";
        } else {
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            currentTime = parts[0] + ":" + minutes;
        }
    }
    return timeRange;
}

function timeCount() {
    var saledNum = parseInt(localStorage.getItem("saledNum"));
    var saledList = localStorage.getItem("saledList").split(',');
    if (saledList[0] == '')
        saledList.shift();
    if (saledNum == 0)
        return;
    var startTime = saledList[0].substring(0, 5);
    var endTime = saledList[saledList.length - 1].substring(0, 5);
    var timeRange = generateTimeRange(startTime, endTime);
    var salesCountByTime = {};

    timeRange.forEach(function (time) {
        salesCountByTime[time] = 0;
    });

    saledList.forEach(function (item) {
        var time = item.substring(0, 5);
        salesCountByTime[time]++;
    });

    const timeCountctx = document.getElementById('timeCount');
    new Chart(timeCountctx, {
        type: 'bar',
        data: {
            labels: Object.keys(salesCountByTime),
            datasets: [{
                label: '数量',
                data: Object.values(salesCountByTime),
                borderWidth: 2
            }]
        },
    });
}
