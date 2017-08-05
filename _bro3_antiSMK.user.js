// ==UserScript==
// @name   bro3_antiSMK.user
// @description  アンチSMK
// @include   http://*.3gokushi.jp/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js

// ==/UserScript==

//本拠地への敵襲があったら大砲や車が来ていないかチェックする
//憲兵から衝車、大剣兵から投石機まですべて？なら大砲と判断
//衝車または投石機が1以上なら車と判断
//大砲か車を発見したら後続のチェックは終了

jQuery.noConflict();
j$ = jQuery;

var host = location.hostname;  //ホスト名

var armMax=99;//兵数MAXこれを超えたら大砲と判断する//ぼっち追加
var g_MD_17="";
var g_MD;
var g_MX;
var g_MY;

var d_17 = document;
var $_17 = function(id) { return d_17.getElementById(id); };
//var $x_17 = function(xp,dc) { return d_17.evaluate(xp, dc||d_17, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; };
//var $a_17 = function(xp,dc) { var r = d_17.evaluate(xp, dc||d_17, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); var a=[]; for(var i=0; i<r.snapshotLength; i++){ a.push(r.snapshotItem(i)); } return a; };
var $e_17 = function(e,t,f) { if (!e) return; e.addEventListener(t, f, false); };
//var $x = function(xp,dc) { return d_17.evaluate(xp, dc||d, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; };//2017.05.03追加

(function() {
// if (location.pathname == "/village.php") {
  var dStr = "◆アンチSMK◆<BR>";
  //敵襲ランプがついている場合のみ実行
  if(fastEnemyCheck()){
//   enemyInfo();
   enemyInfo3();
  }
// }
}) ();
//敵襲ランプが付いているかチェック（付いている→TRUE）
function fastEnemyCheck(){
 return bret;
 var info = document.getElementsByClassName("sideBoxInner")[0].getElementsByTagName("td")[3].innerHTML;
 var info4 = document.getElementsByClassName("sideBoxInner")[0].getElementsByTagName("td")[4].innerHTML;
 var bret = true;
  
  //http://f2.3gokushi.jp/user/status.php?village_id=31797&type=enemy
  
// console.log('*** SMK 1***'+info4.innerHTML);
// console.log('*** SMK 1***'+info);

 if(info.indexOf("sit_enemy_no") > 0){
  bret = false;
 }
 return bret;
}

//状況一覧画面からデータ取得
function enemyInfo(){
 //状況チェック
 var dStr = "◆アンチSMK◆<BR>";
 var url = "http://"+host+"/user/status.php";
 var doc = document.createElement("div");
 doc.innerHTML = getContentFromURL(url);

 var iInfo = doc.getElementsByClassName("commonTables");
 var tr = iInfo[0].getElementsByTagName("tr");

 for(var j=1 ; j < tr.length ; j++){
  var td = tr[j].getElementsByTagName("td");

  var n = td[1].innerHTML; //拠点名
  var s = td[2].getElementsByTagName("a").length;    //出兵
  var k = td[3].getElementsByTagName("a").length;    //帰還
  var t = td[5].getElementsByTagName("a");    //敵襲
  if (t.length > 0){
   dStr += n.substr(0,n.indexOf("</a>")+5);
   dStr += "("+t[0].innerHTML+")";
   dStr += "<BR>";
  }
 }
 disp_showenemy(dStr);
// disp_pop_showenemy(dStr);

}
function enemyInfo2(){
 //状況チェック
 var dStr = "◆アンチSMK2◆<BR>";
 var url = "http://"+host+"/user/status.php";
 var htmldoc = document.createElement("div"); //2017.05.03追加
  //http://f2.3gokushi.jp/facility/unit_status.php?type=enemy
  //http://f2.3gokushi.jp/facility/unit_status.php?type=scout

 j$.get(url,function(y){
//     var htmldoc = document.createElement("div"); //2017.05.03削除
     htmldoc.innerHTML = y;

  var iInfo = htmldoc.getElementsByClassName("commonTables");
  var tr = iInfo[0].getElementsByTagName("tr");
// console.log('*** SMK 1***'+tr.length);
  for(var j=1 ; j < tr.length ; j++){
   var td = tr[j].getElementsByTagName("td");

   var n = td[1].innerHTML; //拠点名
// console.log('*** SMK 1***'+j+':'+n);
   var s = td[2].getElementsByTagName("a").length;    //出兵
   var k = td[3].getElementsByTagName("a").length;    //帰還
   var t = td[5].getElementsByTagName("a");    //敵襲

   if (t.length > 0){
    dStr += n.substr(0,n.indexOf("</a>")+5);
    dStr += "("+t[0].innerHTML+")";
    dStr += "<BR>";
   }
  }
//  disp_showenemy(dStr);
  disp_pop_showenemy(dStr); //この場所でなければダメ
 });

}

