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
		window.location.href = `/#footer-contact`
	})
})

// faq question show/hide
const faqQuestionHeaders = document.querySelectorAll(`.faq-question-header-container`)

faqQuestionHeaders.forEach( h => {
	h.addEventListener(`click`, e => selectAnswer(e))
})

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

