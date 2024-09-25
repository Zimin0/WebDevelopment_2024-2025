let urls = [];
let interval = 5000; // Интервал по умолчанию 5 секунд
let currentIndex = 0;
let timer;

function startRotation() {
    const urlInput = document.getElementById("urls").value;
    const intervalInput = document.getElementById("interval").value;
    
    if (urlInput === '') {
        alert('Пожалуйста, введите хотя бы один URL');
        return;
    }
    
    urls = urlInput.split(',').map(url => url.trim());
    interval = parseInt(intervalInput) * 1000;
    
    if (urls.length > 0) {
        loadNextPage();
    } else {
        alert('Не найдено допустимых URL.');
    }
}

function loadNextPage() {
    if (currentIndex >= urls.length) {
        currentIndex = 0; // Вернуться к первому URL
    }

    document.getElementById("webframe").src = urls[currentIndex];
    currentIndex++;
    
    timer = setTimeout(loadNextPage, interval);
}

function stopRotation() {
    clearTimeout(timer);
}
