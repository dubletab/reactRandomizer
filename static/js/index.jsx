let main_list = [];
let no_duplicate_list = [];
let winners = [];
let nTotalWinners = 0;
let myArr = [];

let currentWinner, setCurrentWinner;
let listWinners, setListWinners;

ReactDOM.render(
<Wrapper />, document.getElementById('root')
);

function Wrapper(props) {
    [currentWinner, setCurrentWinner] = React.useState('');
    [listWinners, setListWinners] = React.useState([]);
    
    return(<div className="wrapper">
                <Header />
                <div className="random-body">
                    <InputData />
                    <OutputData currentWinner={currentWinner} listWinners={listWinners}/>
                </div>
            </div>
    );
}

function Header(props) {
    return(
    <div className="header">
        <div className="title">Рандомайзер</div>
    </div>
    );
}

function InputData(props) {

    const [disabled, setDisabled] = React.useState(true);
    const [fixDisabled, setFixDisabled] = React.useState(false);
    const [btnFixValue, setBtnFixValue] = React.useState('Зафиксировать список');
    const [readOnly, setReadOnly] = React.useState(false);
    const [rowCount, setRowCount] = React.useState(0);
    
    function initList(){
        main_list = document.getElementById('text_data').value.split(`\n`).map(e => e.trim()).filter(e => e);
        no_duplicate_list = Array.from(new Set(main_list));
        setRowCount(no_duplicate_list.length);
        setListWinners([]);
        setCurrentWinner('');
        nTotalWinners = 0;
    }

    function fixAreaInput(){

        initList();
    
        if (readOnly){
            setReadOnly(!readOnly);
            setBtnFixValue('Зафиксировать список');
            setDisabled(!disabled);
        }
    
        else {
            setReadOnly(!readOnly);
            setBtnFixValue('Разблокировать список');
            setDisabled(!disabled);
        }
        
    }

    function getWinner(){
        if (no_duplicate_list.length > 0){
            showWinnerGenerator(no_duplicate_list);
        }
        else {
            setCurrentWinner('Уникальные победители закончились -_-');
        }
    
    }
    
    function showWinnerGenerator(dupList) {
        let tmpN;
        let tmpWinner;
        let timer = 1500;
        let intervalId = setInterval(() => {
            tmpN = getRandomInt(0, dupList.length);
            tmpWinner = dupList[tmpN];
            setCurrentWinner(`Победитель: ${tmpWinner}`);
        }, 20);
        setDisabled(true);
        setFixDisabled(true);
        if(dupList.length === 1) timer = 0;

            setTimeout(() => {
            clearInterval(intervalId);
            tmpN = getRandomInt(0, dupList.length);
            tmpWinner = dupList[tmpN];
            setCurrentWinner(`Победитель: ${tmpWinner}`);

            let winnersArray  = Array.from(listWinners);
            winnersArray.push(<div className="winner" key={nTotalWinners + 1}>{(nTotalWinners + 1) + ' ' + tmpWinner}</div>);
            setListWinners(winnersArray);

            nTotalWinners++;
            dupList.splice(tmpN, 1);
            setDisabled(false);
            setFixDisabled(false);
            let list = document.querySelector('#list_winners');
            list.scrollTop = list.scrollHeight;
        }, timer)


    }

    return(
    <div className="inputdata">
        <div className="inputdata-title">Участники:</div>
        <textarea id = 'text_data' onChange={initList} readOnly={readOnly}></textarea>
        <div className="people-count">Общее число участников: {rowCount}</div>
        <div className="inputdata-btns">
            <input type = 'button' id = "btnFixList" disabled={fixDisabled} value = {btnFixValue} onClick={fixAreaInput}/>
            <input type= 'button' id = "btnGetWinner" disabled={disabled} value="Выбрать победителя" onClick={getWinner}/>
        </div>
    </div>
    );
}

function OutputData(props) {
    return(
    <div className="outputdata">
        <CurrentWinner winner={props.currentWinner}/>
        <ListWinners list={props.listWinners}/>
    </div>
    );
}

function CurrentWinner(props) {
    return(
        <div id = 'current_winner'>{props.winner}</div>
    )
}

function ListWinners(props) {
    return(
        <div id = 'list_winners'>{props.list}</div>
    )
}


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}





