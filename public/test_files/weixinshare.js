(function(){
	function WeixinShare(options){
		var _self = this;
		_self.opts = $.extend({}, WeixinShare.DEFAULTS, options);
		_self._init();
	};
	WeixinShare.DEFAULTS = {
		title:"",//标题
		link:"",//活动上传的地址
		desc:"",//描述的内容
		img:""//分享图片的地址
	};
	WeixinShare.prototype = {
		_init:function(){
			var self = this;
			var opts = self.opts
			opts.link = (window.location.href).split("#")[0]; //这是放在下面的每个分享的link里的内容，里面的“.split("#")[0]”，这是必须添加的、
			
			//分享到朋友圈接口
			var appid = "",
		    timestamp = "",
		    nonceStr = "",
		    signature = "",
		    token = "";
			//通过ajax获取timestamp，nonceStr，signature,appId
			$.ajax({
			    type: "post",
			    url: "http://www.epicc.com.cn/microShop/shareLink/share/link",
			    data: {
			        link: opts.link
			    },
			    async: false,
			    dataType: "json",
			    success: function (data) {
			        var myObject = JSON.parse(data.jsonObjectFromMap);
			        appid = myObject.appid;
			        timestamp = myObject.timestamp;
			        nonceStr = myObject.nonceStr;
			        signature = myObject.signature;
			        token = myObject.token;
			    }
			});
			wx.config({
			    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			    appId: appid, // 必填，公众号的唯一标识
			    timestamp: timestamp, // 必填，生成签名的时间戳
			    nonceStr: nonceStr, // 必填，生成签名的随机串
			    signature: signature, // 必填，签名，见附录1
			    jsApiList: ['showOptionMenu', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'hideMenuItems',
			        'getLocation'
			    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			});
			wx.ready(function () {
			    wx.checkJsApi({
			        jsApiList: ['showOptionMenu', 'onMenuShareTimeline', 'onMenuShareAppMessage',
			            'hideMenuItems'
			        ],
			        success: function (res) {}
			    });
			    wx.showOptionMenu();
			    //分享到朋友圈
			    wx.onMenuShareTimeline({
			        title: opts.desc, // 分享描述，这里没弄错，就是desc，
			        link: opts.link, // 分享链接
			        imgUrl: opts.img, // 分享图标
			        success: function () {
			            // 用户确认分享后执行的回调函数
			        },
			        cancel: function () {
			            // 用户取消分享后执行的回调函数
			        }
			    });
			    //分享给朋友接口
			    wx.onMenuShareAppMessage({
			        title: opts.title, // 分享标题
			        desc: opts.desc, // 分享描述
			        link: opts.link, // 分享链接
			        imgUrl: opts.img, // 分享图标
			        type: '', // 分享类型,music、video或link，不填默认为link
			        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
			        success: function () {
			            // 用户确认分享后执行的回调函数
			        },
			        cancel: function () {
			            // 用户取消分享后执行的回调函数
			        }
			    });
			    wx.onMenuShareQQ({
			        title: opts.title, // 分享标题
			        desc: opts.desc, // 分享描述
			        link: opts.link, // 分享链接
			        imgUrl: opts.img, // 分享图标
			        type: '', // 分享类型,music、video或link，不填默认为link
			        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
			        success: function () {
			            // 用户确认分享后执行的回调函数
			        },
			        cancel: function () {
			            // 用户取消分享后执行的回调函数
			        }
			    });
			});
		}
	}
	$.extend({
		weixinShare:function (options) {
			new WeixinShare(options);
		}
	});
})(jQuery)