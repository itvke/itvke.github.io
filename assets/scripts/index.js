

let actions = {
    'baidu': {
        'href': 'https://www.baidu.com/s',
        'name': 'word',
        'placeholder': '百度一下，你就知道'
    },
    'google': {
        'href': 'https://www.google.com/search',
        'name': 'q',
        'placeholder': 'Google 搜索'
    },
    'magi': {
        'href': 'https://magi.com/search',
        'name': 'q',
        'placeholder': 'Mag[i] 搜索'
    },
    'sougou': {
        'href': 'https://www.sogou.com/web',
        'name': 'query',
        'placeholder': '搜狗 搜索'
    },
    'so': {
        'href': 'https://www.so.com/s',
        'name': 'q',
        'placeholder': '360 搜索'
    },
    'bing': {
        'href': 'https://cn.bing.com/search',
        'name': 'q',
        'placeholder': '微软 Bing 搜索'
    }
}

let form = document.getElementById('search-form');
let keyword = document.getElementById('keyword');

function searchTabClick(element) {
    resetSearchTab();
    element.style.color = '#484848';
    element.style['border-bottom'] = '2px solid #484848';

    form.action = actions[element.id]['href'];
    keyword.name = actions[element.id]['name'];
    keyword.placeholder = actions[element.id]['placeholder'];
}

function resetSearchTab() {
    let searchTab = document.getElementById('search-tab');
    let spans = searchTab.getElementsByTagName('span');
    for (let x = 0; x < spans.length; x++) {
        span = spans[x];
        span.style.color = '#A9A9A9';
        span.style['border-bottom'] = '2px solid transparent';
    }
}

let worklist = document.getElementsByClassName('works-list')[0];
console.log(worklist);
let ulArr = worklist.getElementsByTagName('ul');
for (let x = 0; x < ulArr.length; x++) {
    let liArr = ulArr[x].getElementsByTagName('li');
    for (let y = 0; y < liArr.length; y++) {
        let a = liArr[y].getElementsByTagName('a')[0];
        if (a !== undefined) {
            a.addEventListener('click', click);
        }
    }
}

function click() {
    console.log(this.text);
}