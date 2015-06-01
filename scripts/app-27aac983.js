(function(){angular.module("pirhoo",["ngAnimate","ngCookies","ngTouch","ngSanitize","ui.bootstrap","headroom","duScroll"])}).call(this),function(){angular.module("pirhoo").directive("projects",["$timeout",function(t){return{restrict:"EA",link:function(i,e){return t(function(){return imagesLoaded(e,function(){return new Isotope(e[0],{itemSelector:".main__projects__cascading__item",gutter:0,isHorizontal:!0})})})}}}])}.call(this),function(){angular.module("pirhoo").directive("activity",["$http",function(){return{restrict:"E",replace:!0,template:'<svg class="main__activity__chart"></svg>',scope:{commits:"="},link:function(t,i){var e,a,n,o,r,s,c,l,m,u,d,p,h,g,f,v,y,b,j;return h=d3.select(i[0]),g=d3.tip().attr("class","d3-tip").html(function(t){return u[t.month.getMonth()]+" "+t.month.getFullYear()+": <strong>"+t.count+" commits</strong><br />on "+_.keys(t.repositories).length+" project(s)"}),h.call(g),f=c=0,l=o=null,a=25,e=0,u=["January","February","March","April","May","June","July","August","September","October","November","December"],p=new Date(1e3*t.commits.older_commit.timestamp),d=new Date(1e3*t.commits.newer_commit.timestamp),j=function(){var t,i,e,a;for(a=[],y=t=i=p.getFullYear(),e=d.getFullYear();e>=i?e>=t:t>=e;y=e>=i?++t:--t)a.push(y);return a}(),v=d3.time.scale().domain([p,d]),b=function(t){return v(new Date(t+1,0,1))-v(new Date(t,0,1))},r={commits:_.sortBy(_.reduce(_.keys(t.commits.months_count),function(i,e){return i.push({month:new Date(e),count:t.commits.months_count[e].count,repositories:t.commits.months_count[e].repositories}),i},[]),"month")},n=_.max(r.commits,"count").count,m=function(){var t;return t=[(a+e)*r.commits.length,i.height()],f=t[0],c=t[1],h.style("width",f+"px"),v.range([0,f-a]),l=d3.scale.linear().domain([0,n]).range([0,c]),h=h.append("g").attr("class","main__activity__chart__commits"),s()},s=function(){var t;return t=h.append("defs").append("linearGradient").attr({id:"yeargradient",x1:0,x2:0,y1:0,y2:1}),t.append("stop").attr("offset","0%").attr("stop-color","white").attr("stop-opacity",0),t.append("stop").attr("offset","100%").attr("stop-color","white").attr("stop-opacity",.2),h.selectAll("g.year").data(j).enter().append("g").attr("class","year").append("rect").attr("x",function(t){return v(new Date(t,0,1))}).attr("y",0).attr("width",b).attr("height",c),h.selectAll("g.year").append("text").attr("class","year-label").text(function(t){return t}).attr("text-anchor","middle").attr("x",function(t){var i;return i=v(new Date(t,0,1))+b(t)/2,i=Math.min(f-25,i),i=Math.max(25,i)}).attr("y",20),h.selectAll("rect.bar").data(r.commits).enter().append("rect").attr("class","bar").attr("x",function(t){return v(t.month)}).attr("y",function(t){return c-l(t.count)}).attr("width",a).attr("height",function(t){return l(t.count)}).on("mouseover",g.show).on("mouseout",g.hide),h.selectAll("text.bar-label").data(r.commits).enter().append("text").attr("class","bar-label").attr("text-anchor","middle").attr("x",function(t){return v(t.month)+a/2}).attr("y",function(t){return c-l(t.count)+10}).text(function(t){return l(t.count)>=25?t.count:""})},m()}}}])}.call(this),function(){angular.module("pirhoo").controller("ActivityCtrl",["$scope",function(){}])}.call(this),angular.module("pirhoo").directive("screenHeight",["$window",function(t){return function(i,e,a){var n="resize.screenHeight",o=function(){isNaN(a.screenHeight)?e.css("min-height",t.innerHeight):e.css("min-height",Math.max(a.screenHeight,t.innerHeight))};o(),angular.element(t).bind(n,o),i.$on("$destroy",function(){angular.element(t).unbind(n)})}}]),function(){angular.module("pirhoo").controller("HeaderCtrl",["$scope",function(){}])}.call(this),function(){angular.module("pirhoo").controller("MainCtrl",["$scope","$http","$q",function(t,i,e){return e.all({commits:i.get("assets/json/commits.json"),projects:i.get("assets/json/projects.json"),trainings:i.get("assets/json/trainings.json"),awards:i.get("assets/json/awards.json")}).then(function(i){return t.commits=i.commits.data,t.projects=i.projects.data,t.trainings=i.trainings.data,t.awards=i.awards.data})}])}.call(this),angular.module("pirhoo").run(["$templateCache",function(t){t.put("app/main/main.html",'<div ng-controller="MainCtrl" class="main"><div ng-include="\'app/main/introduction/introduction.html\'"></div><div ng-include="\'app/main/activity/activity.html\'"></div><div ng-include="\'app/main/projects/projects.html\'"></div></div>'),t.put("components/header/header.html",'<div headroom="headroom" class="header"><div du-scrollspy="introduction" class="header__section header__section--introduction"><a href="#introduction" du-smooth-scroll="du-smooth-scroll">Introduction</a></div><div du-scrollspy="activity" class="header__section header__section--activity"><a href="#activity" du-smooth-scroll="du-smooth-scroll">Activity</a></div><div du-scrollspy="projects" class="header__section header__section--projects"><a href="#projects" du-smooth-scroll="du-smooth-scroll">Projects</a></div></div>'),t.put("app/main/activity/activity.html",'<section id="activity" screen-height="400" ng-controller="ActivityCtrl" class="main__section main__activity"><div aria-section="Activity" class="main__section__panel main__section__panel--reverse"><h2>I’ve been busy,<br><strong>let the data talk</strong></h2><p>My time is split between coding, investigating and teaching. I’m better with numbers so let the figures below speak for themselves.</p></div><div class="container-base main__activity__figures"><div class="main__activity__figures__item"><i class="fa fa-fw fa-code fa-2x main__activity__figures__item__icon"></i>I authored <strong>{{ commits.commits_count }}</strong>&nbsp; <abbr title="A submission of my latest changes of a source code">commits</abbr> over <strong>{{ commits.repositories_count }}</strong>&nbsp;projects</div><div class="main__activity__figures__item"><i class="fa fa-fw fa-graduation-cap fa-2x main__activity__figures__item__icon"></i>I gave ±<strong>{{ trainings.hours_count }}</strong>&nbsp;hours of training in <strong>{{ trainings.countries_count }}</strong>&nbsp;countries</div><div class="main__activity__figures__item"><i class="fa fa-fw fa-trophy fa-2x main__activity__figures__item__icon"></i><strong>{{ awards.awards_count }}</strong>&nbsp;prizes awarded for <strong>{{awards.projects_count }}</strong>&nbsp;projects I worked on</div></div><div class="main__activity__chart-wrapper"><activity commits="commits" ng-if="commits"></activity></div><h3 class="main__activity__chart-title"><abbr title="A submission of my latest changes of a source code">Commits</abbr> by month</h3></section>'),t.put("app/main/introduction/introduction.html",'<section id="introduction" screen-height="400" class="main__section main__introduction"><div aria-section="Introduction" class="main__section__panel"><h2>Hi, I’m <strong>Pierre Romera</strong><br>developer &amp; data-journalist</h2><p>I’m CTO at <a href="http://jplusplus.org">Journalism++</a>, an agency that I co-founded after having been responsible of the web applications at <a href="http://owni.fr">OWNI</a>.</p><p>I’m also a professor at Sciences Po, where I teach computer science to journalists. I otherwise do many trainings for professional journalists, covering data-journalism, computer security and programming.</p></div><div class="main__introduction__social list"><a href="https://twitter.com/pirhoo" target="_blank" class="main__introduction__social__item"><i class="fa fa-fw fa-twitter main__introduction__social__item__icon"></i>Find me<br>on Twitter</a><a href="https://github.com/pirhoo" target="_blank" class="main__introduction__social__item"><i class="fa fa-fw fa-github main__introduction__social__item__icon"></i>Find me<br>on Github</a><a href="https://keybase.io/pirhoo" target="_blank" class="main__introduction__social__item"><i class="fa fa-fw fa-key main__introduction__social__item__icon"></i>Find me<br>on Keybase</a></div></section>'),t.put("app/main/projects/projects.html",'<section id="projects" screen-height="400" ng-if="projects" class="main__section main__projects"><div aria-section="Projects" class="main__section__panel"><h2>Here’s what I’ve <strong>done</strong></h2><p>According to my <a href="http://coderstats.net/github/pirhoo/" target="_blank">Github Stats</a> I mostly code in Javascript and Python. Both are my favorite languages. Almost all my projects are Open Source and available on <a href="https://github.com/Pirhoo?tab=activity" target="_blank">Github</a>.</p></div><div projects="projects" class="main__projects__cascading"><div ng-repeat="project in projects" class="main__projects__cascading__item"><a ng-href="{{ project.url }}"><div ng-style="{ background: project.color }" class="main__projects__cascading__item__overlay"></div><img ng-src="{{ project.thumbnail }}" class="main__projects__cascading__item__thumbnail"><div class="main__projects__cascading__item__title">{{ project.title }}</div></a></div></div></section>')}]);