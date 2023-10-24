const aboutPhoto = document.querySelector(`.about-photo`)

function resizeAboutPhoto() {
	if (window.outerWidth < 768) {
		aboutPhoto.src = `/images/About-me-S.png`
	}
	if (window.outerWidth >= 768 && window.outerWidth < 992) {
		aboutPhoto.src = `/images/About-me-M.png`
	}
	if (window.outerWidth >= 992) {
		aboutPhoto.src = `/images/About-me-L.png`
	}
}

window.addEventListener(`DOMContentLoaded`, function() {
	resizeAboutPhoto()
})

window.addEventListener(`resize`, function() {
	resizeAboutPhoto()
})