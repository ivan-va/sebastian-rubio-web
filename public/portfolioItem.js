import carousel from './carousel.js'
import heroPortfolioItemSelector from './heroPortfolioItemSelector.js'
import worksPortfolioItemSelector from './worksPortfolioItemSelector.js'

const portfolioItemHeroFrameStr = getComputedStyle(
    document.querySelector(`.hero-carousel-conveyor`)
  ).gridTemplateColumns

// grid-template-columns gives an output of width for every
// column in the format of `column1 column2 column3`. So, to
// count the amount of actual columns, we count the SPACE chars
// in between them, and then we add 1 to the total (return 
// heroFrameAmt + 1 [note: can't use ++ with return on same line]
// after the loop). If there's only one column, it will have no
// space chars, so with 1 added afterwards the value will be
// correct anyway.
function countGridColumns(cssString) {
  let frameAmt = 0
  for (const ch of cssString) {
    if (ch === ` `) frameAmt++
  }
  return frameAmt + 1
}

carousel(
	countGridColumns(portfolioItemHeroFrameStr),
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