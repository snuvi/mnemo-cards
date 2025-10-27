var currentWordIndex = 0;
var wordsPerRound = 10;

function startGame() {
    document.getElementById("input").value = "";
    document.getElementById("result").innerHTML = "";
    currentWordIndex = 0; // Сброс к первой десятке
    showNextWord();
}

function showNextWord() {
    if (currentWordIndex < words.length) {
        var wordChunk = words.slice(currentWordIndex, currentWordIndex + wordsPerRound);
        var wordSetNumber = Math.floor(currentWordIndex / wordsPerRound) + 1;
        var wordSetText = getWordSetText(wordSetNumber);
        document.getElementById("wordSet").innerHTML = wordSetText;
        document.getElementById("word").innerHTML = wordChunk.join(" ");
        
        // Устанавливаем фокус на элемент ввода и перемещаем курсор в начало
        var inputField = document.getElementById("input");
        inputField.focus();
        inputField.setSelectionRange(0,0);
    } else {
        // Если все слова напечатаны, возвращаемся к первой десятке
        currentWordIndex = 0; 
        showNextWord(); 
    }
}

function getWordSetText(number) {
    var wordSets = ["10-первая десятка","20-вторая десятка","30-третья десятка","40-четвертая десятка","50-пятая десятка","60-шестая десятка","70-седьмая десятка","80-восьмая десятка","90-девятая десятка","100-десятая десятка"];
    return wordSets[number - 1];
}

document.getElementById("input").addEventListener("input", function() {
    var typedWord = document.getElementById("input").value;
    var currentWords = words.slice(currentWordIndex, currentWordIndex + wordsPerRound);
    var wordLetters = currentWords.join(" ").split("");
    var typedLetters = typedWord.split("");
    var highlightedLetters = [];

    for (var i = 0; i < typedLetters.length; i++) {
        if (typedLetters[i] === wordLetters[i]) {
            highlightedLetters.push('<span class="correct">' + typedLetters[i] + '</span>');
        } else {
            highlightedLetters.push('<span class="incorrect">' + typedLetters[i] + '</span>');
        }
    }

    var remainingLetters = wordLetters.slice(typedLetters.length).join("");
    var highlightedWord = highlightedLetters.join("") + remainingLetters;

    document.getElementById("word").innerHTML = highlightedWord;

    if (typedWord === currentWords.join(" ")) {
        document.getElementById("input").value = "";
        
        // Увеличиваем индекс на количество слов в десятке после завершения ввода
        currentWordIndex += wordsPerRound; 
        
        // Проверяем, не вышли ли за пределы массива слов
        if (currentWordIndex >= words.length) { 
            currentWordIndex = 0; // Возвращаемся к первой десятке, если индекс выходит за пределы массива
        }
        
        showNextWord(); // Показываем следующую десятку
    }
});

