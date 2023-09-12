import 'dotenv/config'
import path from 'path'
import url from 'url'
import express from 'express'
import ejs from 'ejs'
import mongoose from 'mongoose'
// security packages
import helmet from 'helmet'
import xss from 'xss-clean'
import rateLimiter from 'express-rate-limit'
//
import sendEmail from './controllers/sendEmail.js'
import data from './public/data.js'
// middleware
import notFoundMiddleware from './middleware/notFound.js'

const app = express()

app.set(`view engine`, `ejs`)

// create __filename and __dirname that we lack bc we use ES6 modules
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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
    max: 20, // limit each IP to 100 requests per windowMs
  })
)
app.use(helmet())
app.use(xss())
app.use(helmet())
//

app.get(`/`, function(req, res) {
  const {portfolioItems} = data
  const heroImages = portfolioItems.map( i => i.homePage.heroImage)

  res.status(200).render(
    `home`,
    {
      projects: portfolioItems,
      heroImages: heroImages,
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
  const {portfolioItems} = data
  const project = portfolioItems[ndx]

  // TODO: put this into notes, so that I know how to create
  // dynamic object property names.
  // let ejsVarsObj = populatePortfolioSection(data)
  // ejsVarsObj[`projectTitle`] = portfolioItems[ndx].projectTitle
  // ejsVarsObj[`projectClient`] = portfolioItems[ndx].projectClient
  // ejsVarsObj[`projectYear`] = portfolioItems[ndx].projectYear
  // ejsVarsObj[`projectDescription`] = portfolioItems[ndx].projectDescription

  const heroImages = project.ownPage.heroImages

  res.render(
    `portfolioItem`, 
    {
      projects: portfolioItems, 
      project: project, 
      heroImages: heroImages
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

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3001;
}

app.listen(port, function() {
  console.log(`Server is running on port ${port}`)
})