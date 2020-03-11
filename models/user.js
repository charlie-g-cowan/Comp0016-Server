import mongoose from 'mongoose'


const Schema = mongoose.Schema


export default mongoose.model('User', new Schema({
  email: String,
  password: String,
  type: String
}))
