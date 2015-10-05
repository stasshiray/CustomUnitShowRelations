tau.mashups.addModule("CustomUnitShowRelations/config", {});
/*! v0.1.0 Build Mon Oct 05 2015 13:07:19 GMT+0300 (MSK) */
!function(){var mashup={},define=function(){var t,e,n,i=Array.prototype.slice.call(arguments,0);"string"==typeof i[0]?(n=i[0],t=i[1],e=i[2]):Array.isArray(i[0])&&(t=i[0],e=i[1]);var r=t.reduce(function(t,e){return t.addDependency(e)},tau.mashups);return r=r.addDependency(n+"/config"),r=r.addMashup(function(){var i=Array.prototype.slice.call(arguments,0);if(t.length>0&&1===i.length)throw new Error("Can't properly load dependencies for mashup \""+n+'", mashup is stopped.');return mashup.variables=i[i.length-1],i.length-t.length===2?mashup.config=i[i.length-2]:mashup.config={},Object.freeze&&(Object.freeze(mashup.variables),Object.freeze(mashup.config),Object.freeze(mashup)),e.apply(null,i)})};define("CustomUnitShowRelations",["jQuery","Underscore","tau/configurator","tau/models/board.customize.units/const.entity.types.names","tau/models/board.customize.units/const.card.sizes","tau/models/board.customize.units/board.customize.units.interaction"],function(__WEBPACK_EXTERNAL_MODULE_3__,__WEBPACK_EXTERNAL_MODULE_4__,__WEBPACK_EXTERNAL_MODULE_5__,__WEBPACK_EXTERNAL_MODULE_10__,__WEBPACK_EXTERNAL_MODULE_11__,__WEBPACK_EXTERNAL_MODULE_12__){return function(t){function e(i){if(n[i])return n[i].exports;var r=n[i]={exports:{},id:i,loaded:!1};return t[i].call(r.exports,r,r.exports,e),r.loaded=!0,r.exports}var n={};return e.m=t,e.c=n,e.p="",e.p=mashup.variables?mashup.variables.mashupPath:e.p,e(0)}([function(t,e,n){t.exports=n(2)},,function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}var r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},o=n(3),a=i(o),s=n(4),u=i(s),l=n(5),d=i(l),p=n(6),c=i(p),h=n(13);n(14);var f=n(18),m=i(f),_=n(19),g=i(_),y=void 0,v=void 0,x=void 0,C=void 0,w=void 0,R=void 0,b=void 0,U=void 0,E=void 0,S=[{name:"Dependency",style:"#000000"},{name:"Blocker",style:"#bd0010"},{name:"Relation",style:"#aaa"},{name:"Link",style:"#36ab45"},{name:"Duplicate",style:"#ff5400"}],A=function(t){var e=t.style;return"object"==typeof e?e.stroke:e},k=function(t){var e=t.name;return e+"_start"},L=function(t){var e=t.name;return e+"_master_end"},M=function(t){var e=t.name;return e+"_slave_end"},N=function(){var t=function(t,e){return{directionType:e.toLowerCase(),relationType:{name:t.RelationType.Name},entity:{id:t[e].Id}}};return a["default"].ajax({url:d["default"].getApplicationPath()+"/api/v1/generals/"+U+"?include=[MasterRelations[Master,RelationType],SlaveRelations[Slave,RelationType]]&format=json",contentType:"application/json; charset=utf-8"}).then(function(e){return e.MasterRelations.Items.map(function(e){return t(e,"Master")}).concat(e.SlaveRelations.Items.map(function(e){return t(e,"Slave")}))}).fail(function(){return[]})},T=function(t,e,n){x.addClass("mashupCustomUnitShowRelations-highlighted"),a["default"](t).addClass("mashupCustomUnitShowRelations__highlighted"),a["default"](e).addClass("mashupCustomUnitShowRelations__highlighted"),w.parent().addClass("mashupCustomUnitShowRelations__svg-highlighted"),a["default"](n).css("opacity",1)},O=function(t,e,n){x.removeClass("mashupCustomUnitShowRelations-highlighted"),a["default"](t).removeClass("mashupCustomUnitShowRelations__highlighted"),a["default"](e).removeClass("mashupCustomUnitShowRelations__highlighted"),w.parent().removeClass("mashupCustomUnitShowRelations__svg-highlighted"),a["default"](n).removeAttr("style")},j=function(t,e){var n=arguments.length<=2||void 0===arguments[2]?!1:arguments[2],i=["M"+t.x+","+t.y],r=Math.PI/48*(n?-1:1),o=Math.cos(r),a=Math.sin(r),s={x:(t.x+e.x)/2,y:(t.y+e.y)/2},u={x:(s.x-t.x)*o-(s.y-t.y)*a+t.x,y:(s.x-t.x)*a+(s.y-t.y)*o+t.y},l=u.x+","+u.y;return i=i.concat("C"+l),i=i.concat(l),i.concat(e.x+","+e.y).join(" ")},B=function(t,e,n){var i="http://www.w3.org/2000/svg",r=t.getBoundingClientRect(),o=e.getBoundingClientRect(),s=C[0].getBoundingClientRect(),l={x:r.left-s.left,y:r.top-s.top,height:r.height,width:r.width},d={x:o.left-s.left,y:o.top-s.top,height:o.height,width:o.width},p=h.intersectRects(l,d);if("list"===b){var c=50*(n.index+1);"master"===n.directionType?(p.start.x=l.x+c,p.end.x=d.x+c):(p.start.x=l.x+l.width-c,p.end.x=d.x+d.width-c)}var f=j(p.start,p.end,"master"===n.directionType),m=u["default"].findWhere(S,{name:n.relationType.name}),_=A(m),g=document.createElementNS(i,"path");g.setAttribute("class","helperline"),g.setAttributeNS(null,"d",f),g.setAttributeNS(null,"stroke","grey"),g.setAttributeNS(null,"fill","none"),g.setAttributeNS(null,"stroke-width","20"),w[0].appendChild(g);var y=document.createElementNS(i,"path");y.setAttribute("class","line"),y.setAttributeNS(null,"d",f),y.setAttributeNS(null,"stroke",_),y.setAttributeNS(null,"fill","none"),y.setAttributeNS(null,"stroke-width","2"),"master"===n.directionType?(y.setAttributeNS(null,"marker-start","url(#"+k(m)+")"),y.setAttributeNS(null,"marker-end","url(#"+L(m)+")")):(y.setAttributeNS(null,"marker-end","url(#"+k(m)+")"),y.setAttributeNS(null,"marker-start","url(#"+M(m)+")")),w[0].appendChild(y);var v=a["default"](g).add(y);v.on("mouseenter",function(){return T(t,e,y)}),v.on("mouseleave",function(){return O(t,e,y)}),v.on("click",function(t){return t.stopPropagation()})},D=function(t,e){var n=u["default"].findWhere(S,{name:e.relationType.name}),i=A(n),r=a["default"](t);if("timeline"===b){var o=r.parent(".i-role-timeline-card-holder");o.length&&(r.addClass("mashupCustomUnitShowRelations__related"),r.addClass("master"===e.directionType?"mashupCustomUnitShowRelations__related-inbound":"mashupCustomUnitShowRelations__related-outbound"),r=o)}r.addClass("mashupCustomUnitShowRelations__related"),r.addClass("master"===e.directionType?"mashupCustomUnitShowRelations__related-inbound":"mashupCustomUnitShowRelations__related-outbound"),r.css("outline-color",i)},P=function(t){var e=t.$target;e.toArray().forEach(function(e){D(e,t),"timeline"!==b&&B(v,e,t)})},z=function(){x.removeClass("mashupCustomUnitShowRelations"),x.removeClass("mashupCustomUnitShowRelations-highlighted"),["related","related-inbound","related-outbound","source"].forEach(function(t){var e="mashupCustomUnitShowRelations__"+t;x.find("."+e).removeClass(e)}),w&&w.remove(),R&&R.remove()},W=function(){var t=C.height(),e=C.width();w=a["default"](g["default"]({relationTypes:S,width:e,height:t,getRelationColor:A,getRelationMarkerStartId:k,getMasterRelationMarkerEndId:L,getSlaveRelationMarkerEndId:M})),w.on("click",z),"list"===b?x.find(".i-role-unit-editor-popup-position-within").append(w):"timeline"===b?x.find(".tau-timeline-canvas").append(w):x.append(w)},X=function(t){C=x.children("table"),b="board",C.length||(C=x.find(".i-role-list-root-container"),b="list"),C.length||(b="timeline"),x.addClass("mashupCustomUnitShowRelations"),y.addClass("mashupCustomUnitShowRelations__source"),v=y[0],"timeline"!==b?W():x.one("click",function(t){t.stopPropagation(),t.preventDefault(),z()});var e=t.map(function(t){return r({},t,{$target:x.find(".i-role-card[data-entity-id="+t.entity.id+"]")})}).filter(function(t){return t.$target.length});"list"===b&&(e=u["default"].groupBy(e,function(t){return t.directionType}),e=u["default"].map(e,function(t){return t.map(function(t,e){return r({},t,{index:e})})}),e=u["default"].reduce(e,function(t,e){return t.concat(e)},[])),e.forEach(P)},I=function(t){var e=t.filter(function(t){return a["default"](".i-role-card[data-entity-id="+t.entity.id+"]").length}).map(function(t){return t.relationType.name}),n=S.filter(function(t){return e.indexOf(t.name)>=0});R=a["default"](m["default"]({relationTypes:n,showMessage:e.length<t.length,getRelationColor:A})),x.parent().append(R),R.on("click","a",function(){c["default"].getAppConfigurator().then(function(t){t.getEntityViewService().showEntityView({entityId:U,entityType:E})})})};a["default"](document.body).on("click",".tau-board-unit_type_relations-counter-in-out",function(t){t.stopPropagation(),t.preventDefault(),x&&z(),x=a["default"](".i-role-grid"),y=a["default"](t.target).parents(".i-role-card"),U=y.data("entityId"),E=y.data("entityType"),U&&N().then(function(t){I(t),X(t)})})},function(t,e){t.exports=__WEBPACK_EXTERNAL_MODULE_3__},function(t,e){t.exports=__WEBPACK_EXTERNAL_MODULE_4__},function(t,e){t.exports=__WEBPACK_EXTERNAL_MODULE_5__},function(t,e,n){"use strict";var i=n(7),r=n(8),o=n(9);t.exports={addBusListener:r.addBusListener,addBusListenerOnce:r.addBusListenerOnce,getAppConfigurator:i.getAppConfigurator,configurator:i,events:r,customUnits:o}},function(t,e,n){"use strict";var i=n(5),r=n(3),o=new r.Deferred;i.getGlobalBus().once("configurator.ready",function(t,e){o.resolve(e)});var a=function(){return o.promise()};t.exports={getAppConfigurator:a}},function(t,e,n){"use strict";var i=n(5),r=i.getBusRegistry(),o=function(t){return function(){t.apply(null,Array.prototype.slice.call(arguments).slice(1))}},a=function(t,e,n,i){var a=o(function(r){var o=r.bus;o.name===t&&o[i?"once":"on"](e,n)}),s=r.addEventListener("create",a);return r.addEventListener("destroy",o(function(i){var r=i.bus;r.name===t&&r.removeListener(e,n,s)})),{remove:function(){r.removeListener("create",a,s),r.getBusRegistry().getByName(t).then(function(t){t.removeListener(e,n,s)})}}},s=function(t,e,n){return a(t,e,n,!0)};t.exports={addBusListener:a,addBusListenerOnce:s}},function(t,e,n){"use strict";var i=n(10),r=n(11),o=n(12).openUnitEditor,a=n(7),s=function(t){return t=t||{},t.types=t.types||[i.ANY_TYPE],t.sizes=t.sizes||Object.keys(r).map(function(t){return r[t]}),a.getAppConfigurator().then(function(e){var n=e.getUnitsRegistry();if(!t.id)throw new Error('Field "id" is required for custom unit config');if(n.units[t.id])throw new Error('Custom unit with id "'+t.id+'" has been already registered');t.name=t.name||t.id,t.model=t.model||t.sampleData?t.model:{dummy:1},"string"!=typeof t.model&&"object"==typeof t.model&&(t.model=Object.keys(t.model).reduce(function(e,n){return e.concat(n+":"+t.model[n])},[]).join(", ")),t.sampleData=t.sampleData||{},t.template=t.template||{markup:['<div class="tau-board-unit__value">'+t.id+"</div>"]},"string"==typeof t.template&&(t.template={markup:[t.template]}),"string"==typeof t.template.markup&&(t.template.markup=[t.template.markup]),t.outerClassName&&(t.classId=t.outerClassName),t.isEditable&&(t.interactionConfig={isEditable:t.isEditable},t.editorHandler?t.interactionConfig.handler=t.editorHandler:t.interactionConfig.handler=function(e,n){var i=e.cardDataForUnit,r=t.editorComponentName instanceof Function?t.editorComponentName(i):t.editorComponentName,a=o(r,{});if(t.editorData){var s={};Object.keys(t.editorData).forEach(function(e){var n=t.editorData[e];s[e]=n instanceof Function?n(i):i[n]}),e.cardDataForUnit=s}return a(e,n)}),n.units[t.id]=n.register([t])[t.id]})};t.exports={types:i,sizes:r,add:s}},function(t,e){t.exports=__WEBPACK_EXTERNAL_MODULE_10__},function(t,e){t.exports=__WEBPACK_EXTERNAL_MODULE_11__},function(t,e){t.exports=__WEBPACK_EXTERNAL_MODULE_12__},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(t,e){var n=t.x1,i=t.x2,r=t.y1,o=t.y2,a=e.x1,s=e.x2,u=e.y1,l=e.y2,d=(r*(l-u)*(i-n)-u*(o-r)*(s-a)+(a-n)*(l-u)*(o-r))/((l-u)*(i-n)-(o-r)*(s-a)),p=(n*(s-a)*(o-r)-a*(i-n)*(l-u)+(u-r)*(s-a)*(i-n))/((s-a)*(o-r)-(i-n)*(l-u));return{x:p,y:d}},i=function(t){return[{x1:t.x,y1:t.y,x2:t.x+t.width,y2:t.y},{x1:t.x+t.width,y1:t.y,x2:t.x+t.width,y2:t.y+t.height},{x1:t.x,y1:t.y+t.height,x2:t.x+t.width,y2:t.y+t.height},{x1:t.x,y1:t.y,x2:t.x,y2:t.y+t.height}]},r=function(t,e,n){var i=t.x>=Math.min(e.x1,e.x2)&&t.x<=Math.max(e.x1,e.x2),r=t.x>=Math.min(n.x1,n.x2)&&t.x<=Math.max(n.x1,n.x2),o=t.y>=Math.min(e.y1,e.y2)&&t.y<=Math.max(e.y1,e.y2),a=t.y>=Math.min(n.y1,n.y2)&&t.y<=Math.max(n.y1,n.y2);return i&&r&&o&&a},o=function(t,e){var o=i(t),a=void 0;return o.forEach(function(t){var i=n(t,e);r(i,e,t)&&(a=i)}),a},a=function(t,e){var n={x1:t.x+t.width/2,y1:t.y+t.height/2,x2:e.x+e.width/2,y2:e.y+e.height/2};return{start:o(t,n),end:o(e,n)}};e.intersectRects=a},function(t,e,n){var i=n(15);"string"==typeof i&&(i=[[t.id,i,""]]);n(17)(i,{});i.locals&&(t.exports=i.locals)},function(t,e,n){e=t.exports=n(16)(),e.push([t.id,".mashupCustomUnitShowRelations__svg{position:absolute;top:0;left:0;z-index:99}.mashupCustomUnitShowRelations .i-role-card,.mashupCustomUnitShowRelations .tau-show-more-cards-trigger{opacity:.3;transition:opacity .1s}.mashupCustomUnitShowRelations__related,.mashupCustomUnitShowRelations__source{opacity:1!important;background-color:#fff!important;z-index:9;position:relative}.mashupCustomUnitShowRelations__related-inbound,.mashupCustomUnitShowRelations__related-outbound{outline-width:1px!important;outline-style:solid!important}.mashupCustomUnitShowRelations-highlighted .mashupCustomUnitShowRelations__related{opacity:.3!important}.mashupCustomUnitShowRelations-highlighted .mashupCustomUnitShowRelations__highlighted{opacity:1!important}.mashupCustomUnitShowRelations__svg-highlighted path.line{opacity:.3}.mashupCustomUnitShowRelations__svg-highlighted .mashupCustomUnitShowRelations__highlighted{opacity:1!important}.mashupCustomUnitShowRelations__svg .helperline{opacity:0}.mashupCustomUnitShowRelations__svg .line{transition:opacity .1s}.mashupCustomUnitShowRelations-legend{position:absolute;top:0;left:0;z-index:999;background:#fff;font-size:12px;padding:5px 15px 15px;opacity:.7}.mashupCustomUnitShowRelations-legend:hover{opacity:1}.mashupCustomUnitShowRelations-legend h3{font-weight:600;font-size:12px}.mashupCustomUnitShowRelations-legend__line+.mashupCustomUnitShowRelations-legend__line{margin-top:10px}.mashupCustomUnitShowRelations-legend__link{color:#28428b;cursor:pointer}.i-role-grid .tau-board-unit_type_relations-counter-in-out{cursor:pointer!important}",""])},function(t,e){t.exports=function(){var t=[];return t.toString=function(){for(var t=[],e=0;e<this.length;e++){var n=this[e];n[2]?t.push("@media "+n[2]+"{"+n[1]+"}"):t.push(n[1])}return t.join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var i={},r=0;r<this.length;r++){var o=this[r][0];"number"==typeof o&&(i[o]=!0)}for(r=0;r<e.length;r++){var a=e[r];"number"==typeof a[0]&&i[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),t.push(a))}},t}},function(t,e,n){function i(t,e){for(var n=0;n<t.length;n++){var i=t[n],r=p[i.id];if(r){r.refs++;for(var o=0;o<r.parts.length;o++)r.parts[o](i.parts[o]);for(;o<i.parts.length;o++)r.parts.push(s(i.parts[o],e))}else{for(var a=[],o=0;o<i.parts.length;o++)a.push(s(i.parts[o],e));p[i.id]={id:i.id,refs:1,parts:a}}}}function r(t){for(var e=[],n={},i=0;i<t.length;i++){var r=t[i],o=r[0],a=r[1],s=r[2],u=r[3],l={css:a,media:s,sourceMap:u};n[o]?n[o].parts.push(l):e.push(n[o]={id:o,parts:[l]})}return e}function o(){var t=document.createElement("style"),e=f();return t.type="text/css",e.appendChild(t),t}function a(){var t=document.createElement("link"),e=f();return t.rel="stylesheet",e.appendChild(t),t}function s(t,e){var n,i,r;if(e.singleton){var s=_++;n=m||(m=o()),i=u.bind(null,n,s,!1),r=u.bind(null,n,s,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=a(),i=d.bind(null,n),r=function(){n.parentNode.removeChild(n),n.href&&URL.revokeObjectURL(n.href)}):(n=o(),i=l.bind(null,n),r=function(){n.parentNode.removeChild(n)});return i(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;i(t=e)}else r()}}function u(t,e,n,i){var r=n?"":i.css;if(t.styleSheet)t.styleSheet.cssText=g(e,r);else{var o=document.createTextNode(r),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(o,a[e]):t.appendChild(o)}}function l(t,e){var n=e.css,i=e.media;e.sourceMap;if(i&&t.setAttribute("media",i),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}function d(t,e){var n=e.css,i=(e.media,e.sourceMap);i&&(n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */");var r=new Blob([n],{type:"text/css"}),o=t.href;t.href=URL.createObjectURL(r),o&&URL.revokeObjectURL(o)}var p={},c=function(t){var e;return function(){return"undefined"==typeof e&&(e=t.apply(this,arguments)),e}},h=c(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),f=c(function(){return document.head||document.getElementsByTagName("head")[0]}),m=null,_=0;t.exports=function(t,e){e=e||{},"undefined"==typeof e.singleton&&(e.singleton=h());var n=r(t);return i(n,e),function(t){for(var o=[],a=0;a<n.length;a++){var s=n[a],u=p[s.id];u.refs--,o.push(u)}if(t){var l=r(t);i(l,e)}for(var a=0;a<o.length;a++){var u=o[a];if(0===u.refs){for(var d=0;d<u.parts.length;d++)u.parts[d]();delete p[u.id]}}}};var g=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}()},function(module,exports){module.exports=function(obj){var __t,__p="";Array.prototype.join;with(obj||{})__p+='<div class="mashupCustomUnitShowRelations-legend">\n\n    ',showMessage&&(__p+='\n\n        <p class="mashupCustomUnitShowRelations-legend__empty">\n            The selected card has related entities that are not represented on this view.\n            <br />Check the related entities in the <a class="mashupCustomUnitShowRelations-legend__link">cards details</a>.\n        </p>\n\n    '),__p+="\n\n    ",relationTypes.length&&(__p+="\n\n        <h3>Arrows</h3>\n        <div>\n            ",relationTypes.forEach(function(t){__p+="\n                ";var e=getRelationColor(t);__p+='\n                <div class="mashupCustomUnitShowRelations-legend__line">\n                    <svg width="38px" height="7px" viewBox="0 0 38 7" version="1.1" xmlns="http://www.w3.org/2000/svg">\n                        <path d="M0.5,3.5 L27.5,3.5" stroke-linecap="square" stroke="'+(null==(__t=e)?"":__t)+'"></path>\n                        <path d="M27.5,3.5 L20.7,0.5 L20.7,6.5 L27.5,3.5 Z" stroke-linecap="square" stroke="'+(null==(__t=e)?"":__t)+'" fill="'+(null==(__t=e)?"":__t)+'"></path>\n                    </svg>\n                    '+(null==(__t=t.name)?"":__t)+"\n                </div>\n            "}),__p+="\n        </div>\n\n    "),__p+="\n\n</div>\n\n";return __p}},function(module,exports){module.exports=function(obj){var __t,__p="";Array.prototype.join;with(obj||{})__p+='<svg xmlns="http://www.w3.org/2000/svg" class="mashupCustomUnitShowRelations__svg"\n    viewBox="0 0 '+(null==(__t=width)?"":__t)+" "+(null==(__t=height)?"":__t)+'"\n    width="'+(null==(__t=width)?"":__t)+'px" height="'+(null==(__t=height)?"":__t)+'px">\n    <defs>\n        ',relationTypes.forEach(function(t){__p+='\n\n            <marker id="'+(null==(__t=getRelationMarkerStartId(t))?"":__t)+'" markerWidth="7" markerHeight="7" refX="5" refY="5">\n                <circle cx="5" cy="5" r="2" style="stroke: none; fill:'+(null==(__t=getRelationColor(t))?"":__t)+';"/>\n            </marker>\n            <marker id="'+(null==(__t=getMasterRelationMarkerEndId(t))?"":__t)+'" markerWidth="4" markerHeight="4" orient="auto" refY="2" refX="0">\n                <path d="M0,0 L4,2 0,4" fill="'+(null==(__t=getRelationColor(t))?"":__t)+'" />\n            </marker>\n            <marker id="'+(null==(__t=getSlaveRelationMarkerEndId(t))?"":__t)+'" markerWidth="4" markerHeight="4" orient="auto" refY="2" refX="4">\n                <path d="M0,0 L4,2 0,4" fill="'+(null==(__t=getRelationColor(t))?"":__t)+'" transform="rotate(180 2 2)" />\n            </marker>\n\n        '}),__p+="\n    </defs>\n</svg>\n";return __p}}])})}();
