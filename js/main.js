let app = new Vue({
    el: '#app',
    data() {
        return {
            menuItems: [
                { name: '腊味', rest: 0, sold: 0, price: 15, color: "#e49797" },
                { name: '排骨', rest: 0, sold: 0, price: 15, color: "#97e49b" },
                { name: '肥牛', rest: 0, sold: 0, price: 15, color: "#97b6e4" },
                { name: '滑鸡', rest: 0, sold: 0, price: 13, color: ""},
                { name: '梅干菜', rest: 0, sold: 0, price: 13, color: "#e4e097" },
                // { name: '鸡杂', rest: 0, sold: 0, price: 11 },
                { name: '外婆菜', rest: 0, sold: 0, price: 11, color: "#e4e097"}
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
        // Vue.config.devtools = true;
    },
    methods: {
        saveData() {
            const today = new Date().toLocaleDateString();
            localStorage.setItem(today, JSON.stringify({ 'menuItems': this.menuItems, 'soldList': this.soldList }));
        },
        getClass(itemName) {
            console.log(this.menuItems.find(item => item.name === itemName).color);
            return this.menuItems.find(item => item.name === itemName).color;
        },
        sell(itemName) {
            const selectedItem = this.menuItems.find(item => item.name === itemName);
            if (selectedItem.rest > 0) {
                selectedItem.rest -= 1;
                selectedItem.sold += 1;
                var curTime = new Date().toLocaleTimeString();
                this.soldList.unshift({ name: itemName, time: curTime });
            }
            this.saveData();
        },
        revoke() {
            if (this.soldList.length > 0) {
                const lastSoldItem = this.soldList.shift();
                const selectedItem = this.menuItems.find(item => item.name === lastSoldItem.name);
                selectedItem.rest += 1;
                selectedItem.sold -= 1;
            }
            this.saveData();
        },
        changeNum(itemName, num) {
            const selectedItem = this.menuItems.find(item => item.name === itemName);
            if (selectedItem.rest + num >= 0) {
                selectedItem.rest += num;
            }
            this.saveData();
        },
        clearNum() {
            this.menuItems.forEach(item => {
                item.rest = 0;
                item.sold = 0;
            });
            this.soldList.splice(0, this.soldList.length);
            const today = new Date().toLocaleDateString();
            localStorage.removeItem(today);
        },
    }
});