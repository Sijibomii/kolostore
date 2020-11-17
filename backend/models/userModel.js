import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)
// function to match password when validating
userSchema.methods.matchPassword= async function(enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password)
}

//function to encrypt new password when a new user registers

userSchema.pre('save', async function(next){
  if (!this.isModified('password')){
    // whrn password is not modified the next() prevents it from running, instead it moves on tho the next middleware
    next()
  }
  // only run when new passwords are saved or old ones modified
  const salt= await bcrypt.genSalt(10)
  this.password= await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User