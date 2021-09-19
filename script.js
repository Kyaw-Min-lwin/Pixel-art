//change the color of the color picker when the user picks a colour
let colorPicker = document.querySelector(`input[type="color"]`);
let colorPickerWrapper = document.querySelector(".color-picker-wrapper");
colorPicker.onchange = function () {
	colorPickerWrapper.style.backgroundColor = colorPicker.value;
};
colorPickerWrapper.style.backgroundColor = colorPicker.value;

// make the label of the size ,change as the size selector slider changes
let rangeSlider = document.querySelector(`input[type='range']`);
let gridSizeContainer = document.querySelector('.size-value');
let gridSize = 1;
rangeSlider.addEventListener('mousemove', () => {
	gridSize = rangeSlider.value;
	gridSizeContainer.textContent = `${gridSize}x${gridSize}`;
})
