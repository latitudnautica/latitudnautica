
const db = {
    data:
        [
            { name: ' VHF' },
            { name: ' Raymarin' }
        ]
}





export default (req, res) => {
    const {
        query: { category },
    } = req

    let data = db.query
    console.log(query)

    res.statusCode = 200
    res.json(db)
}