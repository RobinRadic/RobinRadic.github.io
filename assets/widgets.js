!function(a){a(jQuery)}(function(a){a.widget("radic.admin",{version:"0.0.1",$template:{},options:{owner:"RobinRadic",repo:"ghpages-radic-theme",branch:"gh-pages"},_create:function(){this.endpoints=radic.github.createEndpoints(this.options.owner,this.options.repo),this._initConfigEditor(),this._initPostsEditor()},_initConfigEditor:function(){var b=this;this.$configTab=this.element.find("#tab-config"),this.$configTab.spin(),this.$configFileList=this.$configTab.find("ul.editor-file-list"),this.$configFileSave=this.$configTab.find(".editor-save"),this.$configFileReload=this.$configTab.find(".editor-reload"),this.ceditor=ace.edit("config-editor"),this.ceditor.setTheme("ace/theme/solarized_light"),this.ceditor.getSession().setMode("ace/mode/yaml"),this.ceditor.getSession().setUseSoftTabs(!0),this.ceditor.getSession().setTabSize(2),this.openConfigFile("_config.yml"),radic.github.get(this.endpoints.contents+"_data",{data:{path:"_data",ref:b.options.branch}}).done(function(c){console.log(c),a.each(c,function(a,c){b.$configFileList.append('<li><a href="#" data-path="'+c.path+'">'+c.name+"</a></li>")}),b.$configFileList.find("a").on("click",function(c){c.preventDefault(),b.$configFileList.find("li").removeClass("active"),$el=a(this),$el.parent("li").addClass("active"),b.openConfigFile($el.data("path"))}),b.$configTab.spin(!1)}),this.$configFileReload.on("click",function(){b.openConfigFile(b.currentConfigFile.path)}),this.$configFileSave.on("click",function(){bootbox.prompt("Commit message",function(a){null!==a&&b._saveConfigFile(a)})})},openConfigFile:function(a){var b=this;this.$configTab.spin(),radic.github.get(this.endpoints.contents+a,{data:{path:a,ref:b.options.branch}}).done(function(a){b.$configTab.spin(!1),b.currentConfigFile=a;var c=atob(a.content);b.ceditor.setValue(c),b.ceditor.gotoLine(1,0,!0),b.ceditor.getSession().setScrollTop(1),b.ceditor.getSession().setScrollLeft(1)})},_saveConfigFile:function(a){var b=this;b.$configTab.spin();var c=b.currentConfigFile.path;radic.github.put(this.endpoints.contents+c,{data:JSON.stringify({path:c,message:a,branch:b.options.branch,sha:b.currentConfigFile.sha,content:btoa(b.ceditor.getValue())})}).done(function(){b.$configTab.spin(!1)})},_initPostsEditor:function(){var b=this;this.showdown=new Showdown.converter,this.$postsTab=this.element.find("#tab-posts"),this.$postPreview=this.$postsTab.find(".post-preview"),this.$postsFileList=this.$postsTab.find("ul.editor-file-list"),this.$postsFileSave=this.$postsTab.find(".editor-save"),this.$postsFileReload=this.$postsTab.find(".editor-reload"),this.$postsFileCreate=this.$postsTab.find(".editor-create"),this.$postsFilePreview=this.$postsTab.find(".editor-preview"),this.peditor=ace.edit("posts-editor"),this.peditor.setTheme("ace/theme/solarized_light"),this.peditor.getSession().setMode("ace/mode/markdown"),this.peditor.getSession().setUseSoftTabs(!0),this.peditor.getSession().setTabSize(2),this.$postPreview.hide(),radic.github.get(this.endpoints.contents+"_posts",{data:{path:"_posts",ref:b.options.branch}}).done(function(c){console.log(c),a.each(c,function(a,c){b.$postsFileList.append('<li><a href="#" data-path="'+c.path+'">'+c.name+"</a></li>")}),b.$postsFileList.find("a").on("click",function(c){c.preventDefault(),b.$postsFileList.find("li").removeClass("active"),$el=a(this),$el.parent("li").addClass("active"),b.openPostFile($el.data("path"))})}),this.$postsFileReload.on("click",function(){b.openPostFile(b.currentPostFile.path)}),this.$postsFileSave.on("click",function(){bootbox.prompt("Commit message",function(a){null!==a&&b._savePostFile(a)})}),this.$postsFilePreview.on("click",function(){b._previewPost()}),this.$postsFileCreate.on("click",function(){window.location.href="/admin/editor"})},openPostFile:function(a){var b=this;this.$postsTab.spin(),radic.github.get(this.endpoints.contents+a,{data:{path:a,ref:b.options.branch}}).done(function(a){b.$postsTab.spin(!1),b.currentPostFile=a;var c=atob(a.content);b.peditor.setValue(c),b.peditor.gotoLine(1,0,!0),b.peditor.getSession().setScrollTop(1),b.peditor.getSession().setScrollLeft(1)})},_savePostFile:function(a){var b=this;b.$postsTab.spin();var c=b.currentPostFile.path;radic.github.put(this.endpoints.contents+c,{data:JSON.stringify({path:c,message:a,branch:b.options.branch,sha:b.currentPostFile.sha,content:btoa(b.peditor.getValue())})}).done(function(){b.$postsTab.spin(!1)})},_previewPost:function(){var a=this,b=this.$postPreview,c=b.find(".preview-content"),d=b.find(".close-preview");d.on("click",function(){b.hide("slow"),d.off("click")});var e=/\{\%\s*highlight\s*(\w*)\s*\%\}\n([\n\w\W]*?)\{\%\s*endhighlight\s*\%\}/g,f=/---\n([\w\n:\s"\.',-\[\]]*)---/,g=a.peditor.getValue(),h=g.match(f);console.log(h);var i=this.showdown.makeHtml(g.replace(f,"").replace(e,'<pre><code class="language-$1">$2</code></pre>'));c.html(i),b.show("slow"),Prism.highlightAll()},_init:function(){},_getCreateEventData:function(){},_destroy:function(){this.element.html("")}})}),function(a){a(jQuery)}(function(a){a.widget("radic.faq",{version:"0.0.1",options:{username:"",template:{title:"Recent events"},baseUrl:"projects/blade-extensions",items:{},templateDataSelector:'script[data-template-id="faq"]'},_create:function(){var b=this;b._getData(function(c){console.log(c);var d=a(b.options.templateDataSelector).html(),e=jQuery.template(d);console.log("pre temp data",c),a.extend(c,b.options.template);var f=a(e({items:c}));b.element.html(f)})},_getData:function(b){var c=this,d=a.keys(c.data).length,e=0;c.data=c.options.items,a.each(c.data,function(f,g){console.log("async each",c.data,f,g),a.get(g.file,function(a){c.data[f].content=a,e++,e>=d&&b(c.data)})})},_init:function(){},_getCreateEventData:function(){},_destroy:function(){this.element.html("")},_setOptions:function(a){var b=a.value;delete a.value,this._super(a),this.options.value=this._constrainedValue(b),this._refreshValue()},_setOption:function(a,b){"max"===a&&(b=Math.max(this.min,b)),"disabled"===a&&this.element.toggleClass("ui-state-disabled",!!b).attr("aria-disabled",b),this._super(a,b)}})}),function(a){a(jQuery)}(function(a){a.widget("radic.github",a.radic.base,{version:"0.0.1",options:{dataSelectorPrefix:"github",user:{modal:!0,popover:!0},userModal:{}},_spin:function(a){if(this.options.spinner===!0){if("boolean"==typeof a&&a===!1)return this.element.spin(!1);this.element.spin(this.options.spinnerOptions)}},_getSelector:function(b){a("*[data-"+this.options.dataSelectorPrefix+"-"+b+"]")},refresh:function(){function b(a){return a.substring(0,f.length)===f}function c(a){return a.substring(0,input.length).replace(input,"").toLowerCase()}function d(d,f){var g=a(d).data(),h=e.options[f];return a.each(g,function(a,d){b(a)&&(h[c(a)]=d)}),h}var e=this,f=e.options.dataSelectorPrefix;this._getSelector("user").each(function(){var a=d(this,"user");a.popover&&this.userPopover(a.username,this)}),this._on(this.document,this._getSelector("user"),{click:function(a){var b=d(this,"user");1==b.modal&&(a.preventDefault(),e.showUserModal(b.username,b))}})},showUserModal:function(b,c){var d=this;c=a.extend(this.options.userModal,c);var e=radic.github.sync("/users/"+b),f=d._compile("user.modal",e).html().trim(),g=bootbox.dialog({title:e.name||e.login||"User information",message:f,className:"github-user-modal",onEscape:function(){bootbox.hideAll()},buttons:{close:{label:"Close",className:"btn-primary",callback:function(){bootbox.hideAll()}}}});g.on("shown.bs.modal",function(){console.info("bootbox on show git uuser modal"),a(this).find(".user-modal-events").githubEvents({username:e.login});a(this).find(".user-modal-profile").githubProfile({username:e.login,showProfile:!1,showLanguages:!0,repositoriesHeaderText:null,completed:function(){console.log("listen from options to profile completed")}})})},userPopover:function(b,c){return a(c).popover({html:!0,trigger:"manual",container:"body",placement:"auto left",viewport:{selector:".page-content",padding:5},content:function(){radic.github.async(!0);var a=radic.github.users(b);return self._compile("user.popover",a).html().trim()}}).hover(function(b){b.preventDefault(),a(this).popover("toggle")})},_create:function(){this.refresh()},_destroy:function(){this.element.html(""),self._trigger("destroyed",null)},_setOption:function(a,b){"disabled"===a&&this.element.toggleClass("ui-state-disabled",!!b).attr("aria-disabled",b),this._super(a,b)}})}),function(a){a(jQuery)}(function(a){a.widget("radic.githubEditor",{version:"0.0.1",options:{provider:"github",url:"http://0.0.0.0:4000/editor",owner:"RobinRadic",repo:"ghpages-radic-theme",branch:"gh-pages"},_create:function(){var a=this;this.api={},this.type=this.element.data("github-editor"),"edit"===this.type?this._initOAuth(function(){a._createEditor()}):"create"===this.type&&this._initOAuth(function(){a._createEditor()})},_initOAuth:function(b){var c=this,d=OAuth.popup(c.options.provider,{cache:!0});d.done(function(d){c.api=d,c.endpoints={content:"/repos/:owner/:repo/contents/"},a.each(c.endpoints,function(a,b){c.endpoints[a]=b.replace(":owner",c.options.owner).replace(":repo",c.options.repo)}),b()}),d.fail(function(a){console.error("github editor oauth callback error:",a)})},_createEditor:function(){var b=this;this.templateData={date:moment().format("ddd, D MMMM"),title:"My awsome post",description:"This post is about bull and shit",tags:["General"],image:"/images/abstract-1.jpg"},this.converter=new Showdown.converter,this.$form=this.element.find("form"),this.form={title:this.$form.find("#editor-form-title"),tags:this.$form.find("#editor-form-tags"),description:this.$form.find("#editor-form-description"),image:this.$form.find(".fileinput")},this.$preview=this.element.find("#editor-preview"),this.$editor=this.element.find("#editor-source"),this.$header=this.element.find("#editor-post-header"),this.$form.on("submit",function(a){return a.preventDefault(),b._save(),!1}),this.form.tags.tagsInput({width:"auto",onChange:function(){b.templateData.tags=b.form.tags.val().split(","),b._applyHeaderTemplate()}}),this.form.image.on("change.bs.fileinput",function(){var a=b.form.image.find("img").attr("src");b.form.image.find(".fileinput-preview").hide(),b.templateData.image=a,b._applyHeaderTemplate(),console.log("file is altered",a)}),this.form.title.on("change",function(){b.templateData.title=a(this).val(),b._applyHeaderTemplate()}),this.form.description.on("change",function(){b.templateData.description=a(this).val(),b._applyHeaderTemplate()}),this.$preview.hallo({plugins:{halloformat:{},halloheadings:{},hallolists:{},halloreundo:{}},toolbar:"halloToolbarFixed"}),this.$preview.bind("hallomodified",function(a,c){b._showSource(c.content)}),this.$editor.bind("keyup",function(){b._updateHtml(this.value)}),this._showSource(this.$preview.html()),this._applyHeaderTemplate()},_applyHeaderTemplate:function(){this.$header.html("");var b=a('script[data-template-id="post-header"]').html(),c=jQuery.template(b),d=a(c(this.templateData));this.$header.append(d)},_markdownize:function(b){var c=b.split("\n").map(a.trim).filter(function(a){return""!=a}).join("\n");return toMarkdown(c)},_showSource:function(a){var b=this._markdownize(a);this.$editor.get(0).value!=b&&(this.$editor.get(0).value=b)},_updateHtml:function(a){if(this._markdownize(this.$preview.html())!=a){var b=this.converter.makeHtml(a);this.$preview.html(b)}},_slugify:function(a){return a.toLowerCase().replace(/ /g,"-").replace(/[^\w-]+/g,"")},_base64_encode:function(a){var b,c,d,e,f,g,h,i,j="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",k=0,l=0,m="",n=[];if(!a)return a;do b=a.charCodeAt(k++),c=a.charCodeAt(k++),d=a.charCodeAt(k++),i=b<<16|c<<8|d,e=i>>18&63,f=i>>12&63,g=i>>6&63,h=63&i,n[l++]=j.charAt(e)+j.charAt(f)+j.charAt(g)+j.charAt(h);while(k<a.length);m=n.join("");var o=a.length%3;return(o?m.slice(0,o-3):m)+"===".slice(o||3)},_save:function(){var a=this,b="---\ntitle: "+this.form.title.val()+"\nlayout: post\ndescription: "+this.form.description.val()+"\ntags: ["+this.form.tags.val()+"]\nimage: '"+this.templateData.image+"'\ncomments: true\n---\n"+this.$editor.val(),c=(new Date,moment().format("YYYY-MM-DD")+"-"+this._slugify(this.form.title.val())+".md");console.log(c,b),this.api.put(this.endpoints.content+"_posts/"+c,{data:JSON.stringify({path:"_posts/"+c,message:"Creating a new post",branch:a.options.branch,content:a._base64_encode(b)})})},_init:function(){},_getCreateEventData:function(){},_destroy:function(){this.element.html("")},_setOptions:function(a){var b=a.value;delete a.value,this._super(a),this.options.value=this._constrainedValue(b),this._refreshValue()},_setOption:function(a,b){"max"===a&&(b=Math.max(this.min,b)),"disabled"===a&&this.element.toggleClass("ui-state-disabled",!!b).attr("aria-disabled",b),this._super(a,b)}})}),function(a){a(jQuery)}(function(a){a.widget("radic.githubEvents",a.radic.base,{version:"0.0.1",options:{username:"",useSpinner:!0,max:60,template:{title:"Recent events"},selectors:{template:'script[data-template-id="github-events"]',modalContainer:"#github-events-modal",modalTemplate:'script[data-template-id="github-events-modal"]',user:"*[data-github-user]"},output:{template:{title:"Recent events",height:300},events:{"default":{icon:"fa fa-info",text:"A github event has been triggered",iconColor:"default",link:!1},CommitCommentEvent:{icon:"fa fa-edit",text:"New comment on a commit"},CreateEvent:{icon:"fa fa-plus",iconColor:"success",text:function(a){var b=radic.github.theme.actor(a.actor);return"tag"===a.payload.ref_type&&(b+=radic.github.theme.tag(a.payload)),b+=radic.github.theme.repo(a.repo),b.replace("\n","")}},DeleteEvent:{icon:"fa fa-trash",iconColor:"default",text:"A branch or tag has been deleted"},DeploymentEvent:{icon:"fa fa-",iconColor:"default",text:""},DeploymentStatusEvent:{icon:"fa fa-",iconColor:"default",text:""},DownloadEvent:{icon:"fa fa-cloud-download",iconColor:"default",text:"A new download has been created"},FollowEvent:{icon:"fa fa-bullhorn",iconColor:"default",text:"A user started following me"},ForkEvent:{icon:"fa fa-code-fork",iconColor:"default",text:"A repository was forked"},ForkApplyEvent:{icon:"fa fa-code-fork",iconColor:"default",text:""},GistEvent:{icon:"fa fa-git",iconColor:"default",text:"A gist has been created or updated"},GollumEvent:{icon:"fa fa-git",iconColor:"default",text:"A wiki page has been created or updated"},IssueCommentEvent:{icon:"fa fa-comment-o",iconColor:"info",text:"An issue received a new comment"},IssuesEvent:{icon:"fa fa-exclamation-triangle",iconColor:"warning",text:function(a){var b=a.payload.action;return b="started"===b?"starred":b,radic.github.theme.actor(a.actor)+" "+b+" "+radic.github.theme.issue(a.payload.issue)}},MemberEvent:{icon:"fa fa-sitemap",iconColor:"default",text:"A user is added as collaborator to a repository"},PageBuildEvent:{icon:"fa fa-file-o",iconColor:"default",text:""},PublicEvent:{icon:"fa fa-users",iconColor:"default",text:""},PullRequestEvent:{icon:"fa fa-sort-desc",iconColor:"default",text:""},PullRequestReviewCommentEvent:{icon:"fa fa-random",iconColor:"default",text:""},PushEvent:{icon:"fa fa-save",text:function(b){return a(document.createElement("span")).append(radic.github.theme.actor(b.actor)).append(radic.github.theme.branch(b)).append(radic.github.theme.commits(b)).append(" to ").append(radic.github.theme.repo(b.repo)).html()},iconColor:"success"},ReleaseEvent:{icon:"fa fa-chain-broken",text:"A new release has been published",iconColor:"default"},StatusEvent:{icon:"fa fa-info",text:"The status of a Git commit has changed",iconColor:"default"},TeamAddEvent:{icon:"fa fa-plus",text:"A user has been added to the team",iconColor:"default"},WatchEvent:{icon:"fa fa-star",text:function(a){var b=a.payload.action;return b="started"===b?"starred":b,radic.github.theme.actor(a.actor)+" "+b+" "+radic.github.theme.repo(a.repo)},iconColor:"warning"}}}},_create:function(){var b=this;b.__cache={users:{},repos:{},events:{}},this.$widget=null,this.options.useSpinner===!0&&this.element.spin(),b.__events={},a.each(this.options.output.events,function(a,c){"default"!==a&&(b.__events[a]=_.merge(_.cloneDeep(b.options.output.events.default),c))}),b._fetchEventData(function(c){b.options.useSpinner===!0&&b.element.spin(!1);var d=a(b.options.selectors.template).html(),e=jQuery.template(d);a.extend(c,b.options.output.template);var f=e(c);b.element.append(f),b._bindAll()})},_bindAll:function(){{var b=this;this.options.selectors}this.element.find("*[data-github-user]").popover({html:!0,trigger:"manual",container:"body",placement:"left",content:function(){return b._popoverUser(a(this).data("github-user"))}}).hover(function(b){b.preventDefault(),a(this).popover("toggle")}),this.element.find("*[data-github-commits]").each(function(){var c=a(this).data("github-commits");a(this).popover({html:!0,trigger:"manual",container:"body",placement:"right",content:function(){return b._getTemplate("github-events-commits",{event:b.__cache.events[c].raw})}}).hover(function(b){b.preventDefault(),a(this).popover("toggle")})}),this.element.find("*[data-github-issue]").tooltip({container:"body"})},_fetchEventData:function(a){var b=this;radic.github.users.events(this.options.username,0,this.options.max,function(c){for(var d=[],e=0;e<c.length;e++){var f=b._getProcessedEvent(c[e]);d.push(f),b.__cache.events[c[e].id]=f}a({events:d})})},_getProcessedEvent:function(a){var b=this,c=_.cloneDeep(b.__events[a.type]);return _.isFunction(c.text)&&(c.text=c.text.apply(this,[a])),c.id=a.id,c.raw=a,c.timeAgo=moment(a.created_at).fromNow(!0),c},_popoverUser:function(a){var b=this;_.isUndefined(b.__cache.users[a])&&(b.__cache.users[a]=JSON.parse(radic.github.syncRequest("/users/"+a)));var c=b.__cache.users[a];return b._getTemplate("github-events-user-popover",{user:c})},_getTemplate:function(b,c){var d=a('script[data-template-id="'+b+'"]').html(),e=jQuery.template(d),f={isset:function(a){return _.isUndefined(a)?!1:_.isString(a)?a.length>0:!0}};return e(a.extend(f,c))},_createModal:function(){},_showModal:function(a){switch(a){case"user":break;case"repository":break;case"push":radic.github.repos.commitsSha("RobinRadic","swiftapi","4853e862828bc697e2db839d7ad91fafb0844c1c",function(){})}},_init:function(){},_getCreateEventData:function(){},_destroy:function(){this.element.html("")},_setOptions:function(a){var b=a.value;delete a.value,this._super(a),this.options.value=this._constrainedValue(b),this._refreshValue()},_setOption:function(a,b){"max"===a&&(b=Math.max(this.min,b)),"disabled"===a&&this.element.toggleClass("ui-state-disabled",!!b).attr("aria-disabled",b),this._super(a,b)}})}),function(a){a(jQuery)}(function(a){a.widget("radic.githubProfile",a.radic.base,{version:"0.0.1",options:{username:null,showProfile:!0,showFollow:!0,showLanguages:!0,showRepositories:!0,template:"widget.github.profile",className:"gh-profile-widget",spinner:!0,spinnerOptions:{},sortBy:"stars",repositoriesHeaderText:"Most starred repositories",repositoriesDateFormat:"lll",repositoriesLimit:5,languagesHeaderText:"Top languages",languagesLimit:7},_spin:function(a){if(this.options.spinner===!0){if("boolean"==typeof a&&a===!1)return this.element.spin(!1);this.element.spin(this.options.spinnerOptions)}},refresh:function(){var a=this;a._spin(),a._getData(function(b){a._spin(!1);var c=a._compile(a.options.template,b);a.element.html(c),a._trigger("completed",null)})},_create:function(){return null!==this.options.username&&_.isString(this.options.username)?void this.refresh():void console.error("githubProfile widget has been initialized without the required username option")},_sortLanguages:function(a){this._trigger("beforeSortLanguages",null,a);var b=[];for(var c in a)b.push([c,a[c]]);return b.sort(function(a,b){return b[1]-a[1]}),this._trigger("afterSortLanguages",null,b),b.slice(0,this.options.languagesLimit)},_sortRepositories:function(a){this._trigger("beforeSortRepositories",null,a);var b=this;return a.sort(function(a,c){return"stars"==b.options.sortBy?c.stargazers_count-a.stargazers_count:new Date(c.updated_at).getTime()-new Date(a.updated_at).getTime()}),this._trigger("afterSortRepositories",null,a),a.slice(0,b.options.repositoriesLimit)},_getData:function(b){var c=this,d=this.options.username;radic.async.waterfall([function(a){var b=radic.github.users(d,function(b,d){c._trigger("onReceivedUser",null,b),console.info("even more data",b,radic.defined(d)?d:"no second"),a(null,b)});console.log("u2",b)},function(a,b){radic.github.users.repos(d,null,1,100,function(d){c._trigger("onReceivedRepositories",null,d),b(null,{user:a,repos:d})})},function(b,e){b.languages={},radic.async.each(b.repos,function(e,f){e.updated_at_formatted=moment(e.updated_at).format(c.options.repositoriesDateFormat);var g=function(c){a.each(c,function(a,c){"undefined"==typeof b.languages[a]?b.languages[a]=c:b.languages[a]+=c})},h=radic.storage.get("github-profile-widget-languages",{json:!0});h?(b.languages=h.languages,f()):radic.github.repos.languages(d,e.name,function(a){g(a),radic.storage.set("github-profile-widget-languages",{languages:b.languages},{expires:60,json:!0}),f()})},function(){e(null,b)})},function(a,b){a.topRepos=c._sortRepositories(a.repos),b(null,a)},function(a,d){a.topLanguages=c._sortLanguages(a.languages),b(a),d(null)}])},_destroy:function(){this.element.html(""),self._trigger("destroyed",null)},_setOption:function(a,b){"disabled"===a&&this.element.toggleClass("ui-state-disabled",!!b).attr("aria-disabled",b),this._super(a,b)}})}),function(a){a(jQuery)}(function(a){a.widget("radic.highlightCollapse",{version:"0.0.1",options:{speed:1e3,height:80,select:function(b){var c=b.element.prev("p");return c.filter(function(){var b=a(this);return console.log(b),b.has("strong")&&1==b[0].childNodes.length?!0:void 0})}},_create:function(){var b=this;this._each(function(c,d){console.log(this,b),c.on("click",function(c){c.preventDefault(),$this=a(this),$this.attr("data-highcolap-expanded")?b._colapAll():(b._colapAll(),$this.attr("data-highcolap-expanded","1"),Metronic.destroySlimScroll(d),$this.find("i").removeClass("fa-caret-square-o-down").addClass("fa-caret-square-o-up"),d.unbind("touchstart"),d.unbind("touchmove"),d.unbind("mouseenter mouseleave"))}),c.addClass("highcolap");var e=a(document.createElement("i"));e.addClass("fa fa-caret-square-o-down pull-right"),c.prepend(e),d.attr("data-height",b.options.height),Metronic.initSlimScroll(d)})},_colapAll:function(){console.log("colapall"),a(".highcolap").find("i.fa-caret-square-o-up").each(function(){a(this).removeClass("fa-caret-square-o-up").addClass("fa-caret-square-o-down")}),Metronic.initSlimScroll(a(".highcolap").removeAttr("data-highcolap-expanded").next(".highlight"))},_each:function(b){this.options.select(this).each(function(){var c=a(this),d=c.next(".highlight");b(c,d)})},_init:function(){},_destroy:function(){this.options.select(this).off("click")},_setOptions:function(a){var b=a.value;delete a.value,this._super(a),this.options.value=this._constrainedValue(b),this._refreshValue()},_setOption:function(a,b){"max"===a&&(b=Math.max(this.min,b)),"disabled"===a&&this.element.toggleClass("ui-state-disabled",!!b).attr("aria-disabled",b),this._super(a,b)}})}),function(a){a(jQuery)}(function(a){a.widget("radic.pageTopUser",{version:"0.0.1",$template:{},options:{username:"",templateDataSelector:'script[data-template-id="page-top-user"]'},_create:function(){this.refresh()},refresh:function(){var a=this;a._getData(function(b){a._createHTML(b)})},_createHTML:function(b){var c=this;c.element.html("");var d=a(c.options.templateDataSelector).html(),e=jQuery.template(d);c.$template=a(e(b)),c._bindEvents(),c.element.append(c.$template),Metronic.initAjax()},_getData:function(b){var c=this.options.username,d={};a.async.waterfall([function(a){var b=radic.github.users(c,function(c){console.log("fetched data ",c,"u=",b),d.user=c,a(null,d)});console.log("fetched data 2 u=",b)},function(a,b){a.loggedin=radic.github.loggedin(),b(null,a)}],function(a,c){b(c)})},_bindEvents:function(){var b=this;this.$oauth=this.$template.find(".github-oauth"),this.$oauth.on("click",function(a){a.preventDefault(),radic.github.loggedin()?radic.github.logout():radic.github.login(function(){b.refresh()}),b.refresh()}),this.element.find('[data-action="clear-local-storage"]').on("click",function(b){b.preventDefault(),a.storage.clear()})},_init:function(){},_getCreateEventData:function(){},_destroy:function(){this.element.html("")}})}),function(a){a(jQuery)}(function(a){a.widget("radic.postsFilter",{version:"0.0.1",options:{tableSelector:".posts-by-tag-table",tagSelector:".posts-by-tag-picker",categorySelector:".posts-by-category-picker",viewAllSelector:".post-view-all"},_create:function(){this.refresh()},refresh:function(){this._refresh()},_refresh:function(){this.$table=this.element.find(this.options.tableSelector),this.$tagPickers=this.element.find(this.options.tagSelector),this.$categoryPickers=this.element.find(this.options.categorySelector),this.$viewAllButton=this.element.find(this.options.viewAllSelector),this.$rows=this.$table.find("tbody tr"),this._bindObjects()},_bindObjects:function(){var b=this;this.$categoryPickers.on("click",function(c){b._onPickerClick(c,a(this),"category")}),this.$tagPickers.on("click",function(c){b._onPickerClick(c,a(this),"tags")}),this.$viewAllButton.on("click",function(a){a.preventDefault(),b.$rows.show(),b.$table.show()})},_onPickerClick:function(b,c,d){var e=this;b.preventDefault(),e.$table.hide(),e.$rows.hide();var f=c.data(d);console.log(d,f),e.$rows.each(function(b,c){var g=a(c),h=g.data(d).split(",");a.isArray(h)===!1&&(h=[h]);for(var i=0;i<h.length;i++)h[i]=h[i].toLowerCase();console.log(b,h,f),-1!==h.indexOf(f.toLowerCase())&&(console.log(b,"has",f,h,c),g.show(),e.$table.show())})},_sortBy:function(){},_init:function(){this.$table.hide(),this.$rows.hide()},_getCreateEventData:function(){},_destroy:function(){this.$table.show(),this.$rows.show(),this.$tagPickers.off("click"),this.$categoryPickers.off("click"),this.$viewAllButton.off("click")},_setOptions:function(a){var b=a.value;delete a.value,this._super(a),this.options.value=this._constrainedValue(b),this._refreshValue()},_setOption:function(a,b){"max"===a&&(b=Math.max(this.min,b)),"disabled"===a&&this.element.toggleClass("ui-state-disabled",!!b).attr("aria-disabled",b),this._super(a,b)}})}),function(a){a(jQuery)}(function(a){a.widget("radic.postSearch",{version:"0.0.1",options:{initialSearchString:!1,baseurl:"/",resultTableSelector:"#posts-search-result",templateDataSelector:'script[data-template-id="posts-search"]',limit:10},_create:function(){this.posts=[],this.$input=this.element.find('input[name="query"]'),this.$container=a(document.createElement("div")).addClass("page-content page-content-search"),a(".page-content-wrapper").prepend(this.$container),this._bindAll()},_bindAll:function(){var b=this;b.element.off("submit").on("submit",function(a){return a.preventDefault(),b.search(b.$input.val()),b.$input.blur(),!1}),a("a[data-tag]").off("click").on("click",function(c){c.preventDefault(),b.search(a(this).data("tag"),"tags")})},_showResultTable:function(b){var c=this;c.$container.html(""),c.$container.hide();var d={results:b,converter:new Showdown.converter},e=a(this.options.templateDataSelector).html(),f=a(a.template(e)(d));f.find(".portlet-title .actions a").on("click",function(){c.$container.hide("slow",function(){c.$container.html("")})}),c.$container.append(f),c._bindAll(),c.$container.show("slow"),a("html, body").animate({scrollTop:0},500)},_getData:function(b){{var c=this;this.options.search}a.get(this.options.baseurl+"/search.json",function(a){c.posts=a,console.log(a),b()})},search:function(b,c){var d=this,e={};if(d.element.spin(),!(d.posts.length>0))return void this._getData(function(){d.search(b,c)});var f=a.cloneDeep(d.posts);"undefined"==typeof c&&(c=!1),a.each(f,function(d,f){f!==!1&&(f.content=f.content.replace(/<(?:.|\n)*?>/gm,""),c&&"tags"==c?_.contains(f.tags,b)!==!1&&(_.isUndefined(e[f.id])?(e[f.id]=f,e[f.id].rating=1):e[f.id].rating++):a.each(f,function(a,c){_.isArray(c)&&(c=c.join(" ")),"string"==typeof c&&c.indexOf(b)>-1&&("undefined"==typeof e[f.id]&&(e[f.id]=f),"undefined"==typeof e[f.id].rating?e[f.id].rating=1:e[f.id].rating++)}))});var g=[];a.each(e,function(a,b){g.push(b)}),g.sort(function(a,b){return a.rating<b.rating?1:a.rating>b.rating?-1:0}),d._showResultTable(g.slice(0,d.options.limit)),d.element.spin(!1)},_init:function(){},_getCreateEventData:function(){},_destroy:function(){this.element.html(""),a("a[data-tag]").off("click")},_setOptions:function(a){var b=a.value;delete a.value,this._super(a),this.options.value=this._constrainedValue(b),this._refreshValue()},_setOption:function(a,b){"max"===a&&(b=Math.max(this.min,b)),"disabled"===a&&this.element.toggleClass("ui-state-disabled",!!b).attr("aria-disabled",b),this._super(a,b)}})});