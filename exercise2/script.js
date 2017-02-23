function evaluateAnswer() {
    let currentAlert = document.getElementById('result-alert');
    let result = {
        status: 'danger',
        message: ''
    };

    let expectedArray = [4, 2];
    let output = '';
    let answerIsCorrect = true;

    window.exercise2Array = [];

    eval(ace.edit('editor').getValue());

    for (let i = 0; i < window.exercise2Array.length; i++) {
        output += window.exercise2Array[i] + ', ';

        if (window.exercise2Array[i] !== expectedArray[i]) {
            answerIsCorrect = false;
        }
    }

    if (output.length > 2) {
        output = output.substr(0, output.length - 2);
    }

    if (answerIsCorrect) {
        result.status = 'success';
        result.message = 'Correct!';
    } else {
        result.message = `That's not quite right, the resulting output is:\n${output}`;
    }

    if (currentAlert) {
        document.body.removeChild(currentAlert);
    }

    printResult(result);

    saveSolution(false);
}

function saveSolution(redirect = true) {
    let answers = JSON.parse(window.localStorage.getItem('answers'));

    answers.exercise2 = ace.edit('editor').getValue();
    window.localStorage.setItem('answers', JSON.stringify(answers));

    if (redirect) {
        window.location.href = '/exercise3';
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
    editor.gotoLine(2);
}