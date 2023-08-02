function carousel(
		framesAmount = 5,
		leftArrowBtnCssClass = `.carousel-arrow-btn-left`,
		rightArrowBtnCssClass = `.carousel-arrow-btn-right`,
		frameCssClass = `.carousel-frame`,
		conveyorCssClass = `.carousel-conveyor`
	) {

	const leftArrowBtn = document.querySelector(leftArrowBtnCssClass)
	const rightArrowBtn = document.querySelector(rightArrowBtnCssClass)
	const frame = document.querySelector(frameCssClass)
	const conveyor = document.querySelector(conveyorCssClass)

	// our carousel

	// we count from 0, so the total will be (actual_total - 1)
	const framesTotal = framesAmount - 1
	let curFrame = 0
	let frameWidth = getComputedStyle(frame).width.slice(0, 3)

	// on window resize
	window.addEventListener(`resize`, (e) => {
	  frameWidth = getComputedStyle(frame).width.slice(0, 3)
	  conveyor.style.transform = `translateX(-${(frameWidth * curFrame)}px)`
	})

	// cycle automatically between frames
	let timer = setInterval( () => {
		nextFrame()
	}, 4000)

	function resetTimer() {
		clearInterval(timer)
		timer = setInterval( () => {
			nextFrame()
		}, 4000)
	}

	leftArrowBtn.addEventListener(`click`, () => {
		resetTimer()
		curFrame -= 1

		if (curFrame < 0) {
			curFrame = framesTotal
			conveyor.style.transform = `translateX(-${(frameWidth * curFrame)}px)`
			return
		}

		conveyor.style.transform = `translateX(-${frameWidth * curFrame}px)`
	})

	rightArrowBtn.addEventListener(`click`, () => {
		resetTimer()
		nextFrame()
	})

	function nextFrame() {
		curFrame += 1

		if (curFrame > framesTotal) {
			curFrame = 0
			conveyor.style.transform = `translateX(-${frameWidth * curFrame}px)`
			return
		}

		conveyor.style.transform = `translateX(-${frameWidth * curFrame}px)`
	}
}

export default carousel