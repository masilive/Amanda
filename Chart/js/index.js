const handleButtonPrevClicked = () => {
    window.external.notify('Button Prev Clicked');
}
const handleButtonPlayClicked = () => {
    window.external.notify('Button Play Clicked');
}
const handleButtonNextClicked = () => {
    window.external.notify('Button Next Clicked');
}

window.showNotification = (message, type = 'info', timeLimit = 3000) => {
    const alertContainer = document.getElementById('alertContainer');
    const elementId = alertContainer.childElementCount + 1;

    const onCloseButtonClicked = (elementSelector) => {
        $(elementSelector).remove();
        window.external.notify(elementSelector);
    }

    const divAlert = `<div id="notif-${elementId}" class="alert alert-${type.toLowerCase()} alert-dismissible fade show m-1"><svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#${type}-fill" /></svg> ${message}.<button type="button" class="btn-close" data-bs-dismiss="alert" onClick="onCloseButtonClicked('#notif-${elementId}')"></button></div>`;

    alertContainer.insertAdjacentHTML('beforeend', divAlert);

    setTimeout(function () {
        $(`#notif-${elementId}`).fadeTo(2000, .1);

        setTimeout(function () {
            onCloseButtonClicked(`#notif-${elementId}`);
        }, 2000);
    }, timeLimit);
}