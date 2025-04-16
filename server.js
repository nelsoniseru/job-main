import app from "./index.js"

const port = process.env.PORT ||  3030

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})