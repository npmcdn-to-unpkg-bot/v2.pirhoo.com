(function(){angular.module("pirhoo",["ngAnimate","ngCookies","ngTouch","ngSanitize","ui.bootstrap","headroom","duScroll"])}).call(this),function(){angular.module("pirhoo").directive("projects",["$timeout",function(t){return{restrict:"EA",link:function(i,n){return t(function(){return imagesLoaded(n,function(){return Grade(document.querySelectorAll(".main__projects__cascading__item a")),$(n).isotope({itemSelector:".main__projects__cascading__item",stamp:$(n).find(".main__section__panel"),percentPosition:!0})})})}}}])}.call(this),function(){angular.module("pirhoo").directive("activity",["$http",function(){return{restrict:"E",replace:!0,template:'<svg class="main__activity__chart"></svg>',scope:{commits:"="},link:function(t,i){var n,e,a,o,r,s,c,l,m,u,d,p,h,f,g,v,y,b,w;return h=d3.select(i[0]),f=d3.tip().attr("class","d3-tip").html(function(t){return u[t.month.getMonth()]+" "+t.month.getFullYear()+": <strong>"+t.count+" commits</strong><br />on "+_.keys(t.repositories).length+" project(s)"}),h.call(f),g=c=0,l=o=null,e=25,n=-1,u=["January","February","March","April","May","June","July","August","September","October","November","December"],p=new Date(1e3*t.commits.older_commit.timestamp),d=new Date(1e3*t.commits.newer_commit.timestamp),w=function(){var t,i,n,e;for(e=[],y=t=i=p.getFullYear(),n=d.getFullYear();n>=i?n>=t:t>=n;y=n>=i?++t:--t)e.push(y);return e}(),v=d3.time.scale().domain([p,d]),b=function(t){return v(new Date(t+1,0,1))-v(new Date(t,0,1))},r={commits:_.sortBy(_.reduce(_.keys(t.commits.months_count),function(i,n){return i.push({month:new Date(n),count:t.commits.months_count[n].count,repositories:t.commits.months_count[n].repositories}),i},[]),"month")},a=_.max(r.commits,"count").count,m=function(){var t;return t=[(e+n)*r.commits.length,i.height()],g=t[0],c=t[1],h.style("width",g+"px"),v.range([0,g-e]),l=d3.scale.linear().domain([0,a]).range([0,c]),h=h.append("g").attr("class","main__activity__chart__commits"),s()},s=function(){var t;return t=h.append("defs").append("linearGradient").attr({id:"yeargradient",x1:0,x2:0,y1:0,y2:1}),t.append("stop").attr("offset","0%").attr("stop-color","white").attr("stop-opacity",0),t.append("stop").attr("offset","100%").attr("stop-color","white").attr("stop-opacity",.2),h.selectAll("g.year").data(w).enter().append("g").attr("class","year").append("rect").attr("x",function(t){return v(new Date(t,0,1))}).attr("y",0).attr("width",b).attr("height",c),h.selectAll("g.year").append("text").attr("class","year-label").text(function(t){return t}).attr("text-anchor","middle").attr("x",function(t){var i;return i=v(new Date(t,0,1))+b(t)/2,i=Math.min(g-25,i),i=Math.max(25,i)}).attr("y",20),h.selectAll("rect.bar").data(r.commits).enter().append("rect").attr("class","bar").attr("x",function(t){return v(t.month)}).attr("y",function(t){return c-l(t.count)}).attr("width",e).attr("height",function(t){return l(t.count)}).on("mouseover",f.show).on("mouseout",f.hide),h.selectAll("text.bar-label").data(r.commits).enter().append("text").attr("class","bar-label").attr("text-anchor","middle").attr("x",function(t){return v(t.month)+e/2}).attr("y",function(t){return c-l(t.count)+10}).text(function(t){return l(t.count)>=25?t.count:""})},m()}}}])}.call(this),function(){angular.module("pirhoo").controller("ActivityCtrl",["$scope",function(){}])}.call(this),angular.module("pirhoo").directive("screenHeight",["$window",function(t){return function(i,n,e){var a="resize.screenHeight",o=function(){isNaN(e.screenHeight)?n.css("min-height",t.innerHeight):n.css("min-height",Math.max(e.screenHeight,t.innerHeight))};o(),angular.element(t).bind(a,o),i.$on("$destroy",function(){angular.element(t).unbind(a)})}}]),function(){angular.module("pirhoo").controller("HeaderCtrl",["$scope",function(){}])}.call(this),function(){var t=function(t,i){return function(){return t.apply(i,arguments)}},i=[].indexOf||function(t){for(var i=0,n=this.length;n>i;i++)if(i in this&&this[i]===t)return i;return-1};angular.module("pirhoo").directive("main",["$timeout",function(n){return{restrict:"EAC",link:function(n,e){var a;return new(a=function(){function n(){this.raf=t(this.raf,this),this.useFrame=t(this.useFrame,this),this.bind=t(this.bind,this),this.ui=t(this.ui,this)}return n.prototype.ui=function(){return this.sections=e.find(".main__section:not(:last)")},n.prototype.bind=function(){return this.useFrame()?this.animationId=this.animationFrame.request(this.raf):$(window).on("scroll",this.raf)},n.prototype.useFrame=function(){return i.call(window,"ontouchstart")>=0},n.prototype.raf=function(){var t,i;return t=$(window).scrollTop(),i=$(window).height(),this.sections.each(function(){var n,e,a,o,r,s;return a=$(this),o=a.height(),r=a.offset().top,n=(t-.3*i-r)/o,n=Math.max(0,Math.min(1,n)),e=1-.5*n,s=i-i*e+"px",a.find(".wrapper").css({transform:"translateY("+s+") ",opacity:1-n})}),this.useFrame()?this.bind():void 0},n}())}}}])}.call(this),function(){angular.module("pirhoo").controller("MainCtrl",["$scope","$http","$q",function(t,i,n){return n.all({commits:i.get("assets/json/commits.json"),projects:i.get("assets/json/projects.json"),trainings:i.get("assets/json/trainings.json"),awards:i.get("assets/json/awards.json")}).then(function(i){return t.commits=i.commits.data,t.projects=i.projects.data,t.trainings=i.trainings.data,t.awards=i.awards.data})}])}.call(this),angular.module("pirhoo").run(["$templateCache",function(t){t.put("app/main/main.html",'<div ng-controller="MainCtrl" class="main"><div ng-include="\'app/main/introduction/introduction.html\'"></div><div ng-include="\'app/main/activity/activity.html\'"></div><div ng-include="\'app/main/projects/projects.html\'"></div></div>'),t.put("components/header/header.html",'<div headroom="headroom" class="header"><div du-scrollspy="introduction" class="header__section header__section--introduction"><a href="#introduction" du-smooth-scroll="du-smooth-scroll">Introduction</a></div><div du-scrollspy="activity" class="header__section header__section--activity"><a href="#activity" du-smooth-scroll="du-smooth-scroll">Activity</a></div><div du-scrollspy="projects" class="header__section header__section--projects"><a href="#projects" du-smooth-scroll="du-smooth-scroll">Projects</a></div></div>'),t.put("app/main/activity/activity.html",'<section id="activity" ng-controller="ActivityCtrl" class="main__section main__activity"><div screen-height="600" class="wrapper"><div aria-section="Activity" class="main__section__panel main__section__panel--reverse"><h2>I’ve been busy,<br><strong>let the data talk</strong></h2><p>My time is split between coding, investigating and teaching. I’m better with numbers so let the figures below speak for themselves.</p></div><div class="container-base main__activity__figures"><div class="main__activity__figures__item"><i class="fa fa-fw fa-code fa-2x main__activity__figures__item__icon"></i>I authored <strong>{{ commits.commits_count }}</strong>&nbsp; <abbr title="A submission of my latest changes of a source code">commits</abbr> over <strong>{{ commits.repositories_count }}</strong>&nbsp;projects</div><div class="main__activity__figures__item"><i class="fa fa-fw fa-graduation-cap fa-2x main__activity__figures__item__icon"></i>I gave ±<strong>{{ trainings.hours_count }}</strong>&nbsp;hours of training in <strong>{{ trainings.countries_count }}</strong>&nbsp;countries</div><div class="main__activity__figures__item"><i class="fa fa-fw fa-trophy fa-2x main__activity__figures__item__icon"></i><strong>{{ awards.awards_count }}</strong>&nbsp;prizes awarded for <strong>{{awards.projects_count }}</strong>&nbsp;projects I worked on</div></div><div class="main__activity__chart-wrapper"><activity commits="commits" ng-if="commits"></activity></div><h3 class="main__activity__chart-title"><abbr title="A submission of my latest changes of a source code">Commits</abbr> by month</h3></div></section>'),t.put("app/main/introduction/introduction.html",'<section id="introduction" class="main__section main__introduction"><div screen-height="600" class="wrapper"><div aria-section="Introduction" class="main__section__panel"><h2>Hi, I’m <strong>Pierre Romera</strong><br>developer &amp; data-journalist</h2><p>I’m CTO at <a href="http://jplusplus.org">Journalism++</a>, an agency that I co-founded after having been responsible of the web applications at <a href="http://owni.fr">OWNI</a>.</p><p>I’m also a Associate Professor at Sciences Po, where I teach computer science to journalists. I otherwise do many trainings for professional journalists, covering data-journalism, computer security and programming.</p></div><div class="main__introduction__social list"><a href="https://twitter.com/pirhoo" target="_blank" class="main__introduction__social__item"><i class="fa fa-fw fa-twitter main__introduction__social__item__icon"></i>Find me<br>on Twitter</a><a href="https://github.com/pirhoo" target="_blank" class="main__introduction__social__item"><i class="fa fa-fw fa-github main__introduction__social__item__icon"></i>Find me<br>on Github</a><a href="https://keybase.io/pirhoo" target="_blank" class="main__introduction__social__item"><i class="fa fa-fw fa-key main__introduction__social__item__icon"></i>Find me<br>on Keybase</a><a href="mailto:hello@pirhoo.com" target="_blank" class="main__introduction__social__item"><i class="fa fa-fw fa-envelope-o main__introduction__social__item__icon"></i>Send me<br>an email</a></div><a title="Discover more" href="#activity" du-smooth-scroll="du-smooth-scroll" class="main__introduction__discover"><span class="sr-only">Discover more</span><i class="fa fa-4x fa-angle-down"></i></a></div></section>'),t.put("app/main/projects/projects.html",'<section id="projects" ng-if="projects" class="main__section main__projects"><div screen-height="600" class="wrapper"><div projects="projects" class="main__projects__cascading"><div aria-section="Projects" class="main__section__panel"><h2>Here’s what I’ve <strong>done</strong></h2><p>According to my <a href="http://coderstats.net/github/pirhoo/" target="_blank">Github Stats</a> I mostly code in Javascript and Python. Both are my favorite languages. Almost all my projects are Open Source and available on <a href="https://github.com/pirhoo?tab=activity" target="_blank">Github</a>.</p></div><div ng-repeat="project in projects" class="main__projects__cascading__item"><a ng-href="{{ project.url }}" class="main__projects__cascading__item__wrapper"><img ng-src="{{ project.thumbnail }}" class="main__projects__cascading__item__wrapper__thumbnail"><div class="main__projects__cascading__item__wrapper__title">{{ project.title }}</div></a></div></div></div></section>')}]);