async function worksPortfolioItemSelector() {
	const photos = document.querySelectorAll(`.work-photo`)
	
	photos.forEach( (ph, ndx) => {
		ph.addEventListener(`click`, (e) => {
			window.location.href = `/portfolio/${ndx}`
		})
	})
}

export default worksPortfolioItemSelector