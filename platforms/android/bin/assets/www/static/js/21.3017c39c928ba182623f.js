webpackJsonp([21],{b7bZ:function(n,t,e){t=n.exports=e("UTlt")(!1),t.push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},fN5A:function(n,t,e){var i=e("b7bZ");"string"==typeof i&&(i=[[n.i,i,""]]),i.locals&&(n.exports=i.locals);e("FIqI")("3a14235e",i,!0,{})},fsq8:function(n,t,e){"use strict";function i(n){e("fN5A")}Object.defineProperty(t,"__esModule",{value:!0});var s=e("mqrw"),o=e("CKVb"),a=e("sB+r"),r=e("fvyU"),d=e("IXui"),c=e("Z2Kc"),u=e("ZrYT"),l=e("Jp5S"),h=(l.a,o.a,r.a,d.a,a.a,c.a,u.a,s.a,{directives:{TransferDom:l.a},data:function(){return{phoneNumber:"",validateCode:"",sendCode:this.$t("identity.sendCode"),timer:null,isPhone:!1,isIdentityMsg:!1,description:"",buttons:[],title:this.$t("identity.success"),icon:""}},methods:{phoneNumberChange:function(n){/^[1][3,4,5,7,8][0-9]{9}$/.test(n)?this.isPhone=!0:this.isPhone=!1},getCode:function(){var n=this,t={country:86,mobile:this.phoneNumber};this.$http.post(this.basePath+"/v1/msg/sms/code",t).then(function(t){var e=60,i=n;n.timer=setInterval(function(){i.sendCode=e--+" S",-1===e&&(clearInterval(i.timer),i.sendCode=i.$t("identity.next"))},1e3)})},verifyCode:function(){var n=this,t={mobile:this.phoneNumber,country:86,code:this.validateCode,account:this.$store.state.account},e=this;this.$http.post(this.basePath+"/v1/msg/sms/code/verify",t).then(function(t){t.data.success?(e.buttons=[{type:"primary",text:e.$t("identity.success"),link:"/home?account="+e.$store.state.account}],e.title=e.$t("identity.success"),e.icon="success",e.isIdentityMsg=!0,n.$store.commit("upDataIdentityAccount",e.$store.state.account)):(e.buttons=[{type:"warn",text:e.$t("identity.error"),onClick:e.nextDo.bind(e)}],e.icon="warn",e.title=e.$t("identity.error"),e.isIdentityMsg=!0)})},nextDo:function(){this.isIdentityMsg=!1,this.validateCode=""},clearTimer:function(){this.timer&&clearInterval(this.timer)}},created:function(){this.clearTimer()},beforeDestroy:function(){this.clearTimer()},components:{Group:o.a,XInput:r.a,XButton:d.a,Box:a.a,XHeader:c.a,Msg:u.a,Alert:s.a}}),m=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",[e("x-header",{attrs:{"left-options":{backText:""}}},[n._v(n._s(n.$t("index.identity")))]),n._v(" "),e("group",[e("x-input",{attrs:{title:n.$t("identity.phone"),name:"mobile",placeholder:n.$t("identity.placeholder"),keyboard:"number","is-type":"china-mobile"},on:{"on-change":n.phoneNumberChange},model:{value:n.phoneNumber,callback:function(t){n.phoneNumber=t},expression:"phoneNumber"}}),n._v(" "),e("x-input",{staticClass:"weui-vcode",attrs:{title:n.$t("identity.code"),max:4,min:4},model:{value:n.validateCode,callback:function(t){n.validateCode=t},expression:"validateCode"}},[e("x-button",{attrs:{slot:"right",disabled:!(("发送验证码"===n.sendCode||"Send Code"===n.sendCode||"重置"===n.sendCode||"Resend"===n.sendCode)&&n.isPhone),type:"primary",mini:""},nativeOn:{click:function(t){return n.getCode(t)}},slot:"right"},[n._v(n._s(n.sendCode))])],1)],1),n._v(" "),e("box",{attrs:{gap:"10px 10px"}},[e("x-button",{attrs:{disabled:!(n.isPhone&&""!==n.validateCode),type:"primary"},nativeOn:{click:function(t){return n.verifyCode(t)}}},[n._v(n._s(n.$t("index.confirm")))])],1),n._v(" "),e("div",{directives:[{name:"transfer-dom",rawName:"v-transfer-dom"}]},[e("alert",{attrs:{"button-text":" "},model:{value:n.isIdentityMsg,callback:function(t){n.isIdentityMsg=t},expression:"isIdentityMsg"}},[e("msg",{attrs:{slot:"default",title:n.title,description:n.description,buttons:n.buttons,icon:n.icon},slot:"default"})],1)],1)],1)},p=[],v={render:m,staticRenderFns:p},b=v,f=e("vSla"),y=i,C=f(h,b,!1,y,null,null);t.default=C.exports}});