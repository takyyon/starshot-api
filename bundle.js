const e=Symbol('singleComment'),n=Symbol('multiComment'),t=()=>'',i=(e,n,t)=>e.slice(n,t).replace(/\S/g,' '),o=(e,n)=>{let t=n-1,i=0;for(;'\\'===e[t];)t-=1,i+=1;return Boolean(i%2)};function a(a,{whitespace:c=!0}={}){if('string'!=typeof a)throw new TypeError(`Expected argument \`jsonString\` to be a \`string\`, got \`${typeof a}\``);const r=c?i:t;let s=!1,u=!1,l=0,p='';for(let t=0;t<a.length;t++){const i=a[t],c=a[t+1];if(!u&&'"'===i){o(a,t)||(s=!s)}if(!s)if(u||i+c!=='//'){if(u===e&&i+c==='\r\n'){t++,u=!1,p+=r(a,l,t),l=t;continue}if(u===e&&'\n'===i)u=!1,p+=r(a,l,t),l=t;else{if(!u&&i+c==='/*'){p+=a.slice(l,t),l=t,u=n,t++;continue}if(u===n&&i+c==='*/'){t++,u=!1,p+=r(a,l,t+1),l=t+1;continue}}}else p+=a.slice(l,t),l=t,u=e,t++}return p+(u?r(a.slice(l)):a.slice(l))}var c=Object.freeze({__proto__:null,default:[{id:'nodejs',name:'Node.js',outputLocation:'api',configFiles:['package.json']},{id:'dotnet',name:'.NET',outputLocation:'api',configFiles:['*.csproj','*.fsproj','global.json']},{id:'python',name:'Python',outputLocation:'api',variant:['django'],configFiles:['requirements.txt','pyproject.toml','runtime.txt','setup.py']},{id:'django',name:'Django',outputLocation:'api',configFiles:['manage.py','wsgi.py','app.py']},{id:'static',name:'Static',outputLocation:'./',configFiles:['index.html','Index.html','default.htm','default.html','index.htm']},{id:'angular',name:'Angular',variant:['angular-universal','scully','ionic-angular'],package:{dependencies:['@angular/core']},outputLocation:'{angular.json#values(projects)[0].architect.build.options.outputPath}',configFiles:['angular.json']},{id:'angular-universal',name:'Angular Universal',package:{dependencies:['@angular/platform-server']},outputLocation:'{angular.json#values(projects)[0].architect.build.options.outputPath}',configFiles:['angular.json','tsconfig.server.json']},{id:'ionic-angular',name:'Ionic for Angular',package:{dependencies:['@ionic/angular']},outputLocation:'{angular.json#values(projects)[0].architect.build.options.outputPath}',configFiles:['ionic.config.json','angular.json']},{id:'scully',name:'Scully',package:{dependencies:['@scullyio/scully','@scullyio/init']},outputLocation:'{angular.json#values(projects)[0].architect.build.options.outputPath}',configFiles:['angular.json','scully.*.config.ts']},{id:'react',name:'React',variant:['preact','nextjs','gatsby','ionic-react'],package:{dependencies:['react','react-dom']},outputLocation:'build'},{id:'preact',name:'Preact',package:{dependencies:['preact']},outputLocation:'build'},{id:'nextjs',name:'Next.js',package:{dependencies:['next']},outputLocation:'out'},{id:'gatsby',name:'Gatsby',package:{dependencies:['gatsby']},outputLocation:'public',configFiles:['gatsby-config.js']},{id:'ionic-react',name:'Ionic for React',package:{dependencies:['@ionic/react']},outputLocation:'build'},{id:'vue',name:'Vue.js',variant:['nuxtjs','vuepress'],package:{dependencies:['vue']},outputLocation:'dist',configFiles:['vue.config.js']},{id:'nuxtjs',name:'Nuxt.js',package:{dependencies:['nuxt']},outputLocation:'dist',configFiles:['nuxt.config.js']},{id:'vuepress',name:'VuePress',package:{dependencies:['vuepress']},outputLocation:'dist'},{id:'aurelia',name:'Aurelia',package:{dependencies:['aurelia-bootstrapper']},outputLocation:'dist'},{id:'elm',name:'Elm',package:{dependencies:['elm','elm-lang']},outputLocation:'public',configFiles:['elm.json']},{id:'ember',name:'Ember.js',package:{entryKey:'ember',dependencies:['ember-cli']},outputLocation:'dist',configFiles:['ember-cli-build.js','.ember-cli']},{id:'flutter',name:'Flutter',package:{dependencies:['flutter','flutter_test']},outputLocation:'build/web',configFiles:['pubspec.yaml']},{id:'glimmer',name:'Glimmer.js',package:{dependencies:['@glimmer/core']},outputLocation:'dist'},{id:'hugo',name:'Hugo',package:{dependencies:['hugo-cli']},outputLocation:'public',configFiles:['archetypes','config.toml']},{id:'knockoutjs',name:'Knockout.js',package:{dependencies:['knockout']},outputLocation:'dist'},{id:'lit',name:'Lit',package:{dependencies:['lit-element']},outputLocation:'dist',configFiles:['custom-elements.json']},{id:'marko',name:'Marko.js',package:{dependencies:['marko']},outputLocation:'public'},{id:'meteor',name:'Meteor',package:{entryKey:'meteor',dependencies:['meteor-node-stubs']},outputLocation:'bundle'},{id:'mithril',name:'Mithril.js',package:{dependencies:['mithril']},outputLocation:'dist'},{id:'polymer',name:'Polymer',package:{dependencies:['@polymer/polymer']},outputLocation:'build/default',configFiles:['polymer.json']},{id:'riot',name:'RiotJS',package:{dependencies:['riot']},outputLocation:'dist'},{id:'stencil',name:'Stencil.js',package:{dependencies:['@stencil/core']},outputLocation:'www',configFiles:['stencil.config.ts']},{id:'svelte',name:'Svelte',package:{dependencies:['svelte']},outputLocation:'public'},{id:'typescript',name:'TypeScript',package:{dependencies:['typescript']},outputLocation:'{tsconfig.json#compilerOptions.outDir}',configFiles:['tsconfig.json']}]});const{search:r}=require('jmespath');async function s(e){return await async function(e){var n;const t=l(e),[i,o='main']=e.split('#');let[a,c]=await p(t);404===a.status&&([a,c]=await p(t.replace(`/${o}`,'/master')));if(c&&(c.$$repo={url:i,branch:o},null===(n=c.tree)||void 0===n?void 0:n.length)){const e=c.tree.map((e=>(e.isDirectory=()=>e.url.includes('tree'),e.name=e.path,e.path)));return f(c),e}return[]}(e)}function u(e){if(e.startsWith('http')){const n=d();if(n){const t=n.tree.find((n=>n.url===e));if(t){const{url:e,branch:i}=n.$$repo;return`${e}/blob/${i}/${t.path}`}}}return e}function l(e,n='main'){var t,i;const[o,a='main']=e.split('#');let c=o;if(e.startsWith('https://github.com'))c=e.replace('https://github.com','https://api.github.com/repos')+`/git/trees/${a||n}`;else{const n=d(),o=null===(i=null===(t=null==n?void 0:n.tree)||void 0===t?void 0:t.find((n=>n.path===e)))||void 0===i?void 0:i.url;c=null!=o?o:e}return c}async function p(e,n=!0){if(!1===e.startsWith('https://api.github.com'))throw new Error(`Invalid GitHub URL: ${e||'null'}`);const t={headers:{Accept:'application/vnd.github.v3+json',Authorization:'Basic '+window.btoa('manekinekko:GITHUB_TOKEN')}};n&&(e=`${e}?recursive=${n}`);const i=await fetch(e,t);return[i,await i.json()]}function d(){return window.__GITHUB_PROJECT__}function f(e){window.__GITHUB_PROJECT__=e}const g={readdir:async(e,n)=>[],async readFileSync(e){var n,t,i;if(e.includes('/git/trees/'))return null;const o=d(),a=null===(n=null==o?void 0:o.tree)||void 0===n?void 0:n.find((n=>n.url.endsWith(e)));if(null===(t=null==a?void 0:a.$$blob)||void 0===t?void 0:t.$$content)return null===(i=a.$$blob)||void 0===i?void 0:i.$$content;const[c,r]=await p(e);return(null==r?void 0:r.content)?(r.content=r.content.replace(/\n/g,'\r\n'),r.$$content=window.atob(r.content),function(e){var n;const t=d();null===(n=null==t?void 0:t.tree)||void 0===n||n.filter((n=>n.url===e.url)).map((n=>(n.$$blob=e,n))),f(t)}(r),r.$$content):null},existsSync(e){var n;const t=d();return null===(n=null==t?void 0:t.tree)||void 0===n?void 0:n.some((n=>n.path.endsWith(e)||n.url.endsWith(e)))}},m={join(...e){var n,t,i;const o=null!==(n=e.pop())&&void 0!==n?n:'',a=d(),c=null===(t=null==a?void 0:a.tree)||void 0===t?void 0:t.find((e=>e.path.endsWith(o)));return null!==(i=null==c?void 0:c.url)&&void 0!==i?i:o},resolve:(...e)=>e.join('/'),basename:e=>e.split('/').pop(),dirname:e=>e.split('/').slice(0,-1).join('/')};async function h(e){return v(e=l(e))?g.readFileSync(e):null}function v(e){try{return g.existsSync(e)}catch(e){return!1}}function y(e){if(null===e)return!1;e=a(e);try{return JSON.parse(e),!0}catch{return!1}}function j(e){return e=a(e),JSON.parse(e)}async function b(e,n=[],t=!1,i=[]){var o;let a=[];const r=['nodejs','typescript'];0===n.length&&(n=c),0===i.length&&(i=await s(e));v(l('package.json'))||console.warn('No package.json file found at the root of the project.');for(const c of n)for(const s of i){const u=await k(c,e,s);u&&(a=F(await x(e,c,s),a));const l=await w(c,e,s);l&&(a=F(await x(e,c,s),a));const p=await L(c,e,s);if(p&&(a=F(await x(e,c,s),a)),(u||l||p)&&(null===(o=c.variant)||void 0===o?void 0:o.length)){r.push(c.id);for(const o of c.variant){const r=n.find((e=>e.id===o));if(r){const n=await b(e,[r],t,i);a=F(await x(e,c,s),[...a,...n])}}}}return 1===a.length?a:a.length>1?t?a:a.filter((e=>!1===r.includes(e.framework.id))):[]}async function k(e,n,t){var i,o;var a;if(!((a=t).endsWith('package.json')&&v(a)))return null;const c=await h(t);if(!1===y(c))return console.warn(`[${e.name}] Could not parse JSON file: ${t}`),null;const r=j(c||'{}'),s=r.dependencies||{},u=r.devDependencies||{},l=[...Object.keys(s),...Object.keys(u)],p=r[null===(i=e.package)||void 0===i?void 0:i.entryKey];if(0===l.length)return'nodejs'===e.id?x(n,e,t):null;if(p)return x(n,e,t);if(l.length){const i=null===(o=e.package)||void 0===o?void 0:o.dependencies.filter((e=>l.includes(e)));if(null==i?void 0:i.length)return x(n,e,t)}return null}async function w(e,n,t){var i,o;const a=function(e,n){if(!e.configFiles)return!1;let t=0;for(const i of e.configFiles)if(i.includes('*')){const e=i.replace(/\-/g,'-').replace(/\//g,'/').replace(/\./g,'.').replace(/\*/g,'(.*)')+'$';new RegExp(e,'ig').test(n)&&t++}else(null==n?void 0:n.endsWith(i))&&t++;return t>0}(e,t);if(!a)return null;if(null===await $(e,n))return null;if(null===(i=e.package)||void 0===i?void 0:i.dependencies)for(const i of null===(o=e.package)||void 0===o?void 0:o.dependencies){const o=await h(t);if(o){if(o.includes(i))return x(n,e,t)}else if(t.includes('tree')&&a)return x(n,e,t)}return a?x(n,e,t):null}async function L(e,n,t){if(!('static'===e.id))return null;for(const i of null==e?void 0:e.configFiles)if(t.endsWith(i))return x(n,e,t);return null}async function $(e,n){if(!e.outputLocation)return'./';if(!1===e.outputLocation.includes('{'))return e.outputLocation;const t=e.outputLocation.indexOf('{'),i=e.outputLocation.indexOf('}'),o=e.outputLocation.substring(t+1,i).trim(),[a,c]=o.split('#'),s=m.join(n,a.trim()),u=await h(s);if(u){if(y(u)){const e=j(u),n=await async function(e,n){return r(e,n)}(e,c.trim())||'./';return n}console.warn(`[${e.name}] Could not parse JSON file: ${s}`)}return'./'}function F(e,n){const t=n.find((n=>n.framework.id===e.framework.id));return t?t.matchedFiles=[...new Set([...t.matchedFiles,...e.matchedFiles])]:n.push(e),n}async function x(e,n,t){const i=u(t),o=function(e){if((e=u(e)).startsWith('http')){const n=d();if(n){const{branch:t,url:i}=n.$$repo;return m.dirname(e.replace(i,'').replace(`/blob/${t}/`,'/'))}return e}return m.dirname(e)}(t),{repo:a,owner:c}=function(e){const[n,t,i,o,a]=e.split('/');return{repo:o,owner:a}}(e);return{repo:a,owner:c,deployment:{appLocation:o,outputLocation:await $(n,e)},matchedFiles:[i],framework:n}}const S=require('express')(),_=process.env.PORT||3e3;S.get('/',(async(e,n)=>{const t=e.query.repo,i=e.query.org,o=e.query.branch,a=e.headers['github-token'];if(i&&'string'==typeof i)if(t&&'string'==typeof t)if('string'!=typeof o)n.status(400),n.json('Invalid parameters: Branch');else if('string'!=typeof a)n.status(400),n.json('Invalid header: Github-token');else{const e=await((e,n,t,i)=>(console.log(i),b(`https://github.com/${e}/${n}${t}? : #${t}: ''`,[],!0)))(i,t,o,a);n.status(200),n.json(e)}else n.status(400),n.json('Invalid parameters: Repo');else n.status(400),n.json('Invalid parameters: Org')})),S.listen(_,(()=>{console.log(`⚡️[server]: Server is running at https://localhost:${_}`)}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyJub2RlX21vZHVsZXMvc3RyaXAtanNvbi1jb21tZW50cy9pbmRleC5qcyIsInNyYy9saWIvdXRpbHMudHMiLCJzcmMvbGliL2RldGVjdG9ycy50cyIsInNyYy9saWIvZnVuY3Rpb25zLnRzIiwic3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHNpbmdsZUNvbW1lbnQgPSBTeW1ib2woJ3NpbmdsZUNvbW1lbnQnKTtcbmNvbnN0IG11bHRpQ29tbWVudCA9IFN5bWJvbCgnbXVsdGlDb21tZW50Jyk7XG5cbmNvbnN0IHN0cmlwV2l0aG91dFdoaXRlc3BhY2UgPSAoKSA9PiAnJztcbmNvbnN0IHN0cmlwV2l0aFdoaXRlc3BhY2UgPSAoc3RyaW5nLCBzdGFydCwgZW5kKSA9PiBzdHJpbmcuc2xpY2Uoc3RhcnQsIGVuZCkucmVwbGFjZSgvXFxTL2csICcgJyk7XG5cbmNvbnN0IGlzRXNjYXBlZCA9IChqc29uU3RyaW5nLCBxdW90ZVBvc2l0aW9uKSA9PiB7XG5cdGxldCBpbmRleCA9IHF1b3RlUG9zaXRpb24gLSAxO1xuXHRsZXQgYmFja3NsYXNoQ291bnQgPSAwO1xuXG5cdHdoaWxlIChqc29uU3RyaW5nW2luZGV4XSA9PT0gJ1xcXFwnKSB7XG5cdFx0aW5kZXggLT0gMTtcblx0XHRiYWNrc2xhc2hDb3VudCArPSAxO1xuXHR9XG5cblx0cmV0dXJuIEJvb2xlYW4oYmFja3NsYXNoQ291bnQgJSAyKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHN0cmlwSnNvbkNvbW1lbnRzKGpzb25TdHJpbmcsIHt3aGl0ZXNwYWNlID0gdHJ1ZX0gPSB7fSkge1xuXHRpZiAodHlwZW9mIGpzb25TdHJpbmcgIT09ICdzdHJpbmcnKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgRXhwZWN0ZWQgYXJndW1lbnQgXFxganNvblN0cmluZ1xcYCB0byBiZSBhIFxcYHN0cmluZ1xcYCwgZ290IFxcYCR7dHlwZW9mIGpzb25TdHJpbmd9XFxgYCk7XG5cdH1cblxuXHRjb25zdCBzdHJpcCA9IHdoaXRlc3BhY2UgPyBzdHJpcFdpdGhXaGl0ZXNwYWNlIDogc3RyaXBXaXRob3V0V2hpdGVzcGFjZTtcblxuXHRsZXQgaXNJbnNpZGVTdHJpbmcgPSBmYWxzZTtcblx0bGV0IGlzSW5zaWRlQ29tbWVudCA9IGZhbHNlO1xuXHRsZXQgb2Zmc2V0ID0gMDtcblx0bGV0IHJlc3VsdCA9ICcnO1xuXG5cdGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBqc29uU3RyaW5nLmxlbmd0aDsgaW5kZXgrKykge1xuXHRcdGNvbnN0IGN1cnJlbnRDaGFyYWN0ZXIgPSBqc29uU3RyaW5nW2luZGV4XTtcblx0XHRjb25zdCBuZXh0Q2hhcmFjdGVyID0ganNvblN0cmluZ1tpbmRleCArIDFdO1xuXG5cdFx0aWYgKCFpc0luc2lkZUNvbW1lbnQgJiYgY3VycmVudENoYXJhY3RlciA9PT0gJ1wiJykge1xuXHRcdFx0Y29uc3QgZXNjYXBlZCA9IGlzRXNjYXBlZChqc29uU3RyaW5nLCBpbmRleCk7XG5cdFx0XHRpZiAoIWVzY2FwZWQpIHtcblx0XHRcdFx0aXNJbnNpZGVTdHJpbmcgPSAhaXNJbnNpZGVTdHJpbmc7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGlzSW5zaWRlU3RyaW5nKSB7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHRpZiAoIWlzSW5zaWRlQ29tbWVudCAmJiBjdXJyZW50Q2hhcmFjdGVyICsgbmV4dENoYXJhY3RlciA9PT0gJy8vJykge1xuXHRcdFx0cmVzdWx0ICs9IGpzb25TdHJpbmcuc2xpY2Uob2Zmc2V0LCBpbmRleCk7XG5cdFx0XHRvZmZzZXQgPSBpbmRleDtcblx0XHRcdGlzSW5zaWRlQ29tbWVudCA9IHNpbmdsZUNvbW1lbnQ7XG5cdFx0XHRpbmRleCsrO1xuXHRcdH0gZWxzZSBpZiAoaXNJbnNpZGVDb21tZW50ID09PSBzaW5nbGVDb21tZW50ICYmIGN1cnJlbnRDaGFyYWN0ZXIgKyBuZXh0Q2hhcmFjdGVyID09PSAnXFxyXFxuJykge1xuXHRcdFx0aW5kZXgrKztcblx0XHRcdGlzSW5zaWRlQ29tbWVudCA9IGZhbHNlO1xuXHRcdFx0cmVzdWx0ICs9IHN0cmlwKGpzb25TdHJpbmcsIG9mZnNldCwgaW5kZXgpO1xuXHRcdFx0b2Zmc2V0ID0gaW5kZXg7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9IGVsc2UgaWYgKGlzSW5zaWRlQ29tbWVudCA9PT0gc2luZ2xlQ29tbWVudCAmJiBjdXJyZW50Q2hhcmFjdGVyID09PSAnXFxuJykge1xuXHRcdFx0aXNJbnNpZGVDb21tZW50ID0gZmFsc2U7XG5cdFx0XHRyZXN1bHQgKz0gc3RyaXAoanNvblN0cmluZywgb2Zmc2V0LCBpbmRleCk7XG5cdFx0XHRvZmZzZXQgPSBpbmRleDtcblx0XHR9IGVsc2UgaWYgKCFpc0luc2lkZUNvbW1lbnQgJiYgY3VycmVudENoYXJhY3RlciArIG5leHRDaGFyYWN0ZXIgPT09ICcvKicpIHtcblx0XHRcdHJlc3VsdCArPSBqc29uU3RyaW5nLnNsaWNlKG9mZnNldCwgaW5kZXgpO1xuXHRcdFx0b2Zmc2V0ID0gaW5kZXg7XG5cdFx0XHRpc0luc2lkZUNvbW1lbnQgPSBtdWx0aUNvbW1lbnQ7XG5cdFx0XHRpbmRleCsrO1xuXHRcdFx0Y29udGludWU7XG5cdFx0fSBlbHNlIGlmIChpc0luc2lkZUNvbW1lbnQgPT09IG11bHRpQ29tbWVudCAmJiBjdXJyZW50Q2hhcmFjdGVyICsgbmV4dENoYXJhY3RlciA9PT0gJyovJykge1xuXHRcdFx0aW5kZXgrKztcblx0XHRcdGlzSW5zaWRlQ29tbWVudCA9IGZhbHNlO1xuXHRcdFx0cmVzdWx0ICs9IHN0cmlwKGpzb25TdHJpbmcsIG9mZnNldCwgaW5kZXggKyAxKTtcblx0XHRcdG9mZnNldCA9IGluZGV4ICsgMTtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiByZXN1bHQgKyAoaXNJbnNpZGVDb21tZW50ID8gc3RyaXAoanNvblN0cmluZy5zbGljZShvZmZzZXQpKSA6IGpzb25TdHJpbmcuc2xpY2Uob2Zmc2V0KSk7XG59XG4iLG51bGwsbnVsbCxudWxsLG51bGxdLCJuYW1lcyI6WyJzaW5nbGVDb21tZW50IiwiU3ltYm9sIiwibXVsdGlDb21tZW50Iiwic3RyaXBXaXRob3V0V2hpdGVzcGFjZSIsInN0cmlwV2l0aFdoaXRlc3BhY2UiLCJzdHJpbmciLCJzdGFydCIsImVuZCIsInNsaWNlIiwicmVwbGFjZSIsImlzRXNjYXBlZCIsImpzb25TdHJpbmciLCJxdW90ZVBvc2l0aW9uIiwiaW5kZXgiLCJiYWNrc2xhc2hDb3VudCIsIkJvb2xlYW4iLCJzdHJpcEpzb25Db21tZW50cyIsIndoaXRlc3BhY2UiLCJUeXBlRXJyb3IiLCJzdHJpcCIsImlzSW5zaWRlU3RyaW5nIiwiaXNJbnNpZGVDb21tZW50Iiwib2Zmc2V0IiwicmVzdWx0IiwibGVuZ3RoIiwiY3VycmVudENoYXJhY3RlciIsIm5leHRDaGFyYWN0ZXIiLCJzZWFyY2giLCJyZXF1aXJlIiwiYXN5bmMiLCJsb2FkUHJvamVjdEZpbGVzIiwicm9vdCIsInByb2plY3RVcmwiLCJyZXBvVXJsIiwibm9ybWFsaXplVXJsIiwidXJsIiwiYnJhbmNoIiwic3BsaXQiLCJyZXNwb25zZSIsImpzb24iLCJjYWxsR2l0SHViQXBpIiwic3RhdHVzIiwiJCRyZXBvIiwidHJlZSIsIl9kIiwiZmlsZXMiLCJtYXAiLCJlbnRyeSIsImlzRGlyZWN0b3J5IiwiaW5jbHVkZXMiLCJuYW1lIiwicGF0aCIsInNldEdpdGh1YkRhdGFJbkNhY2hlIiwiZmV0Y2hHaXRIdWJQcm9qZWN0VHJlZXMiLCJnZXRVcmxGcm9tRmlsZXBhdGgiLCJmaWxlcGF0aCIsInN0YXJ0c1dpdGgiLCJwcm9qZWN0IiwiZ2V0R2l0aHViUHJvamVjdERhdGFGcm9tQ2FjaGUiLCJmaWxlIiwiZmluZCIsImYiLCJkZWZhdWx0QnJhbmNoIiwibm9ybWFsaXplZFVybCIsImJsb2JVcmwiLCJfZSIsImlzUmVjdXJzaXZlIiwiRXJyb3IiLCJvcHRpb25zIiwiaGVhZGVycyIsIkFjY2VwdCIsIkF1dGhvcml6YXRpb24iLCJ3aW5kb3ciLCJidG9hIiwiZmV0Y2giLCJfX0dJVEhVQl9QUk9KRUNUX18iLCJkYXRhIiwiZnMiLCJfIiwiX29wdGlvbnMiLCJlbmRzV2l0aCIsIiQkYmxvYiIsIiQkY29udGVudCIsIl9mIiwiY29udGVudCIsImF0b2IiLCJmaWx0ZXIiLCJ1cGRhdGVHaXRIdWJQcm9qZWN0QmxvYkVudHJ5SW5DYWNoZSIsImV4aXN0c1N5bmMiLCJzb21lIiwiam9pbiIsImFyZ3MiLCJmaWxlVXJsIiwicG9wIiwiZ2l0aHViRW50cmllcyIsInJlc29sdmUiLCJiYXNlbmFtZSIsImRpcm5hbWUiLCJyZWFkRmlsZSIsImZpbGVQYXRoIiwiZmlsZUV4aXN0cyIsInJlYWRGaWxlU3luYyIsImVyciIsImlzVmFsaWRKc29uIiwianNvbkNvbnRlbnQiLCJKU09OIiwicGFyc2UiLCJzYWZlUGFyc2VKc29uIiwiaW5zcGVjdCIsInByb2plY3RSb290VXJsIiwiZnJhbWV3b2tEZWZpbml0aW9ucyIsIm1hdGNoQWxsIiwicHJvamVjdEZpbGVzIiwiZm91bmRGcmFtZXdvcmtzIiwidG9JZ25vcmVJZk11bHRpcGxlRnJhbWV3b3Jrc0ZvdW5kIiwiRlJBTUVXT1JLX0RFRklOVElPTlMiLCJjb25zb2xlIiwid2FybiIsImZyYW1ld29yayIsImZyYW1ld29ya01hdGNoQnlQYWNrYWdlSnNvbiIsImluc3BlY3RCeVBhY2thZ2VKU09OSWZFeGlzdHMiLCJpbnNlcnRPclVwZGF0ZU1hdGNoZWRGcmFtd29yayIsImdldE1hdGNoZWRGcmFtZXdvcmtPYmplY3QiLCJmcmFtZXdvcmtNYXRjaEJ5Q29uZmlndXJhdGlvbkZpbGVzIiwiaW5zcGVjdEJ5Q29uZmlndXJhdGlvbkZpbGVJZkV4aXN0cyIsImZyYW1ld29ya01hdGNoQnlJbmRleEh0bWwiLCJpbnNwZWN0QnlJbmRleEh0bWwiLCJ2YXJpYW50IiwiX2EiLCJwdXNoIiwiaWQiLCJ2YXJpYW50RnJhbWV3b3JrRGVmaW5pdGlvbiIsImZ3ayIsImZvdW5kVmFyaWFudEZyYW1yd29ya3MiLCJqc29uQ29udGVudFJhdyIsInBhY2thZ2VKc29uIiwiZXh0cmFjdGVkRGVwZW5kZW5jaWVzIiwiZGVwZW5kZW5jaWVzIiwiZXh0cmFjdGVkRGV2RGVwZW5kZW5jaWVzIiwiZGV2RGVwZW5kZW5jaWVzIiwiZXh0cmFjdGVkRGVwZW5kZW5jaWVzS2V5cyIsIk9iamVjdCIsImtleXMiLCJleHRyYWN0ZWRFbnRyeUtleSIsInBhY2thZ2UiLCJlbnRyeUtleSIsIm1hdGNoZWREZXBlbmRlbmNpZXMiLCJfYiIsInZhbHVlIiwiaGFzQ29uZmlnRmlsZSIsImZpbGVuYW1lIiwiY29uZmlnRmlsZXMiLCJtYXRjaGVkRmlsZXMiLCJjb25maWdGaWxlIiwicmVnZXgiLCJSZWdFeHAiLCJ0ZXN0IiwiaGFzQ29uZmlndXJhdGlvbkZpbGVzIiwiZXZhbHVhdGVPdXRwdXRMb2NhdGlvbiIsImRlcGVuZGVuY2llIiwiY29uZmlndXJhdGlvbkZpbGVDb250ZW50IiwiaW5kZXhIdG1sRmlsZSIsIm91dHB1dExvY2F0aW9uIiwic3RhcnRPZkV4cHJlc3Npb24iLCJpbmRleE9mIiwiZW5kT2ZFeHByZXNzaW9uIiwiZXhwcmVzc2lvbiIsInN1YnN0cmluZyIsInRyaW0iLCJqc29uRmlsZVRvUGFyc2UiLCJqbWVzcGF0aEV4cHJlc3Npb24iLCJqc29uRmlsZVRvUGFyc2VQYXRoIiwiam1lc3BhdGhTZWFyY2giLCJtYXRjaGVkRnJhbWV3b3JrIiwibWF0Y2hlZEZyYW1ld29ya3MiLCJleGlzdGluZ0ZyYW1ld29yayIsIlNldCIsImFwcExvY2F0aW9uIiwiZ2V0QXBwbG9jYXRpb25VcmwiLCJyZXBvIiwib3duZXIiLCJfYyIsImdldFJlcG9JbmZvRnJvbVVybCIsImRlcGxveW1lbnQiLCJhcHAiLCJleHByZXNzIiwicG9ydCIsInByb2Nlc3MiLCJlbnYiLCJQT1JUIiwiZ2V0IiwicmVxIiwicmVzIiwicXVlcnkiLCJvcmciLCJ0b2tlbiIsImZyYW1ld29ya3MiLCJnaXRodWJUb2tl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
