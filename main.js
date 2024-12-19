(() => {
    'use strict';

    let vm = new Vue({
        el: '#result',
        data: {
            // 「newList」はテキストボックスに入力した値を受ける
            newList: '',
            lists: [],
            gif: '../pic/お文具さん無限ループ.gif'
        },
        // ブラウザのLocalStorageにJSON形式で保存
        watch: {
            lists: {
                handler: function() {
                    // dataの「lists」は「this.lists」で取得
                    localStorage.setItem('lists', JSON.stringify(this.lists));
                },
                deep: true
            }
        },
        // ブラウザのLocalStorageから出力
        mounted: function() {
            this.lists = JSON.parse(localStorage.getItem('lists')) || [];
        },
        // 各イベント時の動作
        methods: {
            addList: function() {
                let item = {
                    title: this.newList,
                }
                this.lists.push(item);
                this.newList = '';
            },
            delList: function(index) {
                if (confirm('削除しますか？')) {
                    this.lists.splice(index, 1);
                }
            },
            allDel: function() {
                if (confirm('一括削除しますか？')) {
                    this.lists = this.listCount;
                }
            }
        },
        // 動的に算出
        computed: {
            listCount: function() {
                return this.lists.filter(function(list) {
                    return !list.isChecked;
                });
            }
        }
    });
})();
