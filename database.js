const { Pool } = require("pg");
const pool = new Pool({
    connectionString: "postgres://default:HkY1hnd3xaBK@ep-patient-fire-a45t1csw-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require?sslmode=require",
})
pool.connect((err) => {
    if (err) throw err
    console.log("success")
})
module.exports = pool