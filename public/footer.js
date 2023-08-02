const date = document.querySelector(`#date`);
const msgTextArea = document.querySelector(`.form-textarea`)

// set year
date.innerHTML = new Date().getFullYear();

// clear the text area on first click
let msgTextAreaClicked = false

// params: element, `clicked` boolean
function clearContentOnFirstClick(el, clicked) {
	el.addEventListener(`click`, () => {
		if (!clicked) {
			el.innerHTML = ``
			clicked = true
		}
	})
}

clearContentOnFirstClick(msgTextArea, msgTextAreaClicked)