require('dotenv').config()
const path = require('path')
const url = require('url')
const express = require('express')
const ejs = require('ejs')
const mongoose = require('mongoose')
// security packages
const helmet = require('helmet')
// const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')
//
const sendEmail = require('./controllers/sendEmail.js')
const data = require('./public/data.js')
// middleware
const notFoundMiddleware = require('./middleware/notFound.js')

const app = express()

app.set(`view engine`, `ejs`)

// create __filename and __dirname that we lack bc we use ES6 modules
// const __filename = url.fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// console.log(`Filename: ${__filename}`);
// console.log(`Dirname: ${__dirname}`);
//

app.use(express.urlencoded({extended: true}))
app.use(express.static(`public`))
// middleware
app.use(express.json())
//
// security packages activation
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // limit each IP to 100 requests per windowMs
  })
)
app.use(helmet())
app.use(xss())
// app.use(cors())
//

app.get(`/`, function(req, res) {
  const {
    portfolioItems,
    faqItems,
    reviewItems,
    servicesItems,
  } = data

  const heroImages = portfolioItems.map( i => i.homePage.heroImage)

  res.status(200).render(
    `home`,
    {
      projects: portfolioItems,
      heroImages: heroImages,
      faqItems: faqItems,
      reviewItems: reviewItems,
      servicesItems: servicesItems,
    }
  )
});

app.post(`/send`, sendEmail, function(req, res) {
  res.status(200).render(
    `message`,
    {
      msg: `Message sent!`,
      icon: `fa-solid fa-envelope-circle-check`,
      goToAddress: `/`,
      goToAddressString: `home page`,
    }
  )
})

app.get(`/portfolio/:ndx`, function(req, res) {
  const {ndx} = req.params
  const {portfolioItems, reviewItems} = data
  const project = portfolioItems[ndx]

  // const workSectionImages = portfolioItems.map( i => i.worksSectionImage)

  const heroImages = project.ownPage.heroImages

  res.render(
    `portfolioItem`, 
    {
      projects: portfolioItems, 
      project: project, 
      heroImages: heroImages,
      reviewItems: reviewItems,
    }
  )
})

app.get(`/contact-empty`, function(req, res) {
  res.status(400).render(
    `message`,
    {
      msg: `Not sent! Please, fill out all fields.`,
      icon: `fa-solid fa-circle-exclamation`,
      goToAddress: `/#footer-contact`,
      goToAddressString: `contact form`,
    }
  )
})

app.get(`/contact-email-error`, function(req, res) {
  res.status(400).render(
    `message`,
    {
      msg: `Not sent! Invalid email, try again.`,
      icon: `fa-solid fa-circle-exclamation,`,
      goToAddress: `/#footer-contact`,
      goToAddressString: `contact form`,
    }
  )
})

// error handling middleware setup
app.use(notFoundMiddleware)
//
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log(`Server is running on port ${port}`)
})