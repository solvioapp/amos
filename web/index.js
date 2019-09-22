require('dotenv').config()
const express = require(`express`)
const fs = require(`fs`)
const http = require(`http`)
const R = require(`ramda`)

/**
 * @description Outputs an array of env variables that begin with `CUSTOM`
 */
const customEnvs = R.filter (R.startsWith (`CUSTOM`)) (R.keys (process.env))
const envVars = R.pick (customEnvs) (process.env)
console.log(`envVars`, envVars)
fs.writeFileSync(`./public/env-config.js`, `window._env_ = ${JSON.stringify(envVars)}`)

const app = express()

app.use(express.static(`public`, {maxAge: `1d`}))

app.use(`*`, (req, res) => {
  fs.createReadStream(`./public/index.html`).pipe(res)
})

const server = http.Server(app)
const port = process.env.PORT || 3000

server.listen(port, () => {
  console.info(`🚀 Server ready at ${port}`)
})
