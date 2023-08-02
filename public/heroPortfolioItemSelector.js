import data from './data.js'

async function heroPortfolioItemSelector() {
	const photos = document.querySelectorAll(`.hero-carousel-photo`)
	const path = window.location.pathname

	// populate the carousel photos and add event listeners
	// we check if we're on the home page, to show the right photos
	if (path === `/`) {
		photos.forEach( (ph, ndx) => {
			const image = data.portfolioItems[ndx].homePage.heroImage
			ph.src = image

			ph.addEventListener(`click`, (e) => {
				window.location.href = `/portfolio/${ndx}`
			})
		})
	}
	// if we're on a portfolio item page, show the portfolio item photos
	if (path.startsWith(`/portfolio/`)) {
		// get the index of the page from the url, cutting out the
		// `/portfolio/` part
		const pageNdx = window.location.pathname.slice(11)
		// console.log(pageNdx)

		photos.forEach( (ph, ndx) => {
			const image = data.portfolioItems[pageNdx].ownPage.heroImages[ndx]
			ph.src = image
			ph.style.cursor = `default`
		})
	}
}

export default heroPortfolioItemSelector