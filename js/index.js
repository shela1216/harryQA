(function(window) {
    var ua = navigator.userAgent.toLowerCase() || navigator.vendor || window.opera;
    var data = {
        searchTxt: "",
        viewHeight: document.body.clientHeight,
        allContent: []
    }
    var vm = new Vue({
        el: "#main",
        data: data,
        computed: {
            PageHeight: function() {
                return this.viewHeight - 147 + "px"
            },
            quest_List: function() {
                var newList = [];
                for (var i = 0; i < this.allContent.length; i++) {
                    if (this.allContent[i].question.indexOf(this.searchTxt) != -1) {
                        newList.push(this.allContent[i])
                    }
                }
                return newList
            }
        },
        mounted: function() {
            this.viewHeight = document.body.clientHeight;
            window.addEventListener('resize', this.heightChange);
        },
        created: function() {
            var xhr = new XMLHttpRequest();
            var self = this;
            xhr.open("GET", "https://spreadsheets.google.com/feeds/list/1zMmNIMdqG1tbUrPmudvc2dGnqEvXflynI5U5-5J9WxU/1/public/values?alt=json");
            xhr.send();
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        var data = JSON.parse(xhr.responseText);
                        var ListData = [];
                        var str;
                        for (var i = 0; i < data['feed']['entry'].length; i++) {
                            if (i > 0) {
                                str = { question: data['feed']['entry'][i]['gsx$question']['$t'], answer: data['feed']['entry'][i]['gsx$answer']['$t'] }
                                ListData.push(str);
                            }
                        }
                        self.allContent = ListData;
                    }
                }
            }
        },

        methods: {
            heightChange: function(event) {
                var screenHeight = document.body.clientHeight;
                this.viewHeight = screenHeight;
            },
        }
    })
})(window);