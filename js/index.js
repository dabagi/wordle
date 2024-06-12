const 정답 = "APPLE";

let index = 0; // let 수정이 가능한 변수
let attempts = 0; //시도 횟수
let timer

function appStart() {
    const displayGameover = () => {
        const div = document.createElement("div");
        div.innerText = "게임이 종료되었습니다.";
        div.style = "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:45vw; background-color:white; width: 200px;"
        document.body.appendChild(div);
    };

    //다음줄로 넘기기
    const nextLine = () => {
        if (attempts === 6) return gameover();
        attempts += 1;
        index = 0;
    };

    const gameover = () => {
        window.removeEventListener("keydown", handleKeydown);
        displayGameover();
        clearInterval(timer);
    };

    //정답확인
    const heandleEneterkey = () => {
        let 맞은_갯수 = 0;
        for (let i = 0; i < 5; i++) {
            const block = document.querySelector(`.board-column[data-index='${attempts}${i}']`);
            const 입력한_글자 = block.innerText;
            const 정답_글자 = 정답[i];
            if (입력한_글자===정답_글자){ 
                맞은_갯수 += 1;
                block.style.background = "#6AAA64";}
            else if(정답.includes(입력한_글자)) block.style.background = "#c9b458";
            else block.style.background = "#787c7e";
            block.style.color = "#fff"
        }

        if (맞은_갯수 === 5) gameover();
        else nextLine();
    };

    //백스페이스
    const handleBackspace = () => {

        if (index > 0){
            preBlock = document.querySelector(`.board-column[data-index='${attempts}${index - 1}']`);
            preBlock.innerText = "";
        }
        if (index !== 0) index -= 1;
    };
    
    //키다운
    const handleKeydown = (event) => {

        const key = event.key.toUpperCase(); //toUpperCase 대문자 입력
        const keyCode = event.keyCode;
        const thisBlock = document.querySelector(`.board-column[data-index='${attempts}${index}']`);

        if(event.key === 'Backspace') handleBackspace(thisBlock);

        else if (index === 5) {
            if (event.key === "Enter") heandleEneterkey();
            else return;
        } else if (65 <= keyCode && keyCode <=90) { //and = &&
            thisBlock.innerText = key;
            index++; // index = index + 1, index++, idex += 1 -> 세가지가 다 같은 표현 index에 1을 더해줌
        };
    }

    //타이머
    const startTimer = () => {
        const 시작_시간 = new Date();


        function setTime() {
            const 현재_시간 = new Date();
            const 흐른_시간 = new Date(현재_시간 - 시작_시간);
            const 분 = 흐른_시간.getMinutes().toString();//toString을 이용해서 숫자열을 문자열로 바꿈(숫자열은 pad함수가 안먹음)
            const 초 = 흐른_시간.getSeconds().toString();
            const timeH1 = document.querySelector('.time');
            timeH1.innerText = `${분.padStart(2, '0')}:${초.padStart(2, '0')}`;
        }


        //주기성
        timer = setInterval(setTime, 1000);
    };

    startTimer();
    window.addEventListener("keydown", handleKeydown);
}

//맨마지막에 호출, 카멜 표기법 띄어쓰기 기준 대문자 표기
appStart();