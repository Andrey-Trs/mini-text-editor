let fontSize = document.forms.fontSize;
let fontFamily = document.forms.fontFamily;
let formColors = document.forms.formColors;
let textDecoration = document.forms.textDecoration;
let colorBox = document.getElementsByClassName('colorBox');
let num = 0;
/*Змінну num створено для того, щоб в залежності від натиснутої кнопки "Колір тексту" "Колір фону" значення змінної num  буде мінятися або 0 або 1 це призведе до того що дві різні функції зможуть використовувати лише один div контейнер для вибору кольору тексту або кольору фону. Тобто щоб скоротити html код,*/
let selectedOption;
let selectedBorderColor;
let selectedListType;

getId('edit').addEventListener('click', show);
getId('style').addEventListener('click', showStyleMenu);
getId('save').addEventListener('click', addSomething);
getId('add').addEventListener('click', ListOrTableSettings);
getId('bgColor').addEventListener('click', showColorBox);
getId('textColor').addEventListener('click', showColorBox2);
getId('createTable').addEventListener('click', addTable);
getId('createList').addEventListener('click', addList);

let setYourTable = document.forms.setYourTable;
setYourTable.select2.addEventListener('change', useTypeLine);
setYourTable.select3.addEventListener('change', chooseBorderColor);

let setYourList = document.forms.setYourList;
setYourList.listStyleType.addEventListener('change', chooseListstyle);
/*Функція chooseListІtyle дає змогу вибрати тип маркування списку */
function chooseListstyle() {
	for (let lt = 0; lt < setYourList.listStyleType.length; lt++) {
		if (setYourList.listStyleType.options[lt].selected) {
			selectedListType = this.value;
		}
	}
}
 /*При кліку на кнопку "Створити список", функція addList  створює попередньо задану кількість користувачем елементів списку та їх стилізує */
function addList() {
	let listOpenTag = '<ul id="bigList" style="list-style-type:' + setYourList.listStyleType.value + '">';
	let ListCloseTag = '</ul>';
	let liStart = '<li>';
	let liEnd = '</li>';
	getId('textArea').value += listOpenTag;
	for (let i = 0; i <= getId('itemQuantity').value; i++) {
		getId('textArea').value += liStart;
		getId('textArea').value += 'Some Text';
		getId('textArea').value += liEnd;
	}
	getId('textArea').value += ListCloseTag;
	getId('box4').style.display = 'none';
	getId('box1').style.display = 'block';
	getId('buttons').style.display = 'block';
	getId('box2').style.display = 'block';
}

function useTypeLine() {
	for (let o = 0; o < setYourTable.select2.length; o++) {
		if (setYourTable.select2.options[o].selected) {
			selectedOption = this.value;
		}
	}
}

function chooseBorderColor() {
	for (let o = 0; o < setYourTable.select3.length; o++) {
		if (setYourTable.select3.options[o].selected) {
			selectedBorderColor = this.value;
		}
	}
}
 /*При кліку на кнопку "Створити таблицю" функція addTable створює таблицю та всі її елементи, для вибору типу лінії таблиці та кольору лінії таблиці задіюються також функції "useTypeLine" та  "chooseBorderColor"*/
function addTable() {
	selectedBorderColor = getId('selectLine2').value;
	selectedOption = getId('selectLine1').value;
	let tableOpenTag = '<table id="table" style="border:' + setYourTable.lineThickness.value + 'px ' + selectedOption + ' ' + selectedBorderColor + '">';
	let tableCloseTag = '</table>';
	let tRowStart = '<tr>';
	let tRowEnd = '</tr>';
	let tCellStart = '<td style="width:' + setYourTable.widthOfData.value + 'px; height:' + setYourTable.heightOfData.value + 'px; ' + 'border:' + setYourTable.lineThickness.value + 'px ' + selectedOption + ' ' + selectedBorderColor + '">';
	let tCellEnd = '</td>';
	getId('textArea').value += tableOpenTag;
	for (let i = 0; i <= getId('countsOfRows').value; i++) {
		getId('textArea').value += tRowStart;
		for (let i = 0; i <= getId('countOfColumns').value; i++) {
			getId('textArea').value += tCellStart;
			getId('textArea').value += tCellEnd;

		}
		getId('textArea').value += tRowEnd;
	}

	getId('textArea').value += tableCloseTag;
	getId('box4').style.display = 'none';
	getId('box1').style.display = 'block';
	getId('buttons').style.display = 'block';
	getId('box2').style.display = 'block';
}
/*Цикл, написаний нище дає змогу вибору одного з двох елементів які користувач бажає створити. Якщо обрано таблицю  появится меню для створення таблиці, так само і при виборі списку*/
for (let i = 0; i < getId('tableOrList').childNodes.length; i++) {
	getId('tableOrList').childNodes[i].addEventListener('click', showStyleForm);

	function showStyleForm() {
		if (getId('tableOrList').childNodes[i].value == 'list') {
			getId('setYourList').style.display = 'block';
			getId('setYourTable').style.display = 'none';
		}
		if (getId('tableOrList').childNodes[i].value == 'table') {
			getId('setYourTable').style.display = 'block';
			getId('setYourList').style.display = 'none';
		}
	}
}

