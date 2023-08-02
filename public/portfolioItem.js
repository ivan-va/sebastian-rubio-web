import carousel from './carousel.js'
import heroPortfolioItemSelector from './heroPortfolioItemSelector.js'
import worksPortfolioItemSelector from './worksPortfolioItemSelector.js'


carousel(
	6,
	`.hero-carousel-arrow-btn-left`,
	`.hero-carousel-arrow-btn-right`,
	`.hero-carousel-frame`,
	`.hero-carousel-conveyor`
)

heroPortfolioItemSelector()
worksPortfolioItemSelector()

// let's talk btn
const letsTalkBtns = document.querySelectorAll(`.lets-talk-btn`)

letsTalkBtns.forEach( i => {
	i.addEventListener(`click`, function() {
		// in this case, we don't go to root footer-contact, but
		// to the footer that is on that specific product's page.
		window.location.href = `#footer-contact`
	})
})

// change colors of sections
// const portfolioGalleryNames = document.querySelectorAll(`.work-name`)
// const portfolioGalleryDates = document.querySelectorAll(`.work-date`)

// portfolioGalleryNames.forEach( i => i.style.color = `var(--secondary-500)`)
// portfolioGalleryDates.forEach( i => i.style.color = `var(--secondary-500)`)