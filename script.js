let colorPicker = document.querySelector(`input[type="color"]`);
let colorPickerWrapper = document.querySelector(".color-picker-wrapper");
colorPicker.onchange = function () {
	colorPickerWrapper.style.backgroundColor = colorPicker.value;
};
colorPickerWrapper.style.backgroundColor = colorPicker.value;