function showColorBox(event) {
	getId('boxOfColors').style.display = 'flex';
	num = 0;
}

function showColorBox2() {
	getId('boxOfColors').style.display = 'flex';
	num = 1;
}

fontFamily.literature.addEventListener('change', changeFont);
textDecoration.textWeight.addEventListener('click', changeTextStyle);
textDecoration.textItalic.addEventListener('click', changeTextStyle);


function ListOrTableSettings() {
	getId('box4').style.display = 'block';
	getId('box1').style.display = 'none';
	getId('buttons').style.display = 'none';
	getId('box2').style.display = 'none';
}

/*Функція для чекбоксів, перевіряє значення чекбоксів і міняє жирність шрифта та його стиль*/
function changeTextStyle() {
	if (textDecoration.textWeight.checked) {
		getId('box1').style.fontWeight = 'bold';
	} else {
		getId('box1').style.fontWeight = 'normal';
	}
	if (textDecoration.textItalic.checked) {
		getId('box1').style.fontStyle = 'italic';
	} else {
		getId('box1').style.fontStyle = 'normal';
	}
}
/*функція changeFont перебирає за допомогою циклу всі дочірні елементи тегу select з ім'ям 'literature', та при виборі елементу задає шрифт контейнеру з id 'box1' */
function changeFont() {
	for (let i = 0; i < fontFamily.literature.length; i++) {
		if (fontFamily.literature.options[i].selected) {
			getId('box1').style.fontFamily = this.value;
		}
	}
}

/*Цикл нище перебирає кожен input type = 'radio'. При виборі одного з них змінюється розмір шрифта в контейнері з id 'box1' */
for (let i = 0; i < fontSize.length; i++) {
	fontSize.radio[i].addEventListener('click', changeSize);

	function changeSize() {
		getId('box1').style.fontSize = this.value;
		console.log(fontSize.childNodes);
	}
}

/*Цикл  нище призначений для змоги доступитися до кожного контейнера з кольором, які знаходяться у getId('boxOfColors') і використання їх значення для зміни кольору тексту або кольору фону */
for (let i = 0; i < getId('boxOfColors').childNodes.length; i++) {
	getId('boxOfColors').childNodes[i].addEventListener('click', changeBackground)

	function changeBackground() {
		if (num == 1) {
			getId('box1').style.color = this.innerHTML;
		} else {
			getId('box1').style.backgroundColor = this.innerHTML;
		}

	}
}
/*Даний  EventListener задає контейнеру  з Id 'boxOfColors' значення видимості. Якщо користувач натиснув на кнопку "Колір тексту" , "Колір фону" то getId('boxOfColors')  буде видимим для користувача. При кліках на інші елементи він щезатиме*/
window.addEventListener('click', function (event) {
	if (event.target != formColors.textColor && event.target != formColors.bgColor && event.target != getId('boxOfColors')) {
		getId('boxOfColors').style.display = 'none';
	}
})

function getId(a) {
	return document.getElementById(a);
}
/*при натисканні на кнопку "Редагувати" функція "show" надасть контейнеру з Id "box2_1" або видимого значення або сховає його  */
function show() {
	if (getId('box2_1').style.display == 'block') {
		getId('box2_1').style.display = 'none';
	} else {
		getId('box2_1').style.display = 'block';
		getId('box3').style.display = 'none';
	}
}
/*при натисканні  на кнопку "Стилізувати" функція "showStyleMenu" надасть контейнеру з Id "box3" або видимого значення або сховає його  */
function showStyleMenu() {
	if (getId('box3').style.display == 'block') {
		getId('box3').style.display = 'none';
	} else {
		getId('box2_1').style.display = 'none';
		getId('box3').style.display = 'block'
	}
}

/*При нажатті кнопки "Зберегти" все що написано всередині textarea стане внутрішніми елементами контейнера Id "box1" */
function addSomething() {
	getId('box1').innerHTML = getId('textArea').value;
	//getId('textArea').value = '';
	getId('box2_1').style.display='none';
	
	
}
