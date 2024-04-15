let app = new Vue({
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
            soldList: [],
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
        },

    }
});