window.addEventListener('load', () => {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const result = document.getElementById('result')
    let isDrawing = false;

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    function startDrawing(event) {
    isDrawing = true;
    var coordinates = getCoordinates(event);
    // context.beginPath();
    context.lineWidth = 10
    context.moveTo(coordinates.x, coordinates.y);
    }

    function draw(event) {
    if (!isDrawing) return;
    var coordinates = getCoordinates(event);
    context.lineTo(coordinates.x, coordinates.y);
    context.stroke();
    }

    function stopDrawing() {
    isDrawing = false;
    }

    function stopDrawing() {
        isDrawing = false;
        context.beginPath();
    }

    function getCoordinates(event) {
        var x, y;
        if (event.touches && event.touches.length > 0) {
          x = event.touches[0].clientX - canvas.offsetLeft;
          y = event.touches[0].clientY - canvas.offsetTop; 
          y = y + 10
        } else {
          x = event.clientX - canvas.offsetLeft;
          y = event.clientY - canvas.offsetTop;
          y = y + 10
        }
        return { x: x, y: y };
      }

    const saveButton = document.getElementById('saveButton');
    saveButton.addEventListener('click', () => {
        const image = canvas.toDataURL('image/png');

        fetch('http://127.0.0.1:2940/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({img_base64: image})
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            result.innerText = data.data
        })
        .catch(error => {
            console.error('Erro na solicitação:', error);
            // Faça algo em caso de erro na solicitação
        });
    });

    const clearButton = document.getElementById('clearButton')
    clearButton.addEventListener('click', () => {
        var canvasWidth = canvas.width;
        var canvasHeight = canvas.height;

        context.clearRect(0, 0, canvasWidth, canvasHeight);
    })
});