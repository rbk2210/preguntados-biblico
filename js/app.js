import { preguntasBiblicas } from './answers.js'
document.addEventListener('DOMContentLoaded', () => {
    const time = document.querySelector('.time');
    const clickbtn = document.querySelector('.clickbtn');
    const nextbtn = document.querySelector('.nextbtn');
    let timecount = 20;
    let interval;
    let optionSelected = 0
    let score = 0
    let scorep = document.querySelector('.score')
    time.textContent = timecount;
    /* lifes */
    let lifes = 5
    const life1 = document.querySelector('#life1')
    const life2 = document.querySelector('#life2')
    const life3 = document.querySelector('#life3')
    const life4 = document.querySelector('#life4')
    const life5 = document.querySelector('#life5')

    const over = document.querySelector('.gameOver')
    const finalPoints = document.querySelector('.final__points')
    /* Control preguntas */
    const answerA = document.getElementById('answer__a');
    const answerB = document.getElementById('answer__b');
    const answerC = document.getElementById('answer__c');
    const answerD = document.getElementById('answer__d');

    let randomNum = 0;
    let ask = document.querySelector('.ask')

    let option__a = document.querySelector('.option__a');
    let option__b = document.querySelector('.option__b');
    let option__c = document.querySelector('.option__c');
    let option__d = document.querySelector('.option__d');
    let correctp = document.querySelector('.correctp')
    let incorrectp = document.querySelector('.incorrectp')
    const reference = document.querySelector('.reference')

    if (clickbtn && nextbtn) {
        clickbtn.addEventListener('click', () => {
            clickbtn.disabled = true
            nextbtn.disabled = false

            correctp.textContent = ''
            incorrectp.textContent = ''
            reference.textContent = ''
            randomAsk();
            init();
        })

        nextbtn.addEventListener('click', () => {

            correctp.textContent = ''
            incorrectp.textContent = ''
            reference.textContent = ''
            nextAnswer();
            randomAsk();
        });
    } else {
        console.error("No se encontraron los botones 'click' o 'next'.");
    }

    function init() {
        clearInterval(interval);
        resetAnswers();
        startGame();
        document.querySelector('.options__container').classList.remove('disabled');
    }

    function resetAnswers() {
        answerA.style.transform = 'translateX(0px)';
        answerB.style.transform = 'translateX(0px)';
        answerC.style.transform = 'translateX(0px)';
        answerD.style.transform = 'translateX(0px)';
    }

    function nextAnswer() {
        clearInterval(interval); 
        moveAnswers();           
        setTimeout(() => {
            resetAnswers();      
            startGame();
            document.querySelector('.options__container').classList.remove('disabled');     
        }, 1000);
    }

    function moveAnswers() {
        answerA.style.transform = 'translateX(-300px)';
        answerB.style.transform = 'translateX(-300px)';
        answerC.style.transform = 'translateX(300px)';
        answerD.style.transform = 'translateX(300px)';
    }

    function startGame() {
        timecount = 20;
        time.textContent = timecount;
        clearInterval(interval);
        interval = setInterval(() => {
            timecount -= 1;
            time.textContent = timecount;

            if (timecount <= 0) {
                clearInterval(interval);
                time.textContent = "0";
                lifescount()
            }
        }, 1000);
    }

    function randomAsk() {
        randomNum = Math.floor(Math.random() * preguntasBiblicas.length) + 1;
        ask.textContent = preguntasBiblicas[randomNum].pregunta
        option__a.textContent = preguntasBiblicas[randomNum].opciones[0];
        option__b.textContent = preguntasBiblicas[randomNum].opciones[1];
        option__c.textContent = preguntasBiblicas[randomNum].opciones[2];
        option__d.textContent = preguntasBiblicas[randomNum].opciones[3];

    }

    function checkAnswer(optionSelected) {
        const correct = preguntasBiblicas[randomNum].respuestaCorrecta
        document.querySelector('.options__container').classList.add('disabled');
        if (optionSelected === correct) {
            incorrectp.textContent = ''
            correctp.textContent = 'Correcto'
            score += 10
            scorep.textContent = score
            reference.textContent = preguntasBiblicas[randomNum].referenciaBiblica
            clearInterval(interval)
        } else {
            correctp.textContent = ''
            incorrectp.textContent = 'Incorrecto'
            lifescount()
            clearInterval(interval)
        }
    }
    function lifescount() {
        if (lifes === 5) {
            life5.style.animation = 'none'
            life5.style.filter = 'brightness(0) invert(0)'
            lifes -= 1
        } else if (lifes === 4) {
            life4.style.animation = 'none'
            life4.style.filter = 'brightness(0) invert(0)'
            lifes -= 1
        } else if (lifes === 3) {
            life3.style.animation = 'none'
            life3.style.filter = 'brightness(0) invert(0)'
            lifes -= 1
        } else if (lifes === 2) {
            life2.style.animation = 'none'
            life2.style.filter = 'brightness(0) invert(0)'
            lifes -= 1
        } else if (lifes === 1) {
            life1.style.animation = 'none'
            life1.style.filter = 'brightness(0) invert(0)'
            lifes -= 1
        }
        if (lifes === 0) {
            nextbtn.disabled = true
            gameOver()
        }
    }

    function gameOver(){
        over.style.display = 'flex'
        finalPoints.textContent = score
    }
    answerA.addEventListener('click', () => {
        optionSelected = option__a.textContent
        checkAnswer(optionSelected)
    })
    answerB.addEventListener('click', () => {
        optionSelected = option__b.textContent
        checkAnswer(optionSelected)
    })
    answerC.addEventListener('click', () => {
        optionSelected = option__c.textContent
        checkAnswer(optionSelected)
    })
    answerD.addEventListener('click', () => {
        optionSelected = option__d.textContent
        checkAnswer(optionSelected)
    })
    const resetButton = document.querySelector('.reset');

    resetButton.addEventListener('click', () => {
        location.reload();
    });
});
