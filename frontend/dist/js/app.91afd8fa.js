(function(e){function t(t){for(var r,a,c=t[0],o=t[1],u=t[2],d=0,h=[];d<c.length;d++)a=c[d],i[a]&&h.push(i[a][0]),i[a]=0;for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r]);l&&l(t);while(h.length)h.shift()();return s.push.apply(s,u||[]),n()}function n(){for(var e,t=0;t<s.length;t++){for(var n=s[t],r=!0,c=1;c<n.length;c++){var o=n[c];0!==i[o]&&(r=!1)}r&&(s.splice(t--,1),e=a(a.s=n[0]))}return e}var r={},i={app:0},s=[];function a(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=r,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(n,r,function(t){return e[t]}.bind(null,r));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],o=c.push.bind(c);c.push=t,c=c.slice();for(var u=0;u<c.length;u++)t(c[u]);var l=o;s.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var r=n("c21b"),i=n.n(r);i.a},"11da":function(e,t,n){},"30f7":function(e,t,n){"use strict";var r=n("914b"),i=n.n(r);i.a},"34c4":function(e,t,n){"use strict";var r=n("dabb"),i=n.n(r);i.a},"409e":function(e,t,n){"use strict";var r=n("d735"),i=n.n(r);i.a},5557:function(e,t,n){"use strict";var r=n("7187"),i=n.n(r);i.a},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("097d");var r,i=n("2b0e"),s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("Notifications"),e.game.started?n("Table",{attrs:{game:e.game}}):n("WelcomeScreen",{attrs:{game:e.game}})],1)},a=[],c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"welcome"},[n("h1",[e._v("Doppelkopf")]),n("div",{staticClass:"button",on:{click:function(t){e.game.startGame()}}},[e._v("\n    Start Game!\n  ")])])},o=[],u=n("c665"),l=n("aa9a"),d=n("2ef0"),h=function(){function e(){if(Object(u["a"])(this,e),r)return r;this.messages=[],r=this}return Object(l["a"])(e,[{key:"info",value:function(e){var t=this;this.messages.push({id:Object(d["uniqueId"])("message_"),text:e}),window.setTimeout(function(){t.messages.pop()},4e3)}}]),e}(),f={name:"WelcomeScreen",props:{game:{type:Object,required:!0}}},p=f,v=(n("8646"),n("2877")),y=Object(v["a"])(p,c,o,!1,null,"a9132272",null);y.options.__file="WelcomeScreen.vue";var k=y.exports,b=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"notifications"},[n("transition-group",{attrs:{name:"message"}},e._l(e.messages,function(t){return n("div",{key:t.id,staticClass:"message"},[e._v("\n      "+e._s(t.text)+"\n    ")])}))],1)},m=[],g={name:"Notifications",data:function(){return{messages:(new h).messages}}},w=g,j=(n("30f7"),Object(v["a"])(w,b,m,!1,null,"540a16d0",null));j.options.__file="Notifications.vue";var _=j.exports,C=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"table"},[n("Player",{staticClass:"left",attrs:{player:e.game.players[1],position:"left"}}),n("Player",{staticClass:"top",attrs:{player:e.game.players[2],position:"top"}}),n("div",{staticClass:"center"},[n("Trick",{attrs:{currentTrick:e.game.currentTrick}})],1),n("Controls",{attrs:{game:e.game},on:{nextTrick:e.finishTrick,nextMove:e.nextMove,finishRound:e.finishRound}}),n("Player",{staticClass:"right",attrs:{player:e.game.players[3],position:"right"}}),n("Player",{staticClass:"bottom",attrs:{player:e.game.players[0],position:"bottom"}}),e.game.currentRound.isFinished()?n("Scorecard",{attrs:{scorecard:e.game.scorecard}}):e._e()],1)},O=[],T=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"player"},[n("div",{staticClass:"info"},[n("div",{staticClass:"name",class:e.position},[e._v(e._s(e.player.name))])]),n("div",{staticClass:"container"},[n("Hand",{attrs:{hand:e.hand,"is-covered":e.isCovered,"is-selectable":e.isHandSelectable,position:e.position,"playable-cards":e.playable()},on:{play:e.play}}),n("TrickStack",{attrs:{trickStack:e.player.trickStack}})],1)])},x=[],S=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"hand"},[n("div",{staticClass:"cards",class:e.position},[n("transition-group",{attrs:{name:"card",tag:"span"}},e._l(e.hand.cards,function(t){return n("Card",{key:t.cardId,attrs:{card:t,"is-selected":e.isSelected(t),"is-covered":e.isCovered,"is-highlighted":e.highlight(t),position:e.position},nativeOn:{click:function(n){e.select(t)}}})}))],1),e.isCovered?e._e():n("div",{staticClass:"info"},[n("div",{staticClass:"party"},[e._v("\n      "+e._s(e.hand.isRe()?"Re":"Kontra")+"\n    ")])])])},P=[],q=(n("6762"),n("2fdb"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"card",class:e.cardClasses},[e.isCovered?[n("div",{staticClass:"background"})]:[n("span",{staticClass:"suitTop",class:e.colorClasses},[e._v(e._s(e.card.suit))]),n("span",{staticClass:"rank"},[e._v(e._s(e.card.rank))]),n("span",{staticClass:"suitBottom",class:e.colorClasses},[e._v(e._s(e.card.suit))])]],2)}),R=[],E={clubs:"♣",diamonds:"♦",hearts:"♥",spades:"♠"},I={ace:"A",ten:"10",king:"K",queen:"Q",jack:"J"},F={A:11,10:10,K:4,Q:3,J:2},M=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:E[0],r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:Object(d["uniqueId"])("card_");Object(u["a"])(this,e),this.rank=t,this.suit=n,this.id=r}return Object(l["a"])(e,[{key:"of",value:function(t){return new e(this.rank,t)}},{key:"first",value:function(){return new e(this.rank,this.suit,0)}},{key:"second",value:function(){return new e(this.rank,this.suit,1)}},{key:"isTrump",value:function(){return Object(d["some"])(K,{rank:this.rank,suit:this.suit})}},{key:"beats",value:function(e){var t=this.isTrump(),n=e.isTrump();return!(!t||n)||!(!t&&n)&&(t&&n?Object(d["findIndex"])(K,{rank:e.rank,suit:e.suit})-Object(d["findIndex"])(K,{rank:this.rank,suit:this.suit})>=0:!t&&!n&&this.suit===e.suit&&this.value-e.value>=0)}},{key:"value",get:function(){return F[this.rank]}},{key:"cardId",get:function(){return"".concat(this.rank,"-").concat(this.suit,"-").concat(this.id)}}]),e}();function $(e,t){return Object(d["findIndex"])(G,t)-Object(d["findIndex"])(G,e)}var H=new M(I.ace,E.clubs),L=new M(I.ten,E.clubs),N=new M(I.king,E.clubs),B=new M(I.queen,E.clubs),A=new M(I.jack,E.clubs),K=[L.of(E.hearts),B.of(E.clubs),B.of(E.spades),B.of(E.hearts),B.of(E.diamonds),A.of(E.clubs),A.of(E.spades),A.of(E.hearts),A.of(E.diamonds),H.of(E.diamonds),L.of(E.diamonds),N.of(E.diamonds)],G=[new M(I.ten,E.hearts,0),new M(I.ten,E.hearts,1),new M(I.queen,E.clubs,0),new M(I.queen,E.clubs,1),new M(I.queen,E.spades,0),new M(I.queen,E.spades,1),new M(I.queen,E.hearts,0),new M(I.queen,E.hearts,1),new M(I.queen,E.diamonds,0),new M(I.queen,E.diamonds,1),new M(I.jack,E.clubs,0),new M(I.jack,E.clubs,1),new M(I.jack,E.spades,0),new M(I.jack,E.spades,1),new M(I.jack,E.hearts,0),new M(I.jack,E.hearts,1),new M(I.jack,E.diamonds,0),new M(I.jack,E.diamonds,1),new M(I.ace,E.diamonds,0),new M(I.ace,E.diamonds,1),new M(I.ten,E.diamonds,0),new M(I.ten,E.diamonds,1),new M(I.king,E.diamonds,0),new M(I.king,E.diamonds,1),new M(I.ace,E.clubs,0),new M(I.ace,E.clubs,1),new M(I.ten,E.clubs,0),new M(I.ten,E.clubs,1),new M(I.king,E.clubs,0),new M(I.king,E.clubs,1),new M(I.ace,E.spades,0),new M(I.ace,E.spades,1),new M(I.ten,E.spades,0),new M(I.ten,E.spades,1),new M(I.king,E.spades,0),new M(I.king,E.spades,1),new M(I.ace,E.hearts,0),new M(I.ace,E.hearts,1),new M(I.king,E.hearts,0),new M(I.king,E.hearts,1)],J={name:"Card",props:{card:{type:Object,required:!0},isSelected:{type:Boolean,required:!1},isCovered:{type:Boolean,required:!1},isHighlighted:{type:Boolean,required:!1},position:{type:String,required:!1}},computed:{colorClasses:function(){return{red:this.card.suit===E.hearts||this.card.suit===E.diamonds,black:this.card.suit===E.clubs||this.card.suit===E.spades}},cardClasses:function(){return{selected:this.isSelected,highlighted:this.isHighlighted,left:"left"===this.position,right:"right"===this.position,top:"top"===this.position,bottom:"bottom"===this.position}}}},W=J,z=(n("dc57"),Object(v["a"])(W,q,R,!1,null,"795d5119",null));z.options.__file="Card.vue";var Q=z.exports,D={name:"Hand",props:{hand:{type:Object,required:!0},isCovered:{type:Boolean,required:!1},position:{type:String,required:!1},playableCards:{type:Array,required:!0},isSelectable:{type:Boolean,required:!1,default:!1}},components:{Card:Q},data:function(){return{selectedCard:{}}},methods:{isSelected:function(e){return e===this.selectedCard},select:function(e){this.isSelectable&&(this.selectedCard===e?this.$emit("play",e):this.selectedCard=e)},highlight:function(e){return this.playableCards.includes(e)}}},Y=D,U=(n("9745"),Object(v["a"])(Y,S,P,!1,null,"6618c94a",null));U.options.__file="Hand.vue";var V=U.exports,X=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"trickStack",class:{hidden:e.isHidden}},[n("div",{staticClass:"cards"},[n("Card",{attrs:{"is-covered":!0,card:{}}})],1),n("p",{staticClass:"trickCount"},[e._v("Stiche: "+e._s(this.trickStack.tricks.length))])])},Z=[],ee={name:"TrickStack",components:{Card:Q},computed:{isHidden:function(){return this.trickStack.tricks.length<1}},props:{trickStack:{type:Object,required:!0}}},te=ee,ne=(n("409e"),Object(v["a"])(te,X,Z,!1,null,"62def9c7",null));ne.options.__file="TrickStack.vue";var re=ne.exports;function ie(e,t){if(!t)return e;if(!t.isTrump()){var n=e.filter(function(e){return e.suit===t.suit}).filter(function(e){return!e.isTrump()});return n.length>0?n:e}var r=e.filter(function(e){return e.isTrump()});return r.length>0?r:e}var se={name:"Player",props:{player:{type:Object,required:!0},position:{type:String,required:!1}},data:function(){return{hand:this.player.hand,isCovered:!this.player.isHuman,isHandSelectable:this.player.isHuman}},components:{Hand:V,TrickStack:re},methods:{play:function(e){this.player.play(e)},playable:function(){return ie(this.player.hand.cards,this.player.game.currentTrick.baseCard())}}},ae=se,ce=(n("5557"),Object(v["a"])(ae,T,x,!1,null,"8cf69c14",null));ce.options.__file="Player.vue";var oe=ce.exports,ue=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"trick"},[n("div",{staticClass:"cards"},[n("transition-group",{attrs:{name:"card",tag:"span"}},e._l(e.cards,function(e){return n("Card",{key:e.card.cardId,attrs:{card:e.card}})}))],1),e.winner?n("div",{staticClass:"winner"},[e._v("\n    Trick goes to: "+e._s(e.winner)+"\n  ")]):e._e()])},le=[],de={name:"Trick",props:["currentTrick"],computed:{cards:function(){return this.currentTrick.cards()},winner:function(){return this.currentTrick.winner()}},components:{Card:Q}},he=de,fe=(n("34c4"),Object(v["a"])(he,ue,le,!1,null,"05e50445",null));fe.options.__file="Trick.vue";var pe=fe.exports,ve=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"controls"},[e.game.currentTrick.isFinished()&&!e.game.currentRound.noMoreCardsLeft()?n("div",{staticClass:"button next",on:{click:function(t){e.triggerNextTrick()}}},[e._v("\n    ➡ Next trick\n  ")]):e._e(),e.game.currentRound.noMoreCardsLeft()&&!e.game.currentRound.isFinished()?n("div",{staticClass:"button finish",on:{click:function(t){e.triggerFinish()}}},[e._v("\n    ⏩ Finish round\n  ")]):e._e()])},ye=[],ke={name:"Controls",props:{game:{type:Object,required:!0}},methods:{triggerNextTrick:function(){this.$emit("nextTrick")},triggerFinish:function(){this.$emit("finishRound")}}},be=ke,me=(n("e6dc"),Object(v["a"])(be,ve,ye,!1,null,"53b9778e",null));me.options.__file="Controls.vue";var ge=me.exports,we=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"scorecard"},[n("h1",[e._v("Score")]),n("table",[n("tr",e._l(e.scorecard.players,function(t){return n("th",{key:t.id,staticClass:"player"},[e._v(e._s(t.name))])})),e._l(e.scorecard.scoreLines,function(t){return n("tr",{staticClass:"scoreLine"},e._l(t,function(t){return n("td",[e._v("\n        "+e._s(t)+"\n      ")])}))})],2)])},je=[],_e={name:"Scorecard",props:{scorecard:{type:Object,required:!0}}},Ce=_e,Oe=(n("6281"),Object(v["a"])(Ce,we,je,!1,null,"495719ea",null));Oe.options.__file="Scorecard.vue";var Te=Oe.exports,xe={name:"Table",props:{game:{type:Object,required:!0}},components:{Player:oe,Trick:pe,Controls:ge,Scorecard:Te},methods:{nextMove:function(){this.game.currentRound.nextMove()},finishTrick:function(){this.game.currentRound.finishTrick()},finishRound:function(){this.game.currentRound.finishRound()}}},Se=xe,Pe=(n("e2b0"),Object(v["a"])(Se,C,O,!1,null,"0d24d331",null));Pe.options.__file="Table.vue";var qe=Pe.exports,Re=n("a322"),Ee=(n("55dd"),n("7f7f"),function e(t,n){Object(u["a"])(this,e),this.card=t,this.player=n});function Ie(e,t){return e.card.beats(t.card)?-1:1}var Fe=function(){function e(t){Object(u["a"])(this,e),this.expectedNumberOfCards=t,this.playedCards=[],this.finished=!1,this.id=Object(d["uniqueId"])("trick_")}return Object(l["a"])(e,[{key:"add",value:function(e,t){if(this.cardBy(t))throw Error("Player ".concat(t.name," already played a card"));var n=new Ee(e,t.name);this.playedCards.push(n),this.playedCards.length===this.expectedNumberOfCards&&(this.finished=!0)}},{key:"cards",value:function(){return this.playedCards}},{key:"cardBy",value:function(e){return Object(d["find"])(this.playedCards,["player",e.name])}},{key:"isFinished",value:function(){return this.finished}},{key:"baseCard",value:function(){if(this.playedCards[0])return this.playedCards[0].card}},{key:"winner",value:function(){if(this.playedCards[0])return this.playedCards.slice().sort(Ie)[0].player}},{key:"points",value:function(){return this.playedCards.reduce(function(e,t){return e+t.card.value},0)}}]),e}(),Me=function(){function e(t){Object(u["a"])(this,e),this.elements=t,this.currentIndex=0}return Object(l["a"])(e,[{key:"length",value:function(){return this.elements.length}},{key:"next",value:function(){return this.currentIndex=(this.currentIndex+1)%this.elements.length,this.elements[this.currentIndex]}},{key:"current",value:function(){return this.elements[this.currentIndex]}},{key:"prioritize",value:function(e){var t=this.elements.indexOf(e);if(-1===t)throw new Error("can't prioritize unknown element '".concat(e,"'"));this.currentIndex=t}}]),e}(),$e="Re",He="Kontra",Le=function(){function e(t,n){if(Object(u["a"])(this,e),t+n!==240)throw Error("A score must have a total of 240 points. Got ".concat(t," for re, ").concat(n," for kontra"));this.rePoints=t,this.kontraPoints=n}return Object(l["a"])(e,[{key:"winner",value:function(){return this.rePoints>this.kontraPoints?$e:He}},{key:"points",value:function(){return 1}}]),e}(),Ne={autoplay:!0},Be=new h,Ae=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};Object(u["a"])(this,e),this.players=t,this.playerOrder=new Me(this.players),this.currentTrick=this.nextTrick(),this.finished=!1,this.game=n}return Object(l["a"])(e,[{key:"nextTrick",value:function(){return new Fe(this.players.length)}},{key:"nextPlayer",value:function(){this.playerOrder.next()}},{key:"waitingForPlayer",value:function(){return this.playerOrder.current()}},{key:"nextMove",value:function(){this.waitingForPlayer().isHuman?Be.info("It's your turn!"):this.currentTrick.isFinished()||this.isFinished()||this.waitingForPlayer().autoplay()}},{key:"findParties",value:function(){var e;return e={},Object(Re["a"])(e,$e,this.players.filter(function(e){return e.isRe()})),Object(Re["a"])(e,He,this.players.filter(function(e){return e.isKontra()})),e}},{key:"noMoreCardsLeft",value:function(){var e=function(e,t){return e+t.hand.cards.length},t=this.players.reduce(e,0);return 0===t}},{key:"isFinished",value:function(){return this.finished}},{key:"finishTrick",value:function(){this.evaluateLastTrick(),this.currentTrick=this.nextTrick(),!0===Ne.autoplay&&this.nextMove()}},{key:"evaluateLastTrick",value:function(){var e=this.currentTrick.winner(),t=Object(d["find"])(this.players,{name:e});t.win(this.currentTrick),this.playerOrder.prioritize(t)}},{key:"finishRound",value:function(){if(!this.noMoreCardsLeft())throw new Error("Can't finish a round before all cards have been played");this.evaluateLastTrick(),this.currentTrick=this.nextTrick();var e=this.calculateScore(),t=this.findParties()[e.winner()];this.game.addScore(t,e.points()),this.finished=!0}},{key:"calculateScore",value:function(){var e=this.findParties(),t=function(e,t){return e+t.points()},n=e[$e].reduce(t,0),r=e[He].reduce(t,0);return new Le(n,r)}}]),e}(),Ke=(n("7514"),function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];Object(u["a"])(this,e),this.cards=t,this.sort(),this.isReParty=Object(d["find"])(this.cards,{suit:E.clubs,rank:I.queen})}return Object(l["a"])(e,[{key:"isRe",value:function(){return!!this.isReParty}},{key:"isKontra",value:function(){return!this.isRe()}},{key:"value",value:function(){return this.cards.reduce(function(e,t){return e+t.value},0)}},{key:"find",value:function(e){return Object(d["find"])(this.cards,e)}},{key:"remove",value:function(e){if(!this.find(e))throw new Error("can't remove card that isn't on hand");this.cards=Object(d["without"])(this.cards,e)}},{key:"sort",value:function(){return this.cards.sort($).reverse()}}]),e}()),Ge=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];Object(u["a"])(this,e),this.tricks=t}return Object(l["a"])(e,[{key:"add",value:function(e){if(!e.isFinished())throw new Error("can not add an unfinished trick to the trick stack");this.tricks.push(e)}},{key:"cards",value:function(){var e=Object(d["flatMap"])(this.tricks,function(e){return e.playedCards});return e.map(function(e){return e.card})}},{key:"points",value:function(){return this.tricks.reduce(function(e,t){return e+t.points()},0)}}]),e}(),Je=function(){function e(){Object(u["a"])(this,e)}return Object(l["a"])(e,[{key:"cardToPlay",value:function(e,t){return Object(d["sample"])(ie(e.cards,t))}}]),e}(),We=new h,ze=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};Object(u["a"])(this,e),this.id=Object(d["uniqueId"])("player_"),this.name=t,this.hand=new Ke,this.isHuman=n,this.trickStack=new Ge,this.game=r,this.behavior=new Je}return Object(l["a"])(e,[{key:"isRe",value:function(){return this.hand.isRe()}},{key:"isKontra",value:function(){return!this.isRe()}},{key:"autoplay",value:function(){var e=this.behavior.cardToPlay(this.hand,this.game.currentTrick.baseCard());this.play(e)}},{key:"play",value:function(e){var t=this;if(this.game.currentRound.waitingForPlayer()===this){var n=this.hand.find(e);if(!e||!n)throw new Error("can't play a card that's not on the player's hand");this.canPlay(e)?(this.game.currentTrick.add(n,this),this.hand.remove(n),this.game.currentRound.nextPlayer(),!0===Ne.autoplay&&setTimeout(function(){return t.game.currentRound.nextMove()},800)):We.info("You can't play that card")}else We.info("It's not your turn, buddy!")}},{key:"canPlay",value:function(e){var t=this.game.currentTrick.baseCard(),n=ie(this.hand.cards,t);return Object(d["includes"])(n,e)}},{key:"win",value:function(e){this.trickStack.add(e)}},{key:"points",value:function(){return this.trickStack.points()}}]),e}(),Qe=(n("ac6a"),n("8615"),n("8afe")),De=function e(){var t;Object(u["a"])(this,e),this.cards=Object(d["shuffle"])((t=[]).concat.apply(t,Object(Qe["a"])(Ye)))},Ye=Object(d["flatten"])(Object.values(I).map(function(e){return[new M(e,E.clubs,0),new M(e,E.spades,0),new M(e,E.hearts,0),new M(e,E.diamonds,0),new M(e,E.clubs,1),new M(e,E.spades,1),new M(e,E.hearts,1),new M(e,E.diamonds,1)]})),Ue=function(){function e(t){Object(u["a"])(this,e),this.players=t,this.scoreLines=[]}return Object(l["a"])(e,[{key:"addScore",value:function(e,t){var n={};this.players.forEach(function(r){n[r.name]=Object(d["includes"])(e,r)?t:-t}),this.scoreLines.push(n)}},{key:"scoreFor",value:function(e){return this.scoreLines.reduce(function(t,n){return t+=n[e.name],t},0)}}]),e}(),Ve=function(){function e(){Object(u["a"])(this,e),this.started=!1}return Object(l["a"])(e,[{key:"startGame",value:function(){var e=!0,t=!1;this.players=[new ze("Player 1",e,this),new ze("Player 2",t,this),new ze("Player 3",t,this),new ze("Player 4",t,this)],this.deck=new De,this.currentRound=new Ae(this.players,this),this.scorecard=new Ue(this.players),this.deal(),this.started=!0}},{key:"isStarted",value:function(){return this.started}},{key:"deal",value:function(){this.currentRound.players[0].hand=new Ke(this.deck.cards.slice(0,10)),this.currentRound.players[1].hand=new Ke(this.deck.cards.slice(10,20)),this.currentRound.players[2].hand=new Ke(this.deck.cards.slice(20,30)),this.currentRound.players[3].hand=new Ke(this.deck.cards.slice(30,40))}},{key:"addScore",value:function(e,t){this.scorecard.addScore(e,t)}},{key:"currentTrick",get:function(){return this.currentRound.currentTrick}}]),e}(),Xe={name:"app",props:{game:{type:Object,default:function(){return new Ve}}},components:{WelcomeScreen:k,Table:qe,Notifications:_}},Ze=Xe,et=(n("034f"),Object(v["a"])(Ze,s,a,!1,null,null,null));et.options.__file="App.vue";var tt=et.exports,nt=n("9483");Object(nt["a"])("".concat("/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},cached:function(){console.log("Content has been cached for offline use.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});var rt=n("3652"),it=n.n(rt),st=n("2955"),at=n.n(st);i["a"].config.productionTip=!1,new i["a"]({render:function(e){return e(tt)}}).$mount("#app"),it.a.config("https://69b3af20d4fa454f851a6be71502334c@sentry.io/1235644").addPlugin(at.a,i["a"]).install()},6281:function(e,t,n){"use strict";var r=n("d782"),i=n.n(r);i.a},7187:function(e,t,n){},7389:function(e,t,n){},"7cee":function(e,t,n){},8646:function(e,t,n){"use strict";var r=n("7389"),i=n.n(r);i.a},"914b":function(e,t,n){},9745:function(e,t,n){"use strict";var r=n("fe8a"),i=n.n(r);i.a},c21b:function(e,t,n){},d735:function(e,t,n){},d782:function(e,t,n){},dabb:function(e,t,n){},dc57:function(e,t,n){"use strict";var r=n("11da"),i=n.n(r);i.a},e2a5:function(e,t,n){},e2b0:function(e,t,n){"use strict";var r=n("e2a5"),i=n.n(r);i.a},e6dc:function(e,t,n){"use strict";var r=n("7cee"),i=n.n(r);i.a},fe8a:function(e,t,n){}});
//# sourceMappingURL=app.91afd8fa.js.map