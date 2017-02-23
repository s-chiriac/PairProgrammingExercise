function setupEditor() {
    let editors = ['exercise1', 'exercise2', 'exercise3', 'exercise4', 'exercise5', 'exercise5html', 'exercise5css'];
    let answers = JSON.parse(window.localStorage.getItem('answers'));

    window.exercise1String = '';
    window.exercise2Array = [];

    editors.forEach(function(element) {
        let editor = ace.edit(element);
        editor.setTheme('ace/theme/chrome');

        if (element === 'exercise5html') {
            editor.getSession().setMode('ace/mode/html');
            editor.setValue(answers.exercise5.html);
        } else if (element === 'exercise5css') {
            editor.getSession().setMode('ace/mode/css');
            editor.setValue(answers.exercise5.css);
        } else {
            editor.getSession().setMode('ace/mode/javascript');
            if (element === 'exercise5') {
                editor.setValue(answers.exercise5.js);
            } else {
                editor.setValue(answers[element]);
            }
        }
        editor.getSession().setTabSize(2);
        editor.setShowPrintMargin(false);
        editor.gotoLine(1);
    });
}

function evaluateAnswer1() {
    eval(ace.edit('exercise1').getValue());
}

function evaluateAnswer2() {
    eval(ace.edit('exercise2').getValue());
}

function evaluateAnswer3() {
    let result = {
        status: 'danger',
        message: ''
    };

    let expectedArray = ['C', 'B', 'A'];
    let output = '[';
    let answerIsCorrect = true;

    let actualArray = eval(ace.edit('exercise3').getValue());

    for (let i = 0; i < actualArray.length; i++) {
        output += '\'' + actualArray[i] + '\', ';

        if (actualArray[i] !== expectedArray[i]) {
            answerIsCorrect = false;
        }
    }

    if (output.length > 2) {
        output = output.substr(0, output.length - 2);
    }

    output += ']';

    if (answerIsCorrect) {
        result.status = 'success';
        result.message = 'Correct!';
    } else {
        result.message = `That's not quite right, the resulting output is:\n${output}`;
    }

    let resultAlert = document.createElement('div');
    let resultAlertText = document.createTextNode(result.message);
    let currentAlert = document.getElementById('result-alert');

    if (currentAlert) {
        document.body.removeChild(currentAlert);
    }

    resultAlert.className = "alert alert-" + result.status + " alert-dismissible";
    resultAlert.id = 'result-alert';
    resultAlert.appendChild(resultAlertText);

    document.body.insertBefore(resultAlert, document.getElementById('result3'));
}

function evaluateAnswer4() {
    console.log(eval(ace.edit('exercise4').getValue()));
}

function evaluateAnswer5() {
    let js = ace.edit('exercise5').getValue();
    let html = ace.edit('exercise5html').getValue();
    let css = ace.edit('exercise5css').getValue();

    let page = '<html><head><style>' + css + '</style></head><body>' + html + '<script>' + js + '</script></body></html>';

    let pageFrame = document.createElement('iframe');
    let currentPageFrame = document.getElementById('page-frame');

    pageFrame.setAttribute('srcdoc', page);
    pageFrame.id = 'page-frame';

    if (currentPageFrame) {
        document.body.removeChild(currentPageFrame);
    }

    document.body.insertBefore(pageFrame, document.getElementById('result5'));
}
