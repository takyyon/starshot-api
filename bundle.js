const e=Symbol('singleComment'),n=Symbol('multiComment'),t=()=>'',i=(e,n,t)=>e.slice(n,t).replace(/\S/g,' '),o=(e,n)=>{let t=n-1,i=0;for(;'\\'===e[t];)t-=1,i+=1;return Boolean(i%2)};function a(a,{whitespace:c=!0}={}){if('string'!=typeof a)throw new TypeError(`Expected argument \`jsonString\` to be a \`string\`, got \`${typeof a}\``);const s=c?i:t;let r=!1,u=!1,l=0,p='';for(let t=0;t<a.length;t++){const i=a[t],c=a[t+1];if(!u&&'"'===i){o(a,t)||(r=!r)}if(!r)if(u||i+c!=='//'){if(u===e&&i+c==='\r\n'){t++,u=!1,p+=s(a,l,t),l=t;continue}if(u===e&&'\n'===i)u=!1,p+=s(a,l,t),l=t;else{if(!u&&i+c==='/*'){p+=a.slice(l,t),l=t,u=n,t++;continue}if(u===n&&i+c==='*/'){t++,u=!1,p+=s(a,l,t+1),l=t+1;continue}}}else p+=a.slice(l,t),l=t,u=e,t++}return p+(u?s(a.slice(l)):a.slice(l))}var c=Object.freeze({__proto__:null,default:[{id:'nodejs',name:'Node.js',outputLocation:'api',configFiles:['package.json']},{id:'dotnet',name:'.NET',outputLocation:'api',configFiles:['*.csproj','*.fsproj','global.json']},{id:'python',name:'Python',outputLocation:'api',variant:['django'],configFiles:['requirements.txt','pyproject.toml','runtime.txt','setup.py']},{id:'django',name:'Django',outputLocation:'api',configFiles:['manage.py','wsgi.py','app.py']},{id:'static',name:'Static',outputLocation:'./',configFiles:['index.html','Index.html','default.htm','default.html','index.htm']},{id:'angular',name:'Angular',variant:['angular-universal','scully','ionic-angular'],package:{dependencies:['@angular/core']},outputLocation:'{angular.json#values(projects)[0].architect.build.options.outputPath}',configFiles:['angular.json']},{id:'angular-universal',name:'Angular Universal',package:{dependencies:['@angular/platform-server']},outputLocation:'{angular.json#values(projects)[0].architect.build.options.outputPath}',configFiles:['angular.json','tsconfig.server.json']},{id:'ionic-angular',name:'Ionic for Angular',package:{dependencies:['@ionic/angular']},outputLocation:'{angular.json#values(projects)[0].architect.build.options.outputPath}',configFiles:['ionic.config.json','angular.json']},{id:'scully',name:'Scully',package:{dependencies:['@scullyio/scully','@scullyio/init']},outputLocation:'{angular.json#values(projects)[0].architect.build.options.outputPath}',configFiles:['angular.json','scully.*.config.ts']},{id:'react',name:'React',variant:['preact','nextjs','gatsby','ionic-react'],package:{dependencies:['react','react-dom']},outputLocation:'build'},{id:'preact',name:'Preact',package:{dependencies:['preact']},outputLocation:'build'},{id:'nextjs',name:'Next.js',package:{dependencies:['next']},outputLocation:'out'},{id:'gatsby',name:'Gatsby',package:{dependencies:['gatsby']},outputLocation:'public',configFiles:['gatsby-config.js']},{id:'ionic-react',name:'Ionic for React',package:{dependencies:['@ionic/react']},outputLocation:'build'},{id:'vue',name:'Vue.js',variant:['nuxtjs','vuepress'],package:{dependencies:['vue']},outputLocation:'dist',configFiles:['vue.config.js']},{id:'nuxtjs',name:'Nuxt.js',package:{dependencies:['nuxt']},outputLocation:'dist',configFiles:['nuxt.config.js']},{id:'vuepress',name:'VuePress',package:{dependencies:['vuepress']},outputLocation:'dist'},{id:'aurelia',name:'Aurelia',package:{dependencies:['aurelia-bootstrapper']},outputLocation:'dist'},{id:'elm',name:'Elm',package:{dependencies:['elm','elm-lang']},outputLocation:'public',configFiles:['elm.json']},{id:'ember',name:'Ember.js',package:{entryKey:'ember',dependencies:['ember-cli']},outputLocation:'dist',configFiles:['ember-cli-build.js','.ember-cli']},{id:'flutter',name:'Flutter',package:{dependencies:['flutter','flutter_test']},outputLocation:'build/web',configFiles:['pubspec.yaml']},{id:'glimmer',name:'Glimmer.js',package:{dependencies:['@glimmer/core']},outputLocation:'dist'},{id:'hugo',name:'Hugo',package:{dependencies:['hugo-cli']},outputLocation:'public',configFiles:['archetypes','config.toml']},{id:'knockoutjs',name:'Knockout.js',package:{dependencies:['knockout']},outputLocation:'dist'},{id:'lit',name:'Lit',package:{dependencies:['lit-element']},outputLocation:'dist',configFiles:['custom-elements.json']},{id:'marko',name:'Marko.js',package:{dependencies:['marko']},outputLocation:'public'},{id:'meteor',name:'Meteor',package:{entryKey:'meteor',dependencies:['meteor-node-stubs']},outputLocation:'bundle'},{id:'mithril',name:'Mithril.js',package:{dependencies:['mithril']},outputLocation:'dist'},{id:'polymer',name:'Polymer',package:{dependencies:['@polymer/polymer']},outputLocation:'build/default',configFiles:['polymer.json']},{id:'riot',name:'RiotJS',package:{dependencies:['riot']},outputLocation:'dist'},{id:'stencil',name:'Stencil.js',package:{dependencies:['@stencil/core']},outputLocation:'www',configFiles:['stencil.config.ts']},{id:'svelte',name:'Svelte',package:{dependencies:['svelte']},outputLocation:'public'},{id:'typescript',name:'TypeScript',package:{dependencies:['typescript']},outputLocation:'{tsconfig.json#compilerOptions.outDir}',configFiles:['tsconfig.json']},{id:'azure-functions',name:'Azure Functions',package:{dependencies:[]},outputLocation:'',configFiles:['host.json']}]});const{search:s}=require('jmespath'),r=require('axios').default;async function u(e){return await async function(e){var n;const t=l(e),[i,o='main']=e.split('#');let[a,c]=await p(t);404===a.status&&([a,c]=await p(t.replace(`/${o}`,'/master')));if(c&&(c.$$repo={url:i,branch:o},null===(n=c.tree)||void 0===n?void 0:n.length)){const e=c.tree.map((e=>(e.isDirectory=()=>e.url.includes('tree'),e.name=e.path,e.path)));return g(c),e}return[]}(e)}function l(e,n='main'){const[t,i='main']=e.split('#');let o=t;return t.startsWith('https://github.com')&&(o=t.replace('https://github.com','https://api.github.com/repos')+`/git/trees/${i||n}`),o}async function p(e,n=!0){if(!1===e.startsWith('https://api.github.com'))throw new Error(`Invalid GitHub URL: ${e||'null'}`);const t={headers:{Accept:'application/vnd.github.v3+json',Authorization:'Basic '+Buffer.from(process.env.GITHUB_TOKEN||'takyyon:GITHUB_TOKEN','base64').toString('base64')}};n&&(e=`${e}?recursive=${n}`);const i=await r({headers:t.headers,url:e});return[i,await i.data]}function d(){return process.env.__GITHUB_PROJECT__}function g(e){process.env.__GITHUB_PROJECT__=e}const f={readdir:async(e,n)=>[],async readFileSync(e){var n,t,i;if(e.includes('/git/trees/'))return null;const o=d(),a=null===(n=null==o?void 0:o.tree)||void 0===n?void 0:n.find((n=>n.url.endsWith(e)));if(null===(t=null==a?void 0:a.$$blob)||void 0===t?void 0:t.$$content)return null===(i=a.$$blob)||void 0===i?void 0:i.$$content;const[c,s]=await p(e);return(null==s?void 0:s.content)?(s.content=s.content.replace(/\n/g,'\r\n'),s.$$content=Buffer.from(s.content,'base64').toString('binary'),function(e){var n;const t=d();null===(n=null==t?void 0:t.tree)||void 0===n||n.filter((n=>n.url===e.url)).map((n=>(n.$$blob=e,n))),g(t)}(s),s.$$content):null},existsSync(e){var n;const t=d();return null===(n=null==t?void 0:t.tree)||void 0===n?void 0:n.some((n=>n.path.endsWith(e)||n.url.endsWith(e)))}},m={join(...e){var n,t,i;const o=null!==(n=e.pop())&&void 0!==n?n:'',a=d(),c=null===(t=null==a?void 0:a.tree)||void 0===t?void 0:t.find((e=>e.path.endsWith(o)));return null!==(i=null==c?void 0:c.url)&&void 0!==i?i:o},resolve:(...e)=>e.join('/'),basename:e=>e.split('/').pop(),dirname:e=>e.split('/').slice(0,-1).join('/')};async function h(e){return v(e=l(e))?f.readFileSync(e):null}function v(e){try{return f.existsSync(e)}catch(e){return!1}}function y(e){if(null===e)return!1;e=a(e);try{return JSON.parse(e),!0}catch{return!1}}function j(e){return e=a(e),JSON.parse(e)}async function b(e,n=[],t=!1,i=[]){var o;let a=[];const s=['nodejs','typescript'];if(0===n.length){const e=JSON.parse(JSON.stringify(c));'default'in e&&(n=e.default)}0===i.length&&(i=await u(e));v(l('package.json'))||console.warn('No package.json file found at the root of the project.');for(const c of n)for(const r of i){const u=await k(c,e,r);u&&(a=F(await S(e,c,r),a));const l=await w(c,e,r);l&&(a=F(await S(e,c,r),a));const p=await L(c,e,r);if(p&&(a=F(await S(e,c,r),a)),(u||l||p)&&(null===(o=c.variant)||void 0===o?void 0:o.length)){s.push(c.id);for(const o of c.variant){const s=n.find((e=>e.id===o));if(s){const n=await b(e,[s],t,i);a=F(await S(e,c,r),[...a,...n])}}}}return 1===a.length?a:a.length>1?t?a:a.filter((e=>!1===s.includes(e.framework.id))):[]}async function k(e,n,t){var i,o;var a;if(!((a=t).endsWith('package.json')&&v(a)))return null;const c=await h(t);if(!1===y(c))return console.warn(`[${e.name}] Could not parse JSON file: ${t}`),null;const s=j(c||'{}'),r=s.dependencies||{},u=s.devDependencies||{},l=[...Object.keys(r),...Object.keys(u)],p=s[null===(i=e.package)||void 0===i?void 0:i.entryKey];if(0===l.length)return'nodejs'===e.id?S(n,e,t):null;if(p)return S(n,e,t);if(l.length){const i=null===(o=e.package)||void 0===o?void 0:o.dependencies.filter((e=>l.includes(e)));if(null==i?void 0:i.length)return S(n,e,t)}return null}async function w(e,n,t){var i,o;const a=function(e,n){if(!e.configFiles)return!1;let t=0;for(const i of e.configFiles)if(i.includes('*')){const e=i.replace(/\-/g,'-').replace(/\//g,'/').replace(/\./g,'.').replace(/\*/g,'(.*)')+'$';new RegExp(e,'ig').test(n)&&t++}else(null==n?void 0:n.endsWith(i))&&t++;return t>0}(e,t);if(!a)return null;if(null===await $(e,n))return null;if(null===(i=e.package)||void 0===i?void 0:i.dependencies)for(const i of null===(o=e.package)||void 0===o?void 0:o.dependencies){const o=await h(t);if(o){if(o.includes(i))return S(n,e,t)}else if(t.includes('tree')&&a)return S(n,e,t)}return a?S(n,e,t):null}async function L(e,n,t){if(!('static'===e.id))return null;for(const i of null==e?void 0:e.configFiles)if(t.endsWith(i))return S(n,e,t);return null}async function $(e,n){if(!e.outputLocation)return'./';if(!1===e.outputLocation.includes('{'))return e.outputLocation;const t=e.outputLocation.indexOf('{'),i=e.outputLocation.indexOf('}'),o=e.outputLocation.substring(t+1,i).trim(),[a,c]=o.split('#'),r=m.join(n,a.trim()),u=await h(r);if(u){if(y(u)){const e=j(u),n=await async function(e,n){return s(e,n)}(e,c.trim())||'./';return n}console.warn(`[${e.name}] Could not parse JSON file: ${r}`)}return'./'}function F(e,n){const t=n.find((n=>n.framework.id===e.framework.id));return t?t.matchedFiles=[...new Set([...t.matchedFiles,...e.matchedFiles])]:n.push(e),n}async function S(e,n,t){const i=t,o=t,{repo:a,owner:c}=function(e){const[n,t,i,o,a]=e.split('/');return{repo:a,owner:o}}(e);return{repo:a,owner:c,deployment:{appLocation:o,outputLocation:await $(n,e)},matchedFiles:[i],framework:n}}const x=(e,n,t)=>`https://github.com/${e}/${n}${t?`#${t}`:''}`,O=require('express')(),_=process.env.PORT||8080;O.get('/',(async(e,n)=>{const t=e.query.repo,i=e.query.org;let o=e.query.branch;const a=e.headers['github-token'];if(process.env.GITHUB_TOKEN='',i&&'string'==typeof i)if(t&&'string'==typeof t){a&&'string'==typeof a?process.env.GITHUB_TOKEN=a:console.warn('Invalid token header'),'string'!=typeof o&&(o='',console.warn('Invalid branch parameter'));try{await T(n,i,t,o)}catch(e){n.status(500),n.json(e)}}else n.status(400),n.json('Invalid or missing parameters: Repo');else n.status(400),n.json('Invalid or missing parameters: Org')})),O.listen(_,(()=>{console.log(`⚡️[server]: Server is running at https://localhost:${_}`)}));const T=(e,n,t,i)=>((e,n,t)=>b(x(e,n,t),[],!0,[]))(n,t,i).then((o=>{((e,n,t,i)=>{const o=x(n,t,i);return console.log(`Url: ${o}`),console.log(e),Promise.resolve('staticwebapp')})(o,n,t,i).then((n=>{e.status(200),e.json({frameworks:o,recommendation:n})})).catch((n=>{console.log('Error on Recommendation: '+n),e.status(500),e.json(n)})).catch((n=>{console.log('Error on framework: '+n),e.status(500),e.json(n)}))}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyJub2RlX21vZHVsZXMvc3RyaXAtanNvbi1jb21tZW50cy9pbmRleC5qcyIsInNyYy9saWIvdXRpbHMudHMiLCJzcmMvbGliL2RldGVjdG9ycy50cyIsInNyYy9saWIvZnVuY3Rpb25zLnRzIiwic3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHNpbmdsZUNvbW1lbnQgPSBTeW1ib2woJ3NpbmdsZUNvbW1lbnQnKTtcbmNvbnN0IG11bHRpQ29tbWVudCA9IFN5bWJvbCgnbXVsdGlDb21tZW50Jyk7XG5cbmNvbnN0IHN0cmlwV2l0aG91dFdoaXRlc3BhY2UgPSAoKSA9PiAnJztcbmNvbnN0IHN0cmlwV2l0aFdoaXRlc3BhY2UgPSAoc3RyaW5nLCBzdGFydCwgZW5kKSA9PiBzdHJpbmcuc2xpY2Uoc3RhcnQsIGVuZCkucmVwbGFjZSgvXFxTL2csICcgJyk7XG5cbmNvbnN0IGlzRXNjYXBlZCA9IChqc29uU3RyaW5nLCBxdW90ZVBvc2l0aW9uKSA9PiB7XG5cdGxldCBpbmRleCA9IHF1b3RlUG9zaXRpb24gLSAxO1xuXHRsZXQgYmFja3NsYXNoQ291bnQgPSAwO1xuXG5cdHdoaWxlIChqc29uU3RyaW5nW2luZGV4XSA9PT0gJ1xcXFwnKSB7XG5cdFx0aW5kZXggLT0gMTtcblx0XHRiYWNrc2xhc2hDb3VudCArPSAxO1xuXHR9XG5cblx0cmV0dXJuIEJvb2xlYW4oYmFja3NsYXNoQ291bnQgJSAyKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHN0cmlwSnNvbkNvbW1lbnRzKGpzb25TdHJpbmcsIHt3aGl0ZXNwYWNlID0gdHJ1ZX0gPSB7fSkge1xuXHRpZiAodHlwZW9mIGpzb25TdHJpbmcgIT09ICdzdHJpbmcnKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgRXhwZWN0ZWQgYXJndW1lbnQgXFxganNvblN0cmluZ1xcYCB0byBiZSBhIFxcYHN0cmluZ1xcYCwgZ290IFxcYCR7dHlwZW9mIGpzb25TdHJpbmd9XFxgYCk7XG5cdH1cblxuXHRjb25zdCBzdHJpcCA9IHdoaXRlc3BhY2UgPyBzdHJpcFdpdGhXaGl0ZXNwYWNlIDogc3RyaXBXaXRob3V0V2hpdGVzcGFjZTtcblxuXHRsZXQgaXNJbnNpZGVTdHJpbmcgPSBmYWxzZTtcblx0bGV0IGlzSW5zaWRlQ29tbWVudCA9IGZhbHNlO1xuXHRsZXQgb2Zmc2V0ID0gMDtcblx0bGV0IHJlc3VsdCA9ICcnO1xuXG5cdGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBqc29uU3RyaW5nLmxlbmd0aDsgaW5kZXgrKykge1xuXHRcdGNvbnN0IGN1cnJlbnRDaGFyYWN0ZXIgPSBqc29uU3RyaW5nW2luZGV4XTtcblx0XHRjb25zdCBuZXh0Q2hhcmFjdGVyID0ganNvblN0cmluZ1tpbmRleCArIDFdO1xuXG5cdFx0aWYgKCFpc0luc2lkZUNvbW1lbnQgJiYgY3VycmVudENoYXJhY3RlciA9PT0gJ1wiJykge1xuXHRcdFx0Y29uc3QgZXNjYXBlZCA9IGlzRXNjYXBlZChqc29uU3RyaW5nLCBpbmRleCk7XG5cdFx0XHRpZiAoIWVzY2FwZWQpIHtcblx0XHRcdFx0aXNJbnNpZGVTdHJpbmcgPSAhaXNJbnNpZGVTdHJpbmc7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGlzSW5zaWRlU3RyaW5nKSB7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHRpZiAoIWlzSW5zaWRlQ29tbWVudCAmJiBjdXJyZW50Q2hhcmFjdGVyICsgbmV4dENoYXJhY3RlciA9PT0gJy8vJykge1xuXHRcdFx0cmVzdWx0ICs9IGpzb25TdHJpbmcuc2xpY2Uob2Zmc2V0LCBpbmRleCk7XG5cdFx0XHRvZmZzZXQgPSBpbmRleDtcblx0XHRcdGlzSW5zaWRlQ29tbWVudCA9IHNpbmdsZUNvbW1lbnQ7XG5cdFx0XHRpbmRleCsrO1xuXHRcdH0gZWxzZSBpZiAoaXNJbnNpZGVDb21tZW50ID09PSBzaW5nbGVDb21tZW50ICYmIGN1cnJlbnRDaGFyYWN0ZXIgKyBuZXh0Q2hhcmFjdGVyID09PSAnXFxyXFxuJykge1xuXHRcdFx0aW5kZXgrKztcblx0XHRcdGlzSW5zaWRlQ29tbWVudCA9IGZhbHNlO1xuXHRcdFx0cmVzdWx0ICs9IHN0cmlwKGpzb25TdHJpbmcsIG9mZnNldCwgaW5kZXgpO1xuXHRcdFx0b2Zmc2V0ID0gaW5kZXg7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9IGVsc2UgaWYgKGlzSW5zaWRlQ29tbWVudCA9PT0gc2luZ2xlQ29tbWVudCAmJiBjdXJyZW50Q2hhcmFjdGVyID09PSAnXFxuJykge1xuXHRcdFx0aXNJbnNpZGVDb21tZW50ID0gZmFsc2U7XG5cdFx0XHRyZXN1bHQgKz0gc3RyaXAoanNvblN0cmluZywgb2Zmc2V0LCBpbmRleCk7XG5cdFx0XHRvZmZzZXQgPSBpbmRleDtcblx0XHR9IGVsc2UgaWYgKCFpc0luc2lkZUNvbW1lbnQgJiYgY3VycmVudENoYXJhY3RlciArIG5leHRDaGFyYWN0ZXIgPT09ICcvKicpIHtcblx0XHRcdHJlc3VsdCArPSBqc29uU3RyaW5nLnNsaWNlKG9mZnNldCwgaW5kZXgpO1xuXHRcdFx0b2Zmc2V0ID0gaW5kZXg7XG5cdFx0XHRpc0luc2lkZUNvbW1lbnQgPSBtdWx0aUNvbW1lbnQ7XG5cdFx0XHRpbmRleCsrO1xuXHRcdFx0Y29udGludWU7XG5cdFx0fSBlbHNlIGlmIChpc0luc2lkZUNvbW1lbnQgPT09IG11bHRpQ29tbWVudCAmJiBjdXJyZW50Q2hhcmFjdGVyICsgbmV4dENoYXJhY3RlciA9PT0gJyovJykge1xuXHRcdFx0aW5kZXgrKztcblx0XHRcdGlzSW5zaWRlQ29tbWVudCA9IGZhbHNlO1xuXHRcdFx0cmVzdWx0ICs9IHN0cmlwKGpzb25TdHJpbmcsIG9mZnNldCwgaW5kZXggKyAxKTtcblx0XHRcdG9mZnNldCA9IGluZGV4ICsgMTtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiByZXN1bHQgKyAoaXNJbnNpZGVDb21tZW50ID8gc3RyaXAoanNvblN0cmluZy5zbGljZShvZmZzZXQpKSA6IGpzb25TdHJpbmcuc2xpY2Uob2Zmc2V0KSk7XG59XG4iLG51bGwsbnVsbCxudWxsLG51bGxdLCJuYW1lcyI6WyJzaW5nbGVDb21tZW50IiwiU3ltYm9sIiwibXVsdGlDb21tZW50Iiwic3RyaXBXaXRob3V0V2hpdGVzcGFjZSIsInN0cmlwV2l0aFdoaXRlc3BhY2UiLCJzdHJpbmciLCJzdGFydCIsImVuZCIsInNsaWNlIiwicmVwbGFjZSIsImlzRXNjYXBlZCIsImpzb25TdHJpbmciLCJxdW90ZVBvc2l0aW9uIiwiaW5kZXgiLCJiYWNrc2xhc2hDb3VudCIsIkJvb2xlYW4iLCJzdHJpcEpzb25Db21tZW50cyIsIndoaXRlc3BhY2UiLCJUeXBlRXJyb3IiLCJzdHJpcCIsImlzSW5zaWRlU3RyaW5nIiwiaXNJbnNpZGVDb21tZW50Iiwib2Zmc2V0IiwicmVzdWx0IiwibGVuZ3RoIiwiY3VycmVudENoYXJhY3RlciIsIm5leHRDaGFyYWN0ZXIiLCJzZWFyY2giLCJyZXF1aXJlIiwiYXhpb3MiLCJkZWZhdWx0IiwiYXN5bmMiLCJsb2FkUHJvamVjdEZpbGVzIiwicm9vdCIsInByb2plY3RVcmwiLCJyZXBvVXJsIiwibm9ybWFsaXplVXJsIiwidXJsIiwiYnJhbmNoIiwic3BsaXQiLCJyZXNwb25zZSIsImpzb24iLCJjYWxsR2l0SHViQXBpIiwic3RhdHVzIiwiJCRyZXBvIiwidHJlZSIsIl9kIiwiZmlsZXMiLCJtYXAiLCJlbnRyeSIsImlzRGlyZWN0b3J5IiwiaW5jbHVkZXMiLCJuYW1lIiwicGF0aCIsInNldEdpdGh1YkRhdGFJbkNhY2hlIiwiZmV0Y2hHaXRIdWJQcm9qZWN0VHJlZXMiLCJkZWZhdWx0QnJhbmNoIiwibm9ybWFsaXplZFVybCIsInN0YXJ0c1dpdGgiLCJpc1JlY3Vyc2l2ZSIsIkVycm9yIiwib3B0aW9ucyIsImhlYWRlcnMiLCJBY2NlcHQiLCJBdXRob3JpemF0aW9uIiwiQnVmZmVyIiwiZnJvbSIsInByb2Nlc3MiLCJlbnYiLCJHSVRIVUJfVE9LRU4iLCJ0b1N0cmluZyIsImRhdGEiLCJnZXRHaXRodWJQcm9qZWN0RGF0YUZyb21DYWNoZSIsIl9fR0lUSFVCX1BST0pFQ1RfXyIsImZzIiwiXyIsIl9vcHRpb25zIiwicHJvamVjdCIsImZpbGUiLCJmaW5kIiwiZW5kc1dpdGgiLCJfZSIsIiQkYmxvYiIsIiQkY29udGVudCIsIl9mIiwiY29udGVudCIsImZpbHRlciIsInVwZGF0ZUdpdEh1YlByb2plY3RCbG9iRW50cnlJbkNhY2hlIiwiZXhpc3RzU3luYyIsInNvbWUiLCJqb2luIiwiYXJncyIsImZpbGVVcmwiLCJwb3AiLCJnaXRodWJFbnRyaWVzIiwicmVzb2x2ZSIsImJhc2VuYW1lIiwiZGlybmFtZSIsImZpbGVwYXRoIiwicmVhZEZpbGUiLCJmaWxlUGF0aCIsImZpbGVFeGlzdHMiLCJyZWFkRmlsZVN5bmMiLCJlcnIiLCJpc1ZhbGlkSnNvbiIsImpzb25Db250ZW50IiwiSlNPTiIsInBhcnNlIiwic2FmZVBhcnNlSnNvbiIsImluc3BlY3QiLCJwcm9qZWN0Um9vdFVybCIsImZyYW1ld29rRGVmaW5pdGlvbnMiLCJtYXRjaEFsbCIsInByb2plY3RGaWxlcyIsImZvdW5kRnJhbWV3b3JrcyIsInRvSWdub3JlSWZNdWx0aXBsZUZyYW1ld29ya3NGb3VuZCIsInN0cmluZ2lmeSIsIkZSQU1FV09SS19ERUZJTlRJSU9OUyIsImNvbnNvbGUiLCJ3YXJuIiwiZnJhbWV3b3JrIiwiZnJhbWV3b3JrTWF0Y2hCeVBhY2thZ2VKc29uIiwiaW5zcGVjdEJ5UGFja2FnZUpTT05JZkV4aXN0cyIsImluc2VydE9yVXBkYXRlTWF0Y2hlZEZyYW13b3JrIiwiZ2V0TWF0Y2hlZEZyYW1ld29ya09iamVjdCIsImZyYW1ld29ya01hdGNoQnlDb25maWd1cmF0aW9uRmlsZXMiLCJpbnNwZWN0QnlDb25maWd1cmF0aW9uRmlsZUlmRXhpc3RzIiwiZnJhbWV3b3JrTWF0Y2hCeUluZGV4SHRtbCIsImluc3BlY3RCeUluZGV4SHRtbCIsInZhcmlhbnQiLCJfYSIsInB1c2giLCJpZCIsInZhcmlhbnRGcmFtZXdvcmtEZWZpbml0aW9uIiwiZndrIiwiZm91bmRWYXJpYW50RnJhbXJ3b3JrcyIsImYiLCJqc29uQ29udGVudFJhdyIsInBhY2thZ2VKc29uIiwiZXh0cmFjdGVkRGVwZW5kZW5jaWVzIiwiZGVwZW5kZW5jaWVzIiwiZXh0cmFjdGVkRGV2RGVwZW5kZW5jaWVzIiwiZGV2RGVwZW5kZW5jaWVzIiwiZXh0cmFjdGVkRGVwZW5kZW5jaWVzS2V5cyIsIk9iamVjdCIsImtleXMiLCJleHRyYWN0ZWRFbnRyeUtleSIsInBhY2thZ2UiLCJlbnRyeUtleSIsIm1hdGNoZWREZXBlbmRlbmNpZXMiLCJfYiIsInZhbHVlIiwiaGFzQ29uZmlnRmlsZSIsImZpbGVuYW1lIiwiY29uZmlnRmlsZXMiLCJtYXRjaGVkRmlsZXMiLCJjb25maWdGaWxlIiwicmVnZXgiLCJSZWdFeHAiLCJ0ZXN0IiwiaGFzQ29uZmlndXJhdGlvbkZpbGVzIiwiZXZhbHVhdGVPdXRwdXRMb2NhdGlvbiIsImRlcGVuZGVuY2llIiwiY29uZmlndXJhdGlvbkZpbGVDb250ZW50IiwiaW5kZXhIdG1sRmlsZSIsIm91dHB1dExvY2F0aW9uIiwic3RhcnRPZkV4cHJlc3Npb24iLCJpbmRleE9mIiwiZW5kT2ZFeHByZXNzaW9uIiwiZXhwcmVzc2lvbiIsInN1YnN0cmluZyIsInRyaW0iLCJqc29uRmlsZVRvUGFyc2UiLCJqbWVzcGF0aEV4cHJlc3Npb24iLCJqc29uRmlsZVRvUGFyc2VQYXRoIiwiam1lc3BhdGhTZWFyY2giLCJtYXRjaGVkRnJhbWV3b3JrIiwibWF0Y2hlZEZyYW1ld29ya3MiLCJleGlzdGluZ0ZyYW1ld29yayIsIlNldCIsImFwcExvY2F0aW9uIiwicmVwbyIsIm93bmVyIiwiX2MiLCJnZXRSZXBvSW5mb0Zyb21VcmwiLCJkZXBsb3ltZW50IiwiZ2V0UHJvamVjdFVybCIsIm9yZyIsImFwcCIsImV4cHJlc3MiLCJwb3J0IiwiUE9SVCIsImdldCIsInJlcSIsInJlcyIsInF1ZXJ5IiwidG9rZW4iLCJydW5BbmRSZXR1cm5BbmFseXNpcyIsImV4IiwibGlzdGVuIiwibG9nIiwiZ2V0RnJhbWV3b3JrcyIsInRoZW4iLCJmcmFtZXdvcmtzIiwiUHJvbWlzZSIsImdldFJlY29tbWVuZGF0aW9uIiwicmVjb21tZW5kYXRpb24iLCJjYXRjaCIsImV4MSIsImV4MiJdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTUEsRUFBZ0JDLE9BQU8saUJBQ3ZCQyxFQUFlRCxPQUFPLGdCQUV0QkUsRUFBeUIsSUFBTSxHQUMvQkMsRUFBc0IsQ0FBQ0MsRUFBUUMsRUFBT0MsSUFBUUYsRUFBT0csTUFBTUYsRUFBT0MsR0FBS0UsUUFBUSxNQUFPLEtBRXRGQyxFQUFZLENBQUNDLEVBQVlDLEtBQzlCLElBQUlDLEVBQVFELEVBQWdCLEVBQ3hCRSxFQUFpQixFQUVyQixLQUE2QixPQUF0QkgsRUFBV0UsSUFDakJBLEdBQVMsRUFDVEMsR0FBa0IsRUFHbkIsT0FBT0MsUUFBUUQsRUFBaUIsSUFHbEIsU0FBU0UsRUFBa0JMLEdBQVlNLFdBQUNBLEdBQWEsR0FBUSxJQUMzRSxHQUEwQixpQkFBZk4sRUFDVixNQUFNLElBQUlPLFVBQVUscUVBQXFFUCxPQUcxRixNQUFNUSxFQUFRRixFQUFhYixFQUFzQkQsRUFFakQsSUFBSWlCLEdBQWlCLEVBQ2pCQyxHQUFrQixFQUNsQkMsRUFBUyxFQUNUQyxFQUFTLEdBRWIsSUFBSyxJQUFJVixFQUFRLEVBQUdBLEVBQVFGLEVBQVdhLE9BQVFYLElBQVMsQ0FDdkQsTUFBTVksRUFBbUJkLEVBQVdFLEdBQzlCYSxFQUFnQmYsRUFBV0UsRUFBUSxHQUV6QyxJQUFLUSxHQUF3QyxNQUFyQkksRUFBMEIsQ0FDakNmLEVBQVVDLEVBQVlFLEtBRXJDTyxHQUFrQkEsR0FJcEIsSUFBSUEsRUFJSixHQUFLQyxHQUFtQkksRUFBbUJDLElBQWtCLEtBS3RELElBQUlMLElBQW9CckIsR0FBaUJ5QixFQUFtQkMsSUFBa0IsT0FBUSxDQUM1RmIsSUFDQVEsR0FBa0IsRUFDbEJFLEdBQVVKLEVBQU1SLEVBQVlXLEVBQVFULEdBQ3BDUyxFQUFTVCxF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
