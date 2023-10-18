import carousel from './carousel.js'
import heroPortfolioItemSelector from './heroPortfolioItemSelector.js'
import worksPortfolioItemSelector from './worksPortfolioItemSelector.js'

const heroFrameStr = getComputedStyle(
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
	countGridColumns(heroFrameStr),
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
		window.location.href = `/#footer-contact`
	})
})

// faq question show/hide
const faqQuestionHeaders = document.querySelectorAll(`.faq-question-header-container`)

faqQuestionHeaders.forEach( h => {
	h.addEventListener(`click`, e => selectAnswer(e))
})

// TODO: complete this
// faqQuestionHeaders[0]

function selectAnswer(e) {
	// get a specific node from the children collection by its name attribute
	const symbol = e.target.closest(`.faq-question-header-container`).children.namedItem(`faq-question-header-symbol`)
	const answer = e.target.closest(`.faq-question-container`).children.namedItem(`faq-question-answer`)
	//
	if (answer.classList.contains(`faq-question-answer-show`)) {
		answer.classList.remove(`faq-question-answer-show`)
		symbol.innerHTML = `<i class="fa-solid fa-plus"></i>`
	} else {
		answer.classList.add(`faq-question-answer-show`)
		symbol.innerHTML = `<i class="fa-solid fa-minus"></i>`
	}
}

