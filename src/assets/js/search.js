//   __   ___       __   __       
//  /__` |__   /\  |__) /  ` |__| 
//  .__/ |___ /~~\ |  \ \__, |  | 
//                                
// Generate search bar

const engines = {
    google: {
        'url': 'https://www.google.com/search?q=',
        'display': "Google"
    },
    ddg: {
        'url': 'https://duckduckgo.com/?q=',
        'display': "DuckDuckGo"
     }
    };

const generateSearch = () => {
    let bar = document.querySelector('div.search');
    let placeholder = () => {
        if (CONFIG.barPlaceholder === ''){
            return engines[CONFIG.searchEngine].display;
        } else {
            return CONFIG.barPlaceholder;
        }
    };
    let searchHtml = `<form id="form" class="searchform" role="search"> \n <input type="search" autofocus="autofocus" onfocus="this.select()" class="searchinput" id="query" name="q" placeholder="${placeholder()}" aira-label="${engines[CONFIG.searchEngine].display}"> <button class="searchbutton"> <svg class="searchsvg" id="path" viewBox="0 0 1024 1024"><path class="path1" "></path></svg></button> </form>`;
    bar.innerHTML = searchHtml;
    let search = document.querySelector('.search');
    search.addEventListener('submit',submitted)
    search.focus();
}

function submitted(event){
    const form = document.querySelector('.form');
    const query = document.querySelector('.searchinput');
    event.preventDefault();
    if(CONFIG.openInNewTab){
        window.open(`${engines[CONFIG.searchEngine].url}${query.value}`);
    } else{
        window.location.href = `${engines[CONFIG.searchEngine].url}${query.value}`;
    }
    query.value="";
}

if (CONFIG.searchBar){
    const bar = CONFIG.barStyle;
	var link = document.createElement("link");
	link.type = "text/css";
	link.rel = "stylesheet";
	link.href = `./assets/css/search/${bar}.css`
	document.head.appendChild(link);
    generateSearch();
}

