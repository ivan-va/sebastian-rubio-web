const notFound = (req, res) => 
	res.status(404).render(
		`message`, 
		{
			msg: `Page not found`,
			icon: `fa-solid fa-circle-exclamation`,
			goToAddress: `/`,
			goToAddressString: `home page`,
		}
	)

export default notFound