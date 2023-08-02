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

function populatePortfolioSection(theData) {
  const {portfolioItems} = theData
  // console.log(portfolioItems[0].homePage.worksSectionImage)
  let dynamicVarsObj = {}

  // populate the object for the ejs dynamic vars
  portfolioItems.map( (i, ndx) => {
    const newNdx = ndx + 1

    dynamicVarsObj[`workImage${newNdx}`] = i.homePage.worksSectionImage
    dynamicVarsObj[`projectTitle${newNdx}`] = i.projectTitle
    dynamicVarsObj[`projectYear${newNdx}`] = i.projectYear
    dynamicVarsObj[`projectClient${newNdx}`] = i.projectClient
    dynamicVarsObj[`projectDescription${newNdx}`] = i.projectDescription
  })

  return dynamicVarsObj
}

app.get(`/`, function(req, res) {
  // // console.log(portfolioItems[0].homePage.worksSectionImage)
  // other ejs dynamic vars could be appended for the final object,
  // so it's concieved as let
  let ejsVarsObj = populatePortfolioSection(data)

  res.render(`home`, ejsVarsObj)
});

app.post(`/send`, sendEmail, function(req, res) {
  res.render(`contactSent`, {msg: `Message sent!`})
})

app.get(`/portfolio/:ndx`, function(req, res) {
  const {ndx} = req.params
  const {portfolioItems} = data
  const portfolioMaxNdx = Number(process.env.PORTFOLIO_ITEMS) - 1
  // console.log(portfolioMaxNdx, typeof portfolioMaxNdx)

  const numNdx = Number(ndx)
  // console.log(typeof numNdx, numNdx)
  // if our :ndx is not actually a number, then return 404
  if (Number.isNaN(numNdx)) {
    res.status(404).json({msg: `404. The page was not found.`})
    return
  }
  // if our :ndx is a number, but out of range, return 404
  if (numNdx > portfolioMaxNdx || numNdx < 0) {
    res.status(404).json({msg: `404. The page was not found.`})
    return
  }

  let ejsVarsObj = populatePortfolioSection(data)

  ejsVarsObj[`projectTitle`] = portfolioItems[ndx].projectTitle
  ejsVarsObj[`projectClient`] = portfolioItems[ndx].projectClient
  ejsVarsObj[`projectYear`] = portfolioItems[ndx].projectYear
  ejsVarsObj[`projectDescription`] = portfolioItems[ndx].projectDescription

  res.render(`portfolioItem`, ejsVarsObj)
})

app.get(`/contact-empty`, function(req, res) {
  res.render(`contactError`, {msg: `Not sent! Please, fill out all fields.`})
})

app.get(`/contact-email-error`, function(req, res) {
  res.render(`contactError`, {msg: `Not sent! Invalid email, try again.`})
})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3001;
}

app.listen(port, function() {
  console.log(`Server is running on port ${port}`)
});