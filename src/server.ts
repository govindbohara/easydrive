import app from './app'
import { connectToDatabase } from './utils/connect-to-database'

const PORT = process.env.PORT ?? 4000

const main = async () => {
	await connectToDatabase()
	app.listen(PORT, async () => {
		console.log(`Server listening on port ${PORT}`)
	})
}
main().catch(error => {
	console.log(error.message)
	process.exit(1)
})
