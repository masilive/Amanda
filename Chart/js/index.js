const handleButtonPrevClicked = () => {
    window.external.notify('Button Prev Clicked');
}
const handleButtonPlayClicked = () => {
    window.external.notify('Button Play Clicked');
}
const handleButtonNextClicked = () => {
    window.external.notify('Button Next Clicked');
}
const handleButtonAmshyClicked = () => {
    window.external.notify('1:I Love You, Amshy 💖:0');
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

window.plotCandlesticksToChart = (candlestickData) => {

    const data = JSON.parse(candlestickData);

    const canvas = document.getElementById('chartContainer');
    const ctx = canvas.getContext('2d');
    const scaleFactor = 2;

    canvas.width = 800 * scaleFactor;
    canvas.height = 600 * scaleFactor;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.scale(scaleFactor, scaleFactor);

    function drawCandlestick(data, x, y, width, height) {
        const candleWidth = width * 0.8;
        const wickWidth = width * 0.1;

        const openY = y + (data.high - data.open) * height;
        const closeY = y + (data.high - data.close) * height;
        const lowY = y + (data.high - data.low) * height;

        ctx.strokeStyle = data.open > data.close ? 'red' : 'green';
        ctx.lineWidth = wickWidth;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(x + width / 2, y);
        ctx.lineTo(x + width / 2, lowY);
        ctx.stroke();

        ctx.lineWidth = candleWidth;
        ctx.beginPath();
        ctx.moveTo(x + width / 2, openY);
        ctx.lineTo(x + width / 2, closeY);
        ctx.stroke();
    }

    function drawCandlestickChart() {
        const canvasWidth = canvas.width / scaleFactor;
        const canvasHeight = canvas.height / scaleFactor;
        const chartPaddingWidth = 0.01;
        const chartPaddingHeight = 0.03;
        const candlestickPadding = 0.2;
        const paddedWidth = canvasWidth * (1 - chartPaddingWidth * 2);
        const paddedHeight = canvasHeight * (1 - chartPaddingHeight * 2);
        const maxHigh = Math.max(...data.map(d => d.high));
        const minLow = Math.min(...data.map(d => d.low));
        const range = maxHigh - minLow;
        const candleWidth = paddedWidth / data.length * (1 - candlestickPadding);
        const xOffset = paddedWidth / data.length * candlestickPadding;

        data.forEach((d, i) => {
            const x = canvasWidth * chartPaddingWidth + i * (candleWidth + xOffset);
            const y = canvasHeight * chartPaddingHeight + (maxHigh - d.high) / range * paddedHeight;
            const height = paddedHeight / range;
            drawCandlestick(d, x, y, candleWidth, height);
        });
    }

    drawCandlestickChart();
}