//ぼっち追加
function enemyInfo3(){
 //状況チェック
// console.log('*** SMK 3***');
 var dStr = "◆アンチSMK3◆<BR>";
 var url = "http://"+host+"/user/status.php";
 var url1 = "";
 var htmldoc = document.createElement("div"); //2017.05.03追加
 var htmldoc1 = document.createElement("div"); //2017.05.03追加

 j$.get(url,function(y){
//     var htmldoc = document.createElement("div"); //2017.05.03削除
     htmldoc.innerHTML = y;
  var iInfo = htmldoc.getElementsByClassName("commonTables");
  var tr = iInfo[0].getElementsByTagName("tr");

  for(var j=1 ; j < tr.length ; j++){
   var td = tr[j].getElementsByTagName("td");

   var p = td[0].innerHTML; //場所
   var p1 = p.match(/(本拠地|村|砦|領地)/)[1]; //場所
   var n = td[1].innerHTML.replace("a href", "a id=iPlace href"); //拠点名
   var s = td[2].getElementsByTagName("a").length;    //出兵
   var k = td[3].getElementsByTagName("a").length;    //帰還
   var t = td[5].getElementsByTagName("a");    //敵襲
   var b = "";    //大砲

   if (t.length > 0){
     url1 = "http://"+host+t[0].getAttribute("href");
//    if (p1=="本拠地" || p1=="村") {
    if (p1=="本拠地") {
     j$.get(url1,function(y1){
      htmldoc1.innerHTML = y1;
      var bcnt = 0; //大砲数
      var ccnt = 0; //車数
      var iInfo1 = htmldoc1.getElementsByClassName("commonTablesNoMG");
      for(var j2=0 ; j2 < iInfo1.length ; j2++){
        var tr1 = iInfo1[j2].getElementsByTagName("tr");

        var td10 = tr1[1].getElementsByTagName("td")[0].textContent; //剣兵
        var td11 = tr1[1].getElementsByTagName("td")[1].textContent; //盾兵
        var td12 = tr1[1].getElementsByTagName("td")[2].textContent; //槍兵
        var td13 = tr1[1].getElementsByTagName("td")[3].textContent; //弓兵
        var td14 = tr1[1].getElementsByTagName("td")[4].textContent; //騎兵
        var td15 = tr1[1].getElementsByTagName("td")[5].textContent; //衝車
        var td16 = tr1[1].getElementsByTagName("td")[6].textContent; //斥候
        var td30 = tr1[3].getElementsByTagName("td")[0].textContent; //大剣兵
        var td31 = tr1[3].getElementsByTagName("td")[1].textContent; //重盾兵
        var td32 = tr1[3].getElementsByTagName("td")[2].textContent; //矛槍兵
        var td33 = tr1[3].getElementsByTagName("td")[3].textContent; //弩兵
        var td34 = tr1[3].getElementsByTagName("td")[4].textContent; //近衛騎兵
        var td35 = tr1[3].getElementsByTagName("td")[5].textContent; //投石機
        var td36 = tr1[3].getElementsByTagName("td")[6].textContent; //斥候騎兵

        if(td10=='?' && td11=='?' && td12=='?' && td13=='?' && td14=='?' && td30=='?' && td31=='?' && td32=='?' && td33=='?' && td34=='?'){
          bcnt++;
        }else if (td30>armMax || td31>armMax || td32>armMax || td33>armMax || td34>armMax || td35>armMax || td36>armMax){
          bcnt++;
        }
        if (td15>0 || td35>0){
          ccnt++;
        }
      }
      if (bcnt>0){
        b+="●~["+bcnt+"]";
      }
      if (ccnt>0){
        b+="車["+ccnt+"]";
      }
      j$('#iPlace').after(b);
      j$('#iPlace').attr('href',url1);
    });
   }

    dStr += n.substr(0,n.indexOf("</a>")+5);
    dStr += "("+t[0].innerHTML+") ";
    dStr += b+"<BR>";
   }
  }
//  disp_showenemy(dStr);
  disp_pop_showenemy(dStr); //この場所でなければダメ
 });

}


