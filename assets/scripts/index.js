(function(){
    const actions = {
        'baidu': {
            'href': 'https://www.baidu.com/s',
            'name': 'word',
            'placeholder': '百度一下，你就知道'
        },
        'google': {
            'href': 'https://www.google.com/search',
            'name': 'q',
            'placeholder': 'Search Google'
        },
        'github': {
            'href': 'https://github.com/search',
            'name': 'q',
            'placeholder': 'Search GitHub'
        },
        'overflow': {
            'href': 'https://stackoverflow.com/search',
            'name': 'q',
            'placeholder': 'Search ...'
        },
        'npm': {
            'href': 'https://www.npmjs.com/search',
            'name': 'q',
            'placeholder': 'Search packages'
        }
    }
    
    const popActions = {
        'baidu': {
            'url': 'https://suggestion.baidu.com/su?wd=',
            'callback': '&cb=f1',
        },
        'google': {
            'url': 'http://suggestqueries.google.com/complete/search?q=',
            'callback': '&jsonp=f2',
        }
    }
    
    const commonKey = 'id';
    const classifyTabKey = 'classifyTabId';
    const normalTabSpanStyle = {
        'color': '#dfdfdf',
        'border-bottom': '2px solid transparent',
    }
    
    const clickedTabSpanStyle = {
        'color': 'white',
        'border-bottom': '2px solid white',
    }
    
    $('div.search-tab').find('span').bind('click', function () {
        const element = this;
        const id = element.id;
        $('div.search-tab').find('span').css(normalTabSpanStyle);
        $(element).css(clickedTabSpanStyle);
        $('.search-form').attr('action', actions[id]['href']);
        $('.search-keyword').attr({
            'name': actions[id]['name'],
            'placeholder': actions[id]['placeholder'],
        });
        _hmt.push(['_trackEvent', '搜索栏', 'click', id]);
        setItem(commonKey, id);
        resetDropdown();
    });
    
    $("form").submit(function () {
        let id = getItem('id');
        if (id === undefined || id === null) id = 'baidu';
        let keyword = $('.search-keyword').val();
        _hmt.push(['_trackEvent', id, 'search', keyword]);
    });
    
    $('div.common').find('a').bind('click', function () {
        let a = this;
        _hmt.push(['_trackEvent', '常用', 'click', a.innerText]);
    });
    
    $('div.classify').find('a').bind('click', function () {
        let a = this;
        _hmt.push(['_trackEvent', '分类', 'click', a.innerText]);
    });
    
    function setItem(key, value) {
        if (!window.localStorage) return false;
        let storage = window.localStorage;
        storage.setItem(key, value);
        return true;
    }
    
    function getItem(key) {
        if (!window.localStorage) return null;
        let storage = window.localStorage;
        let value = storage.getItem(key);
        if (value === null) return null;
        return value;
    }
    
    function onStart() {
        let id = getItem(commonKey);
        if (!id) id = "baidu";
        let sId = `#${id}`;
        if (id != null && id != undefined) {
            $('div.search-tab').find('span').css(normalTabSpanStyle);
            $(sId).css(clickedTabSpanStyle);
            $('.search-form').attr('action', actions[id]['href']);
            $('.search-keyword').attr({
                'name': actions[id]['name'],
                'placeholder': actions[id]['placeholder'],
            });
        }
    }
    
    $('#search-keyword').keyup(function () {
        delScript();
        if ($('#search-keyword').val() === '') {
            $('#search-keyword').val('');
            resetDropdown();
            return;
        }
        let id = getItem(commonKey);
        if (!id) id = "baidu";
        if (!popActions.hasOwnProperty(id)) return;
        let popItem = popActions[id];
        let scriptNode = document.createElement('script');
        let url = popItem.url + $('#search-keyword').val() + popItem.callback;
        scriptNode.setAttribute("type", "text/javascript");
        scriptNode.setAttribute("charset", "utf-8");
        scriptNode.setAttribute("id", "jsonp-script");
        scriptNode.setAttribute("src", url);
        document.body.appendChild(scriptNode);
    });
    
    $('body').bind('click', function () {
        resetDropdown();
    });
    
    function f1(data) {
        resetDropdown();
        if (!data.s) return;
        let content = '';
        let length = data.s.length;
        if (length <= 0) {
            return;
        }
        $('#dropdown').show();
        for (let i = 0; i < data.s.length; i++) {
            content += '<li>' + data.s[i] + '</li>';
        }
        $('#dropdown').find('ul').html(content);
        $('#dropdown').find('ul').find('li').bind('click', function () {
            let li = this;
            $('#search-keyword').val(li.innerText);
            resetDropdown();
            let id = getItem(commonKey);
            if (!id) id = "baidu";
            let action = actions[id];
            let url = `${action.href}?${action.name}=${li.innerText}`;
            let keyword = $('#search-keyword').val();
            _hmt.push(['_trackEvent', id, 'search', keyword]);
            window.open(url);
        });
    }
    
    function f2(data) {
    
    }
    
    function delScript() {
        let scriptArray = document.querySelectorAll('script');
        if (scriptArray.length === 0) return;
        for (let x = 0; x < scriptArray.length; x++) {
            scriptNode = scriptArray[x];
            if (scriptNode.id === 'jsonp-script') {
                $("#" + scriptNode.id).remove();
            }
        }
    }
    
    function resetDropdown() {
        $('#dropdown').find('ul').html('');
        $('#dropdown').hide();
    }
    
    const classifyTabClicked = {
        'background-color': '#2f3448',
        'color': 'white'
    }
    const classifyTabNormal = {
        'background-color': 'white',
        'color': '#2f3448'
    }
    
    $('div.classify-tab').find('span').bind('click', classifyTabOnClick);
    
    $('div.classify-descItem').find('a').bind('click', function () {
        let a = this;
        let name = $(a).find('span').html();
        _hmt.push(['_trackEvent', '分类', 'click', name]);
    });
    
    function classifyTabOnClick() {
        let tabId = this.id;
        classifyTabClick(tabId);
    }
    
    function classifyTabClick(tabId) {
        if(!tabId) return;
        let sId = `#${tabId}`;
        let classId = `#classify-${tabId}`;
        resetClassTab();
        $(classId).show();
        $(sId).css(classifyTabClicked);
        setItem(classifyTabKey, tabId);
        _hmt.push(['_trackEvent', '分类Tab', 'click', tabId]);
    }
    
    function resetClassTab() {
        $('section').hide();
        $('div.classify-tab').find('span').css(classifyTabNormal);
    }
    
    $(document).ready(function () {
        onStart();
        let tabId = getItem(classifyTabKey);
        if (tabId != null && tabId != undefined) {
            classifyTabClick(tabId);
        } else {
            resetClassTab();
            $('#classify-all').show();
            $('#all').css(classifyTabClicked);
        }
    });
})() 

