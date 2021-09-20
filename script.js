let colorButton = document.querySelector('.color-btn');
let colorPicker = document.querySelector(`input[type="color"]`);
let colorPickerWrapper = document.querySelector(".color-picker-wrapper");
let rainbowMode = false;
let rangeSlider = document.querySelector(`input[type='range']`);
let gridSize = 1;
let gridSizeContainer = document.querySelector('.size-value');
let drawingBoard = document.querySelector('#drawing-board');


//change the color of the color picker when the user picks a colour
colorButton.addEventListener('click', () => {
	colorBtnFunc();
});

colorPicker.onchange = function () {
	colorBtnFunc();
	colorPickerWrapper.style.backgroundColor = colorPicker.value;
	colorButton.style.backgroundColor = colorPicker.value;
};
colorPickerWrapper.style.backgroundColor = colorPicker.value;

// make the label of the size ,change as the size selector slider changes and make the number of divs of size
rangeSlider.addEventListener('change', () => {
	gridSize = rangeSlider.value;
	gridSizeContainer.textContent = `${gridSize}x${gridSize}`;
	makeGrid(gridSize);
})

//the clear button
let clear = document.querySelector('.clear');
clear.addEventListener('click', () => {
	rainbowMode = false;
	makeGrid(rangeSlider.value);
	makeNormal();
});

//eraser
let eraser = document.querySelector('.eraser');
eraser.addEventListener('click', () => {
	rainbowMode = false;
	changeColor('black');
	makeNormal();
	eraser.style.transform = 'scale(1.1)';
})

//rainbow btn
let rainbow = document.querySelector('.rainbow');
rainbow.addEventListener('click', () => {
	makeNormal();
	rainbow.style.transform = 'scale(1.1)';
	rainbowMode = true;
	changeColor();

})

function makeGrid(size) {
	removeDivs()
	size = size * 1; // transforming the size into a number
	console.log(drawingBoard.clientHeight)
	let s = drawingBoard.clientHeight / size; // getting the size of the grid
	let frag = document.createDocumentFragment();
	for (let i = 0; i < size * size; i++) {
		let d = document.createElement('div');
		d.style.height = s + 'px';
		d.style.width = s + 'px';
		frag.append(d);
	}
	drawingBoard.append(frag);
	changeColor(colorPicker.value);
}

function changeColor(color) {
	let divs = document.querySelectorAll('#drawing-board div');
	divs.forEach(div => {
		div.addEventListener('mouseover', () => {
			if (rainbowMode) {
				color = `rgb(${makeRainbow()},${makeRainbow()},${makeRainbow()})`;
			}
			div.style.backgroundColor = `${color}`
		})
	})
}

function removeDivs() {
	let el = document.querySelectorAll('#drawing-board div');
	el.forEach(element => {
		element.remove();
	});
}


function makeNormal() {
	let buttons = document.querySelectorAll('button');
	buttons.forEach(button => {
		button.style.transform = 'scale(1)'
	})
}

function makeRainbow() {
	return Math.floor(Math.random() * 256);
}

function colorBtnFunc() {
	rainbowMode = false;
	changeColor(colorPicker.value);
	makeNormal();
	colorButton.style.transform = 'scale(1.1)';
}

makeGrid(1);