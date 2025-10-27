var currentWordIndex = 0;
var wordsPerRound = 10;
var hundredWords = [];
var hundredWordIndex = 0;
let lastClickedButton = null;
let usedWords = new Set(); //  Set для использованных слов


function startGame() {
    document.getElementById("input").value = "";
    document.getElementById("result").innerHTML = "";
    currentWordIndex = 0;
    hundredWordIndex = 0;
	 usedWords.clear(); // Очищаем использованные слова при старте
    showNextWord();
}

function showNextWord() {
    var wordChunk;
    let wordSetText = ""; // Переменная для хранения текста десятки

    if (hundredWords.length > 0) {
        wordChunk = hundredWords.slice(hundredWordIndex, hundredWordIndex + wordsPerRound);
        
         // Если достигли конца массива, начинаем сначала
        if (wordChunk.length === 0) {
            hundredWordIndex = 0;
            hundredWords = shuffleArray(words.slice(0, 100)); //  Перемешиваем слова заново
            wordChunk = hundredWords.slice(hundredWordIndex, hundredWordIndex + wordsPerRound);
           usedWords.clear(); //  Очищаем использованные слова
        }
        
        wordSetText = "Вся сотня"; //  Пишем "Вся сотня"
    } else {
        wordChunk = words.slice(currentWordIndex, currentWordIndex + wordsPerRound);
        var wordSetNumber = Math.floor(currentWordIndex / wordsPerRound) + 1;
        wordSetText = getWordSetText(wordSetNumber); //  Получаем текст десятки
    }

    setWordSetText(wordSetText); //  Устанавливаем текст десятки

    if (wordChunk.length > 0) {
        document.getElementById("word").innerHTML = wordChunk.join(" ");
        focusInput();
    } else {
        currentWordIndex = 0;
        showNextWord();
    }
}

function getWordSetText(number) {
    var wordSets = ["10-первая десятка", "20-вторая десятка", "30-третья десятка", "40-четвертая десятка",
                    "50-пятая десятка", "60-шестая десятка", "70-седьмая десятка", "80-восьмая десятка",
                    "90-девятая десятка", "100-десятая десятка"];
    return wordSets[number - 1];
}

function setWordSetText(text) {
    document.getElementById("wordSet").innerHTML = text;
}

function focusInput() {
    var inputField = document.getElementById("input");
    inputField.focus();
    inputField.setSelectionRange(0, 0);
}

document.getElementById("input").addEventListener("input", function() {
    var typedWord = document.getElementById("input").value;
    var currentWords;
    if (hundredWords.length > 0) {
        currentWords = hundredWords.slice(hundredWordIndex, hundredWordIndex + wordsPerRound);
    } else {
        currentWords = words.slice(currentWordIndex, currentWordIndex + wordsPerRound);
    }
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
        if (hundredWords.length > 0) {
            hundredWordIndex += wordsPerRound;
            
            if (hundredWordIndex >= hundredWords.length) {
                 hundredWordIndex = 0;
                 hundredWords = shuffleArray(words.slice(0, 100));
                 usedWords.clear(); 
            }
            
        } else {
            currentWordIndex += wordsPerRound;
        }

        showNextWord();
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        // Проверяем, какая кнопка активна
        if (lastClickedButton && (lastClickedButton.textContent === "По порядку" || lastClickedButton.textContent === "Рандомно по 10")) {
            // Если активна кнопка "По порядку" или "Рандомно по 10", то возвращаем фокус в поле ввода
            focusInput();
            event.preventDefault(); // Предотвращаем вызов startGame()
        } else {
            // В противном случае вызываем startGame
            startGame();
        }
    } else if (event.key === 'ArrowLeft') {
        window.history.back();
    } else if (event.key === 'ArrowDown') {
        window.location.href = "/home/george/Документы/проекты /1_cards/языки/английский/слепая печать/27.html";
        event.preventDefault();
    } else if (event.key === 'ArrowUp') {
        window.location.href = "/home/george/Документы/проекты /1_cards/main-menu_2.html";
        event.preventDefault();
    } else if (event.key === 'ArrowRight') {
        var currentIndex = 0;
        window.location.href = links[currentIndex];
        event.preventDefault();
    } else if (event.key === 'Shift') {
        event.preventDefault();

        if (hundredWords.length === 0) {
            currentWordIndex += wordsPerRound;
        } else {
            hundredWordIndex += wordsPerRound;
        }

        showNextWord();
    }
});

function showOrderedWords() {
    hundredWords = [];
    hundredWordIndex = 0;
    usedWords = new Set(); // Очищаем использованные слова
    var wordChunk = words.slice(currentWordIndex, currentWordIndex + wordsPerRound);
    document.getElementById("word").innerHTML = wordChunk.join(" ");
    
     //  Отображаем номер десятки
    var wordSetNumber = Math.floor(currentWordIndex / wordsPerRound) + 1;
    setWordSetText(getWordSetText(wordSetNumber));
}

function showRandomChunk() {
    hundredWords = [];
    hundredWordIndex = 0;
	 usedWords = new Set(); // Очищаем использованные слова
    var wordChunk = words.slice(currentWordIndex, currentWordIndex + wordsPerRound);
    wordChunk = shuffleArray(wordChunk);
    document.getElementById("word").innerHTML = wordChunk.join(" ");
    
    //  Отображаем номер десятки
    var wordSetNumber = Math.floor(currentWordIndex / wordsPerRound) + 1;
    setWordSetText(getWordSetText(wordSetNumber));
}

function startHundredMode() {
    hundredWords = shuffleArray(words.slice(0, 100));
    hundredWordIndex = 0;
     setWordSetText("Вся сотня");
    usedWords = new Set();
    showNextWord();
}

function shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function selectMode(button, modeFunction) {
    // Убираем розовый цвет с предыдущей кнопки
    if (lastClickedButton !== null) {
        lastClickedButton.classList.remove("pink-button");
    }

    // Запоминаем текущую кнопку и делаем ее розовой
    lastClickedButton = button;
    button.classList.add("pink-button");

    // Вызываем функцию режима
    modeFunction();
}
 
        // Цвета верхнего ряда
        const colors1 = [
            '#9191B1', '#8cadcb', '#8cbecb', '#75ccd9', '#63c5c5',
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
        applyColor(0);