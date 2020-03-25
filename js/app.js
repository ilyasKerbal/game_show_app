document.addEventListener('DOMContentLoaded', function(){
    /*
    * Game config
    * */
    const total_misses = 5;
    const phrases = [
        'hello World',
        'treehouse Student',
        'corona virus',
        'stay at home',
        'learn programming'
    ];

    /* Game elements */
    const phrase_elm = document.getElementById('phrase');
    const btn_reset = document.querySelector('.btn__reset');
    const overlay = document.getElementById('overlay');
    const querty_elm = document.getElementById('qwerty');

    /* Game logic */
    let missed = 0;

    const addClassToElement = (element, cls) => {
        let arr = element.className.split(" ");
        if (arr.indexOf(cls) == -1) {
            element.className += " " + cls;
        }
    }

    const getRandomPhraseAsArray = (arr) => {
        const length = arr.length;
        const random_nbr = Math.floor(Math.random() * length);
        return arr[random_nbr].split("");
    }

    const addPhraseToDisplay = (arr) => {
        for(let index = 0; index < arr.length; index++){
            let letter = arr[index];
            let element = document.createElement('li');
            if(letter === ' '){
                element.className = "space";
            }else {
                element.className = "letter";
            }
            element.textContent = letter;
            phrase_elm.appendChild(element);
        }
    }

    const checkLetter = button => {
        let match = null;
        const btn_char = button.textContent.toLowerCase();
        let lis = phrase_elm.children;
        for(let index = 0; index < lis.length; index++){
            let element = lis[index];
            const elem_char = element.textContent.toLowerCase();
            if(elem_char === btn_char){
                match = btn_char;
                addClassToElement(element, "show");
            }
        }
        return match;
    }

    const updateScore = () => {
        const hearts = document.querySelectorAll('#scoreboard ol li img');
        for(let index = 0; index < Math.min(missed, total_misses); index++){
            hearts[index].setAttribute("src", "images/lostHeart.png");
        }
    }

    const checkWin = () => {
        const letters = document.querySelectorAll('.letter');
        const letters_show = document.querySelectorAll('.show');
        if(letters.length === letters_show.length){
            addClassToElement(overlay, "win");
            document.querySelector('.title').textContent = "You Win! Congrats 🎉";
            overlay.style.display = "flex";
        }else if(missed === total_misses){
            addClassToElement(overlay, "lose");
            document.querySelector('.title').textContent = "You Lose! Try another time 😕";
            overlay.style.display = "flex";
        }
    }

    const init = () => {
        missed = 0;
        overlay.className = "start";

        let letters = document.querySelectorAll('#phrase li');
        for(let index = 0; index < letters.length; index++){
            letters[index].parentNode.removeChild(letters[index]);
        }

        let buttons = document.querySelectorAll('#qwerty button');
        for(let index = 0; index < buttons.length; index++){
            buttons[index].className = "";
            buttons[index].disabled = false;
        }
        addPhraseToDisplay(getRandomPhraseAsArray(phrases));
    }

    btn_reset.addEventListener('click', () => {
        overlay.style.display = 'none';
        init();
    });

    querty_elm.addEventListener('click', (e) => {
        if (e.target.tagName === "BUTTON"){
            let match = checkLetter(e.target);
            if(match !== null){

            }else {
                missed += 1;
            }
            e.target.className += "chosen";
            e.target.setAttribute("disabled", true);
            updateScore();
            checkWin();
        }
    });


});