import data from './data.js'

async function worksPortfolioItemSelector() {
	const photos = document.querySelectorAll(`.work-photo`)
	
	// populate the carousel photos and add event listeners
	photos.forEach( (ph, ndx) => {
		// console.log(ndx)
		const image = data.portfolioItems[ndx].homePage.heroImage

		// console.log(image)
		ph.src = image

		ph.addEventListener(`click`, (e) => {
			window.location.href = `/portfolio/${ndx}`
		})
	})
}

export default worksPortfolioItemSelector