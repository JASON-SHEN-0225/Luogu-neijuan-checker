
(function () {
    'use strict';
    alert("欢迎使用卷王监视系统 点击下方按钮开始使用！");
    var userlist = ["jasonshen_", "zhangkeyuan0623", "peterNiu7799","桐柏恶霸老张", "xia2010", "baoyouyang","Alex_Wei","云浅知处","qwq_hwc","zym0325","Present_Coming_Time","zxh923"]; // 每个用户名用引号引起，逗号隔开，长度不限
    var pages = 10; // 初始检查做题记录页数，建议设置为 1-2
    var cd = 10000; // 自动检查每个人时间间隔，建议保持为 10000，以免 GG
    var str = '<div style="background:white !important;"><div><select name="key" id="key"><option value="*">*</option>';
    for (var i = 0; i < userlist.length; i++) {
        str += '<option value="' + userlist[i] + '">' + userlist[i] + '</option>';
    }
    str += '</select></div><table id="store" style="white-space: nowrap;"><tr><th>用户</th><th>题号</th><th>标题</th><th>时间</th></tr></table></div>';
    document.body.innerHTML = "<h1 style='text-align:center;color:red;font-family:Microsoft Yahei'>内卷监视工具</h1>";
    document.body.innerHTML += "<b style='text-align:center;font-family:FangSong'>运筹首页之中，偷袭千里之外&#128517;</b><hr>" + str;
    var colors = ['rgb(191, 191, 191)', 'rgb(254, 76, 97)', 'rgb(243, 156, 17)', 'rgb(255, 193, 22)', 'rgb(82, 196, 26)', 'rgb(52, 152, 219)', 'rgb(157, 61, 207)', 'rgb(14, 29, 105)'];
    var name = "灰红橙黄绿蓝紫黑";
    var lst = Array(), subs = [];
    var cnt = 0;
    function PARSE(First = false) {
        cnt = (cnt + 1) % userlist.length;
        var user = userlist[cnt];
        var Pagenum = 1;
        if (First) Pagenum = pages;
        for (; Pagenum > 0; Pagenum--) {
            fetch('https://www.luogu.com.cn/record/list?user=' + user + '&page=' + Pagenum, { 'mode': 'no-cors' })
                .then(response => { if (response.ok) return response.text(); else throw response.statusText; })
                .then(content => {
                    var patten = /decodeURIComponent\(".*?"\)/;
                    content = patten.exec(content)[0];
                    content = content.substr(20, content.length - 22);
                    content = JSON.parse(decodeURIComponent(content));
                    var prob, col, pid, title, time,cl,pidd;
                    for (var i = Math.min(content.currentData.records.result.length - 1, 19); i >= 0; i--) {
                        if (content.currentData.records.result[i].id > lst[cnt]) {
                            prob = content.currentData.records.result[i].problem;
                            col = colors[prob.difficulty];
                            pid = prob.pid;
                            var sts;
                            if(content.currentData.records.result[i].status == 12){cl='rgb(82, 196, 26)';sts='答案正确(AC)';}
                            else if(content.currentData.records.result[i].status == 14){cl='rgb(231, 76, 60)';sts='答案错误(WA)';}
                            else {cl='rgb(250, 219, 20)';sts=' 编译失败(CE)';}
                            title = prob.title;
                            let score=content.currentData.records.result[i].score
                            if (!score&&score!=0)
                                if(content.currentData.records.result[i].status == 12)
                                score="AC";
                                else if(content.currentData.records.result[i].status == 14)
                                score="WA";
                                else
                                score="CE";
                            let ucol=content.currentData.records.result[i].user.color;
                            if(ucol=="Orange")ucol="rgb(243, 156, 17)";
                            else if(ucol=="Red")ucol="rgb(254, 76, 97)";
                            else if(ucol=="Blue")ucol="rgb(52, 152, 219)";
                            else if(ucol=="Purple")ucol="rgb(157, 61, 207)";
                            else if(ucol=="Green")ucol="rgb(82, 196, 26)";
                            else ucol="rgb(191, 191, 191)";
                            let lan=content.currentData.records.result[i].language;
                            if(lan==1)lan="Pascal";
                            else if(lan==2)lan="C";
                            else if(lan==3)lan="C++98";
                            else if(lan==4)lan="C++11";
                            else if(lan==5)lan="未知";
                            else if(lan==6)lan="未知";
                            else if(lan==7)lan="Python 3";
                            else if(lan==8)lan="Java 8";
                            else if(lan==9)lan="Node.js LTS";
                            else if(lan==10)lan="未知";
                            else if(lan==11)lan="C++14";
                            else if(lan==12)lan="C++17";
                            else if(lan==13)lan="Ruby";
                            else if(lan==14)lan="Go";
                            else if(lan==15)lan="Rust";
                            else if(lan==16)lan="PHP";
                            else if(lan==17)lan="C# Mono";
                            else if(lan==18)lan="未知";
                            else if(lan==19)lan="Haskell";
                            else if(lan==20)lan="未知";
                            else if(lan==21)lan="Kotlin/JVM";
                            else if(lan==22)lan="Scala";
                            else if(lan==23)lan="Perl";
                            else if(lan==24)lan="未知";
                            else if(lan==25)lan="PyPy 3";
                            else if(lan==26)lan="未知";
                            else if(lan==27)lan="C++20";
                            else if(lan==28)lan="C++14 (GCC 9)";
                            time = content.currentData.records.result[i].submitTime;
                            var html = /* '<span>'+JSON.stringify(content)+'</span>'+  */'<tr><td>'+"<b><a style='color:"+ ucol + "' href='https://www.luogu.com.cn/user/"+content.currentData.records.result[i].user.uid+"'>" + user + "</a></b></td><td><b><a href='https://www.luogu.com.cn/problem/"+pid+"'>"+ pid + '</a></b></td><td>' +"<b><a style='color:"+ cl + "' href='https://www.luogu.com.cn/record/"+content.currentData.records.result[i].id+"'>"+sts+"</a></b></td><td><b><a style='color:"+ cl + "' href='https://www.luogu.com.cn/record/"+content.currentData.records.result[i].id+"'>"+score+"</a></b></td> " + "<td><a style='color:" + col + "' href='https://www.luogu.com.cn/problem/" + pid + "' target='_blank'>" + title + "</a></td><td>"+lan+"</td><td>" + new Date(time * 1000).toLocaleString() + "</td></tr>";
                            subs.push({ html: html, time: time });
                            if (!First) {
                                //alert(user + " 刚刚卷了" + name[prob.difficulty] + "题 " + pid + " " + title);
                            }
                            lst[cnt] = content.currentData.records.result[i].id;
                        }
                    }
                    console.log(`已获取${user}的做题记录`)
                }).catch(err => console.error(`获取用户${user}的做题记录时出现错误 ${err}`));
        }
    }
    for (var x = 0; x < userlist.length; x++) lst[x] = 0;
    for (x = 0; x < userlist.length; x++) PARSE(true);
    window.setInterval(PARSE, cd);
    window.setInterval(function () {
        subs.sort((a, b) => b.time - a.time);
        let html = '<tr><th>用户</th><th>题号</th><th>状态</th><th>分数</th><th>标题</th><th>语言</th><th>时间</th></tr>';
        subs.forEach(sub => html += sub.html);
        document.getElementById('store').childNodes[0].innerHTML = html;
        var storeId = document.getElementById('store');
        var rowsLength = storeId.rows.length;
        var key = document.getElementById('key').value;
        for (var i = 1; i < rowsLength; i++) {
            var searchText = storeId.rows[i].cells[0].innerHTML;
            if (key == "*" || searchText.match(key)) {
                storeId.rows[i].style.display = '';
            }
            else {
                storeId.rows[i].style.display = 'none';
            }
        }
    }, 100);
})();
