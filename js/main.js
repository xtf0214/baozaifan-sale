let X = new Vue({
    el: '#app',
    data() {
        return {
            menuItems: [
                { name: '腊味', quantity: 0, price: 15 },
                { name: '排骨', quantity: 0, price: 15 },
                { name: '肥牛', quantity: 0, price: 15 },
                { name: '滑鸡', quantity: 0, price: 13 },
                { name: '梅干菜', quantity: 0, price: 13 },
                // { name: '鸡杂', quantity: 0, price: 11 },
                { name: '外婆菜', quantity: 0, price: 11 }
            ],
            soldList: []
        };
    },
    created() {
        const today = new Date().toLocaleDateString();
        if (localStorage.getItem(today) == null) {
            localStorage.setItem(today, JSON.stringify({ 'menuItems': this.menuItems, 'soldList': this.soldList }));
        } else {
            const tmp = JSON.parse(localStorage.getItem(today));
            this.menuItems = tmp.menuItems;
            this.soldList = tmp.soldList;
        }
    },
    methods: {
        saveData() {
            const today = new Date().toLocaleDateString();
            localStorage.setItem(today, JSON.stringify({ 'menuItems': this.menuItems, 'soldList': this.soldList }));
        },
        sell(itemName) {
            const selectedItem = this.menuItems.find(item => item.name === itemName);
            if (selectedItem.quantity > 0) {
                selectedItem.quantity -= 1;
                var curTime = new Date().toLocaleTimeString();
                this.soldList.unshift({ name: itemName, time: curTime });
            }
            this.saveData();
        },
        revoke() {
            if (this.soldList.length > 0) {
                const lastSoldItem = this.soldList.shift();
                const selectedItem = this.menuItems.find(item => item.name === lastSoldItem.name);
                selectedItem.quantity += 1;
            }
            this.saveData();
        },
        changeNum(itemName, num) {
            const selectedItem = this.menuItems.find(item => item.name === itemName);
            if (selectedItem.quantity + num >= 0) {
                selectedItem.quantity += num;
            }
            this.saveData();
        },
        clearNum() {
            this.menuItems.forEach(item => {
                item.quantity = 0;
            });
            this.soldList.splice(0, this.soldList.length);
            this.saveData();
        }
    }
});

function saledCount() {
    const today = new Date().toLocaleDateString();
    const menuItems = JSON.parse(localStorage.getItem(today)).menuItems;
    const names = menuItems.map(item => item.name);
    const quantities = menuItems.map(item => item.quantity);
    const saledCountctx = document.getElementById('saledCount');
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
    const today = new Date().toLocaleDateString();
    const soldList = JSON.parse(localStorage.getItem(today)).soldList;
    const times = soldList.map(item => item.time);
    var startTime = times[times.length - 1].substring(0, 5);
    var endTime = times[0].substring(0, 5);
    var timeRange = generateTimeRange(startTime, endTime);
    var salesCountByTime = {};

    timeRange.forEach(function (time) {
        salesCountByTime[time] = 0;
    });

    times.forEach(function (item) {
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
