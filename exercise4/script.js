function evaluateAnswer() {
    let currentAlert = document.getElementById('result-alert');
    let result = {
        status: 'danger',
        message: ''
    };

    if (eval(ace.edit('editor').getValue()) === 16) {
        result.status = 'success';
        result.message = 'Correct! The maximum profit is 16.';
    } else {
        result.message = 'That\'s not the right answer.';
    }

    if (currentAlert) {
        document.body.removeChild(currentAlert);
    }

    printResult(result);

    saveSolution(false);
}

function saveSolution(redirect = true) {
    let answers = JSON.parse(window.localStorage.getItem('answers'));

    answers.exercise4 = ace.edit('editor').getValue();
    window.localStorage.setItem('answers', JSON.stringify(answers));

    if (redirect) {
        window.location.href = '/exercise5';
    }
}

function setupEditor() {
    window.exercise1String = '';
    window.exercise2Array = [];

    let editor = ace.edit('editor');
    editor.setTheme('ace/theme/chrome');
    editor.getSession().setMode('ace/mode/javascript');
    editor.getSession().setTabSize(2);
    editor.setShowPrintMargin(false);
    editor.gotoLine(4);
}