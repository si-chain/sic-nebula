var Captcha={init:function(a){var b;"undefined"!=typeof vabs&&vabs||(vabs=new vabsF,b="undefined"==typeof a.type?"1":a.type,this.event(b)),vabs.setAppId(a.appId),vabs.setType(b),vabs.setGet(a.get),vabs.setCheck(a.check),vabs.setVersion(a.version),"function"==typeof a.success&&vabs.setSuccessCallBack(a.success),"function"==typeof a.init&&a.init()},pop:function(a){"function"==typeof a.success&&vabs.setSuccessCallBack(a.success),Events.load()},event:function(a){"1"==a&&$(".js-rb-vc-close").click(function(){Events.close()}),$(".js-rb-vc-reload-btn").click(function(){vabs.getIsCanRefresh()&&Events.load()}),$(".js-rb-vc-select-pic").click(function(a){Events.onClick(a,this)}),$(".js-rb-vc-select-pic").load(function(a){Events.imgOnLoad(a,this)}),$(".js-rb-vc-select-pic").mousemove(function(a){Events.onMouseMove(a,this)}),$(".rb-vc-icon01").click(function(a){Events.clickPoint(a,1)}),$(".rb-vc-icon02").click(function(a){Events.clickPoint(a,2)}),$(".rb-vc-icon03").click(function(a){Events.clickPoint(a,3)})}},Events={load:function(){$(".js-rb-vc-layer").show(),funcs.showLoading(),request.refreshCaptcha()},close:function(){$(".js-rb-vc-layer").hide(),funcs.showLoading(),funcs.hideVerifyResult()},onClick:function(a,b){var c,d;if(0!=vabs.getIsCanClick())if(c=funcs.getMouseXY(a,b),vabs.clickAddCount(),d=$(".js-rb-vc-infobox .loading").html(),d.indexOf("请依次点击")>-1){if(vabs.recordClick(c.x,c.y,1),vabs.getClickCount()<3)return;request.checkCaptcha()}else vabs.getClickCount()<1&&(vabs.recordClick(c.x,c.y,0),request.checkCaptcha())},imgOnLoad:function(){funcs.hideLoading()},clickPoint:function(a,b){1==b?(vabs.subClick(0),$(".rb-vc-icon01").hide(),$(".rb-vc-icon02").hide(),$(".rb-vc-icon03").hide()):2==b?(vabs.subClick(1),$(".rb-vc-icon02").hide(),$(".rb-vc-icon03").hide()):3==b&&(vabs.subClick(2),$(".rb-vc-icon03").hide())},onMouseMove:function(a,b){var c,d,e,f,g;a=a||window.event,c=$(b).offset(),d=a.clientX-(c.left-$(document).scrollLeft()),e=a.clientY-(c.top-$(document).scrollTop()),f=$(b).height(),g=$(b).width(),d>=0&&g>=d&&e>=0&&f>=e&&vabs.recordMove(d,e)}},vabsF=function(){var r=function(a){this.appId=a},s=function(){return this.appId},t=function(a){this.ele=a},u=function(){return this.ele},v=function(a){this.type=a},w=function(){return this.type},x=function(a){this.get=a},y=function(){return this.get},z=function(a){this.check=a},A=function(){return this.check},B=function(a){this.captchaId=a},C=function(){return this.captchaId},D=function(a){this.version=void 0!=a&&""!=a?a:"V1.0"},E=function(){return this.version},F=function(a){this.successCallBack=a},G=function(a){this.startTime=a},H=function(){return this.successCallBack},I=function(a){"function"==typeof this.successCallBack&&this.successCallBack(a)},J=function(){this.clickCount=this.clickCount+1},K=function(a){this.isCanClick=a},L=function(){return this.isCanClick},M=function(a){this.isCanRefresh=a},N=function(){return this.isCanRefresh},O=function(){return window.top.location.href},P=function(a,b){var c=this.pageXAxis.length;a=funcs.round(a,1),b=funcs.round(b,1),(0==c||a!=this.pageXAxis[c-1]||b!=this.pageYAxis[c-1])&&(this.pageXAxis.push(a),this.pageYAxis.push(b),this.mouseTime.push((new Date).getTime()-this.startTime))},Q=function(a,b,c){0==c?$(".rb-vc-icon0"+this.clickXy.length).css({top:b+12,left:a-14}).show():$(".rb-vc-icon0"+(this.clickXy.length+1)).css({top:b+14,left:a-12}).show(),this.clickXy.push(funcs.round(a,1)+":"+funcs.round(b,1))},R=function(a){this.clickXy.splice(a,this.clickXy.length-a)},S=function(){return this.clickXy.length},T=function(){this.clickCount=0,this.pageXAxis=[],this.pageYAxis=[],this.mouseTime=[],this.clickXy=[]},U=function(){var e,c=[],d=this.pageXAxis.length;for(e=0;d>e;e++)d>24?e>(d-120)/2&&c.length<120&&c.push(this.pageXAxis[e]+":"+this.pageYAxis[e]+":"+this.mouseTime[e]):c.push(this.pageXAxis[e]+":"+this.pageYAxis[e]+":"+this.mouseTime[e]);return escape(JSON.stringify({m:sec.encode(c.join(";")),c:sec.encode(this.clickXy.join(";")),cc:String(this.clickCount)}))};return{setAppId:r,getAppId:s,setEle:t,getEle:u,setType:v,getType:w,setGet:x,getGet:y,setCheck:z,getCheck:A,setCaptchaId:B,getCaptchaId:C,setVersion:D,getVersion:E,setStartTime:G,setSuccessCallBack:F,getSuccessCallBack:H,doSuccessCallBack:I,clickAddCount:J,setIsCanClick:K,getIsCanClick:L,setIsCanRefresh:M,getIsCanRefresh:N,getH:O,recordMove:P,recordClick:Q,subClick:R,getClickCount:S,clearRecord:T,orgData:U}},funcs={getMouseXY:function(a,b){var c,d,e;return a=a||window.event,c=$(b).offset(),d=a.clientX-(c.left-$(document).scrollLeft()),e=a.clientY-(c.top-$(document).scrollTop()),{x:d,y:e}},showCaptcha:function(a){vabs.setIsCanClick(!0),vabs.setIsCanRefresh(!0),$(".js-rb-vc-select-pic").attr("src",a.url);var b=a.qa.replace("_",'<strong id="rb-vc-answer" class="strong1">?</strong>').replace("?",'<strong id="rb-vc-answer" class="strong2">?</strong>');$(".js-rb-vc-infobox .loading").html(b)},showLoading:function(){vabs.setIsCanClick(!1),$(".rb-vc-icon00").hide(),$(".rb-vc-icon01").hide(),$(".rb-vc-icon02").hide(),$(".rb-vc-icon03").hide(),this.hideVerifyResult(),$(".js-rb-vc-loading-box").show(),$(".js-rb-vc-infobox .loading").html("正在加载..."),vabs.clearRecord()},hideLoading:function(){this.hideVerifyResult(),$(".js-rb-vc-loading-box").hide(),vabs.clearRecord()},verifySuccess:function(){vabs.setIsCanClick(!1),vabs.setIsCanRefresh(!1);var a=null;clearTimeout(a),$(".js-rb-vc-infobox").addClass("rb-vc-success"),$(".js-rb-vc-infobox .loading").html("验证通过"),$(".js-rb-vc-flashpic").animate({left:"400px"},800),a=setTimeout(function(){$(".js-rb-vc-flashpic").css({left:"-150px"}),setTimeout(function(){"1"==vabs.getType()&&Events.close(),vabs.doSuccessCallBack(vabs.getCaptchaId())},600)},1e3),$(".js-rb-vc-sshadow").show()},verifyFailure:function(){vabs.setIsCanClick(!1),vabs.setIsCanRefresh(!0);var a=null;clearTimeout(a),$(".js-rb-vc-infobox").addClass("rb-vc-failure"),$(".js-rb-vc-infobox .loading").html("验证失败"),a=setTimeout(function(){Events.load()},400)},hideVerifyResult:function(){$(".js-rb-vc-infobox").removeClass("rb-vc-failure"),$(".js-rb-vc-infobox").removeClass("rb-vc-success"),$(".js-rb-vc-sshadow").hide()},showLoadFialed:function(a){vabs.setIsCanClick(!1),vabs.setIsCanRefresh(!0),$(".js-rb-vc-infobox").removeClass("rb-vc-failure"),$(".js-rb-vc-infobox").removeClass("rb-vc-success"),$(".js-rb-vc-infobox .loading").html(a),$(".js-rb-vc-loading-box").hide(),$(".js-rb-vc-select-pic").attr("src","/captcha/static/cssImg/rb-vc-loadingfail-bg.png")},round:function(a,b){var c=Math.pow(10,b);return Math.round(a*c)/c}},request={refreshCaptcha:function(){request.getCaptcha()},getCaptcha:function(){$.ajax({url:vabs.getGet(),data:{appId:vabs.getAppId(),type:vabs.getType(),h:vabs.getH(),version:vabs.getVersion(),rand:Math.random()},async:!0,type:"post",contentType:"application/x-www-form-urlencoded;charset=UTF-8",dataType:"json",success:function(a){"200"==a.code?(vabs.setCaptchaId(a.token),vabs.setStartTime((new Date).getTime()),funcs.showCaptcha(a)):"405"==a.code?funcs.showLoadFialed("尝试次数过多，请稍后再试！"):funcs.showLoadFialed("加载失败，请稍后再试！")},error:function(){funcs.showLoadFialed("加载失败，请稍后再试！")}})},checkCaptcha:function(){$.ajax({url:vabs.getCheck(),data:{appId:vabs.getAppId(),captchaId:vabs.getCaptchaId(),type:vabs.getType(),h:vabs.getH(),data:vabs.orgData(),version:vabs.getVersion(),rand:Math.random()},async:!0,type:"post",contentType:"application/x-www-form-urlencoded;charset=UTF-8",dataType:"json",success:function(a){"200"==a.code?funcs.verifySuccess():funcs.verifyFailure()},error:function(){}})}};