// Обработчики событий для клавиш
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') { // Если нажали ESC
        startGame(); // Вызываем startGame
    } else if (event.key === 'ArrowLeft') { // Если нажата клавиша стрелка влево
        window.history.back(); // Переход на предыдущую страницу
    } else if (event.key === 'ArrowDown') { // Если нажата клавиша вниз
        window.location.href = "/home/george/Документы/проекты /1_cards/языки/английский/слепая печать/27.html"; // Переход на страницу В меню
        event.preventDefault();
    } else if (event.key === 'ArrowUp') { // Если нажата клавиша стрелка вверх
        window.location.href = "/home/george/Документы/проекты /1_cards/main-menu_2.html"; // Переход по пустой ссылке
        event.preventDefault();
    } else if (event.key === 'ArrowRight') { // Если нажали стрелку вправо
        var currentIndex = 0; // Установите индекс текущей ссылки
        window.location.href= links[currentIndex]; // Переход на ссылку из массива
        event.preventDefault();
    } else if (event.key === 'Shift') { // Если нажали Shift
        event.preventDefault();  
        
        currentWordIndex += wordsPerRound; // Увеличиваем индекс на количество слов в десятке
        
        if (currentWordIndex >= words.length) { 
            currentWordIndex = 0; // Возвращаемся к первой десятке, если индекс выходит за пределы массива
        }
        
        showNextWord(); // Вызываем showNextWord для отображения следующей десятки
    }
});

 
        // Цвета верхнего ряда
        const colors1 = [
            '#E6E6FA', '#8cadcb', '#8cbecb', '#75ccd9', '#63c5c5',
            '#2196a6', '#008080', '#58a2e8', '#2e6fab', '#7b4baa'
        ];

        // Массив для хранения цветов нижнего ряда
        const bottomButtonColors = Array(10).fill('#E6E6FA');

        let activeBottomButtonIndex = null;

        // Все кнопки (верхний и нижний ряды)
        const allButtons = document.querySelectorAll('.color-buttons-container .color-button');

        // Функция для установки активной кнопки
        function setActiveButton(btn) {
            document.querySelectorAll('.color-buttons-container .color-button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        }

        // Функция для применения цвета к фону и кнопке
        function applyColor(index) {
            let color;
            const button = allButtons[index];

            if (button.dataset.row === "1") {
                // Для верхнего ряда берем цвет из colors1
                color = colors1[parseInt(button.dataset.index)];
            } else {
                // Для нижнего ряда берем цвет из bottomButtonColors
                const bottomIndex = parseInt(button.dataset.index) - 10;
                color = bottomButtonColors[bottomIndex];
            }

            document.body.style.backgroundColor = color;
            setActiveButton(button);
        }

        let currentColorIndex = 0;

        // Обработчик нажатия Tab
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Tab') {
                event.preventDefault();
                currentColorIndex = (currentColorIndex + 1) % allButtons.length;
                applyColor(currentColorIndex);
            }
        });

        // Pickr для выбора цвета
        const pickr = Pickr.create({
            el: '.pickr',
            theme: 'monolith',
            default: '#E6E6FA',
            swatches: [
                'rgba(244, 67, 54, 1)',
                'rgba(233, 30, 99, 0.95)',
                'rgba(156, 39, 176, 0.9)',
                'rgba(103, 58, 183, 0.85)',
                'rgba(63, 81, 181, 0.8)',
                'rgba(33, 150, 243, 0.75)',
                'rgba(3, 169, 244, 0.7)',
                'rgba(0, 188, 212, 0.65)',
                'rgba(0, 150, 136, 0.6)',
                'rgba(76, 175, 80, 0.55)',
                'rgba(139, 195, 74, 0.5)',
                'rgba(205, 220, 57, 0.45)',
                'rgba(255, 235, 59, 0.4)',
                'rgba(255, 193, 7, 0.35)'
            ],
            components: {
                preview: true,
                opacity: true,
                hue: true,
                interaction: {
                    hex: true,
                    rgba: true,
                    hsla: true,
                    hsva: true,
                    cmyk: true,
                    input: true,
                    cancel: true,
                    clear: true,
                    save: true
                }
            }
        });

        pickr.on('save', (color, instance) => {
            const hexColor = color.toHEXA().toString();

            if (activeBottomButtonIndex !== null && activeBottomButtonIndex >= 10) {
                const bottomIndex = activeBottomButtonIndex - 10;
                bottomButtonColors[bottomIndex] = hexColor;
                const bottomButtons = document.querySelectorAll('.color-buttons .color-button');
                bottomButtons[bottomIndex].style.backgroundColor = hexColor;
            }

            pickr.hide();
        });

        // Добавляем обработчики клика для каждой кнопки (верхнего и нижнего рядов)
        const allColorButtons = document.querySelectorAll('.color-buttons-container .color-button');
        allColorButtons.forEach((button, index) => {
            button.addEventListener('click', function() {
                setActiveButton(this); // Используем this для передачи кнопки
                currentColorIndex = index; // Обновляем currentColorIndex
                applyColor(index);
                activeBottomButtonIndex = index; // Сохраняем индекс активной кнопки

            });
        });

        // Инициализация нижних кнопок
        const bottomButtons = document.querySelectorAll('.color-buttons .color-button');
        bottomButtons.forEach((button, index) => {
            button.addEventListener('click', function() {
                // Если была нажата кнопка нижнего ряда, то запоминаем её индекс
                activeBottomButtonIndex = index + 10;
                const hexColor = bottomButtonColors[index]; // Берем цвет из массива
                document.body.style.backgroundColor = hexColor; // Устанавливаем цвет фона
            });
        });


