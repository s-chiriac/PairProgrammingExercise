const originalLogger = console.log;

function printResult(result) {
    let resultAlert = document.createElement('div');
    let resultAlertText = document.createTextNode(result.message);

    resultAlert.className = "alert alert-" + result.status + " alert-dismissible";
    resultAlert.id = 'result-alert';
    resultAlert.appendChild(resultAlertText);

    document.body.insertBefore(resultAlert, document.getElementById('result'));
}

function startTest() {
    let name = document.getElementById('name').value;
    let answers = {
        name,
        exercise1: {},
        exercise2: {},
        exercise3: {},
        exercise4: {},
        exercise5: {}
    };

    window.localStorage.setItem('answers', JSON.stringify(answers));
    window.location.href = '/exercise1';
}

console.log = function() {
    for (let i = 0; i < arguments.length; i++) {
        window.exercise1String += arguments[i];
        window.exercise2Array.push(arguments[i]);
    }

    window.exercise1String += '\n';

    originalLogger.apply(this, arguments);
};