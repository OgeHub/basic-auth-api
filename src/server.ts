import 'dotenv/config'
import mongoose from 'mongoose'
import app from './app'
import logger from './utils/customLogger'

mongoose
  .connect(`${process.env.MONGODB_URI}`)
  .then(() => logger.info('Database connected successfully'))
  .catch((err) => logger.error(err.message))

const PORT = process.env.PORT || 3030
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