//SMK状況を状況の下（アイコンの上）に表示
function disp_showenemy(dStr){
//結果を表示するテキストエリア
 j$("div[class=sideBoxInner]").prepend("<div id=enemy_info>");
// j$("#enemy_info").css({"font-size":"8pt"});
 document.getElementById("enemy_info").innerHTML = dStr;
}

//getContentFromURL関数
function getContentFromURL(url) {
 var xmlhttp = new XMLHttpRequest();
 xmlhttp.open('GET', url, false);
 xmlhttp.send();

 if (xmlhttp.status == 200){
  return xmlhttp.responseText;
 }
 else {
  return "";
 }
}

function disp_pop_showenemy(dStr) {

 var popupLeft = 0;
 var popupTop = 280;//400

 //表示コンテナ作成
 var ASContainer = d_17.createElement("div");
 ASContainer.id = "ASContainer";
 ASContainer.style.position = "absolute";
 ASContainer.style.color = "white";
 ASContainer.style.backgroundColor = "black";
 ASContainer.style.left = popupLeft + "px";
 ASContainer.style.top = popupTop + "px";
 ASContainer.style.fontSize = "8px";
 ASContainer.style.padding = "3px";
 ASContainer.style.zIndex = 999;
 d_17.body.appendChild(ASContainer);

 $e_17(ASContainer, "mousedown", function(event){
    if( event.target != $_17("ASContainer")) {return false;}
    g_MD_17="ASContainer";
    g_MX=event.pageX-parseInt(this.style.left,10);
    g_MY=event.pageY-parseInt(this.style.top,10);
    event.preventDefault();});
 $e_17(d_17, "mousemove", function(event){
    if(g_MD_17 != "ASContainer") return true;
    var ASContainer = $_17("ASContainer");
    if( !ASContainer ) return true;
    var x = event.pageX - g_MX;
    var y = event.pageY - g_MY;
    ASContainer.style.left = x + "px";
    ASContainer.style.top = y + "px";
    });
 $e_17(d_17, "mouseup", function(event){g_MD_17="";});

 var tbl = d_17.createElement("table");
 tbl.style.border = "solid 1px #FFDE49";
 tbl.style.border ="0px";

 var tr = d_17.createElement("tr");
 var td = d_17.createElement("td");
 td.style.padding = "3px";
 td.style.verticalAlign = "top";
 td.style.border = "outset 2px black";
 tr.appendChild(td);
 tbl.appendChild(tr);
 var msg = d_17.createElement("span");
 msg.style.fontSize = "10px";
 msg.style.margin = "3px";
 msg.innerHTML = dStr;

 td.appendChild(msg);

 ASContainer.appendChild(tbl);
}
