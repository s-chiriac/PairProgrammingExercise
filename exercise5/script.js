function evaluateAnswer() {
    let js = ace.edit('jsEditor').getValue();
    let html = ace.edit('htmlEditor').getValue();
    let css = ace.edit('cssEditor').getValue();

    let page = '<html><head><style>' + css + '</style></head><body>' + html + '<script>' + js + '</script></body></html>';

    let pageFrame = document.createElement('iframe');
    let currentPageFrame = document.getElementById('page-frame');

    pageFrame.setAttribute('srcdoc', page);
    pageFrame.id = 'page-frame';

    if (currentPageFrame) {
        document.body.removeChild(currentPageFrame);
    }

    document.body.insertBefore(pageFrame, document.getElementById('result'));

    saveSolution(false);
}

function saveSolution(redirect = true) {
    let answers = JSON.parse(window.localStorage.getItem('answers'));

    let js = ace.edit('jsEditor').getValue();
    let html = ace.edit('htmlEditor').getValue();
    let css = ace.edit('cssEditor').getValue();

    answers.exercise5 = {
        js,
        html,
        css
    };

    window.localStorage.setItem('answers', JSON.stringify(answers));

    if (redirect) {
        window.location.href = '/done';
    }
}

function setupEditor() {
    window.exercise1String = '';
    window.exercise2Array = [];

    let jsEditor = ace.edit('jsEditor');
    jsEditor.setTheme('ace/theme/chrome');
    jsEditor.getSession().setMode('ace/mode/javascript');
    jsEditor.getSession().setTabSize(2);
    jsEditor.setShowPrintMargin(false);

    let htmlEditor = ace.edit('htmlEditor');
    htmlEditor.setTheme('ace/theme/chrome');
    htmlEditor.getSession().setMode('ace/mode/html');
    htmlEditor.getSession().setTabSize(2);
    htmlEditor.setShowPrintMargin(false);

    let cssEditor = ace.edit('cssEditor');
    cssEditor.setTheme('ace/theme/chrome');
    cssEditor.getSession().setMode('ace/mode/css');
    cssEditor.getSession().setTabSize(2);
    cssEditor.setShowPrintMargin(false);
}