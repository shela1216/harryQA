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
                    }else if(this.allContent[i].answer.indexOf(this.searchTxt) != -1){
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
            xhr.open("GET", "/images/qa.json");
            xhr.send();
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        var data = JSON.parse(xhr.responseText);
                        var ListData = [];
                        var str;
                        for (var i = 0; i < data.length; i++) {
                            if (i > 0) {
                                str = { question: data[i]['question'], answer: data[i]['answer'] }
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