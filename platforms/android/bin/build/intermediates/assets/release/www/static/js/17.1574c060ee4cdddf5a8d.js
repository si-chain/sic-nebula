webpackJsonp([17],{"7Q15":function(e,n,t){var a=t("sj1t");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);t("FIqI")("51c21ee6",a,!0,{})},J8AK:function(e,n,t){"use strict";function a(e){t("7Q15")}Object.defineProperty(n,"__esModule",{value:!0});var i=t("Z2Kc"),s=(i.a,{components:{XHeader:i.a},data:function(){return{versionData:[]}},created:function(){var e=this;this.$http.get("http://sic-client.oss-cn-beijing.aliyuncs.com/version.json?num="+1e3*Math.random()).then(function(n){e.versionData=n.data.version.reverse(),console.log(e.versionData)})}}),r=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("x-header",{attrs:{"left-options":{backText:""}}},[e._v(e._s(e.$t("index.version_log")))]),e._v(" "),e._l(e.versionData,function(n,a){return t("div",{key:a,staticClass:"version-wrap"},[t("p",[e._v("V "+e._s(n.ver))]),e._v(" "),t("ul",e._l(n.msg,function(n){return t("li",{key:n},[e._v(e._s(n))])}))])})],2)},o=[],c={render:r,staticRenderFns:o},l=c,v=t("vSla"),u=a,d=v(s,l,!1,u,"data-v-72ae15c2",null);n.default=d.exports},sj1t:function(e,n,t){n=e.exports=t("UTlt")(!1),n.push([e.i,"\n.version-wrap[data-v-72ae15c2] {\n  margin: 3.5rem 2rem 0 2rem ;\n}\np[data-v-72ae15c2] {\n  font-size: 1.5rem;\n  font-weight: 500;\n  line-height: 2;\n}\nul[data-v-72ae15c2] {\n  margin-left: 1rem;\n  list-style-type: disc;\n  list-style-position: inside;\n}\n.vux-header[data-v-72ae15c2] {\n  position: absolute;\n  top: 0;\n  width: 100%;\n}\n",""])}});