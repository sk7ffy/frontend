let main_screen = document.querySelector('.main-screen')
let start_screen = document.querySelector('.start-screen')
let question = document.querySelector('.question')
let answers = document.querySelector('.answers')
let answer_buttons = document.querySelectorAll('.answer-button')
const start_button = document.querySelector('.start-button')




function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex != 0) { // Цикл повторюється до тих пір, поки залишаються елементи для перемішування
        randomIndex = Math.floor(Math.random() * currentIndex); // Вибираємо елемент, що залишився.
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [    // Міняємо місцями з поточним елементом.
            array[randomIndex], array[currentIndex]];
    }
    return array; // Повертаємо перемішаний масив
}


function randint(min, max) {
    let number = Math.round(Math.random() * (max - min) + min)
    return number

}

function getRandomSign() {
    let signs = ['+', '-', '/', '*']
    return signs[randint(0, 3)]
}

class Question {
    constructor() {
        this.num1 = randint(1, 30)
        this.num2 = randint(1, 30)
        this.sign = getRandomSign()
        this.question = this.num1 + this.sign + this.num2
        if (this.sign == '+') {
            this.correct = this.num1 + this.num2
        } else if (this.sign == '-') {
            this.correct = this.num1 - this.num2
        } else if (this.sign == '/') {
            this.correct = Math.round(this.num1 / this.num2)
        } else if (this.sign == '*') {
            this.correct = this.num1 * this.num2
        }
        this.answers = [
            this.correct,
            randint(this.correct - 15, this.correct - 1),
            randint(this.correct + 1, this.correct + 12),
            randint(this.correct - 15, this.correct - 1),
            randint(this.correct + 1, this.correct + 12),



        ]

        shuffle(this.answers)




    }
    display() {
        question.innerHTML = this.question
        for (let i = 0; i < this.answers.length; i += 1) {
            answer_buttons[i].innerHTML = this.answers[i]
        }


    }


}
let current_question = new Question()




let correct_answers_counter = 0
let total_answers_counter = 0
let cookie = false
let cookies = document.cookie.split(';')

for (let i = 0; i < cookies.length; i += 1) {
    if (cookies[i].split('=')[0].trim() == 'result_cookie') {
        cookies = cookies[i].split('=')[1]
        cookie = true
        break
    }
}
if (cookie) {
    let data = cookies.split('/')
    let aresult = document.querySelector('.quiz-last-result')
    let accuracy = Math.round(+data[0] * 100 / +data[1])
    aresult.innerHTML = `Минулого разу ви дали ${data[0]}
        правильних відповідей із ${data[1]}.Точність - ${accuracy}`
}




start_button.addEventListener('click', function () {
    start_screen.style.display = 'none'
    main_screen.style.display = 'flex'
    
    current_question = new Question()
    current_question.display()
    correct_answers_counter = 0
    total_answers_counter = 0

    setTimeout(function () {



        let accuracy = Math.round(correct_answers_counter * 100 / total_answers_counter)
        let new_cookie = `result_cookie=${correct_answers_counter}/${total_answers_counter}; max-age=10000000000`
        document.cookie = new_cookie

        let result = document.querySelector('.quiz-result')
        result.innerHTML = (`Правильно:${correct_answers_counter}

        Точність:${accuracy}%

        Усього відповідей:${total_answers_counter}  `)
        main_screen.style.display = 'none'
        start_screen.style.display = 'flex'
    }, 10000)

})


current_question.display()




answer_buttons.forEach(function (button) {
    button.addEventListener('click', function () {
        if (button.innerHTML == current_question.correct) {
            correct_answers_counter += 1
            button.style.background = '#00ff48'
            anime({
                targets: button,
                background: '#3FA2F6',
                duration: 500,
                delay: 50,
                easing: 'linear',
            })

        } else {
            button.style.background = '#e30000'


            anime({
                targets: button,
                background: '#3FA2F6',
                rotate: 360,
                duration: 500,
                delay: 50,
                easing: 'linear',
            })

        }
        total_answers_counter += 1
        current_question = new Question()

        current_question.display()


    })

})



