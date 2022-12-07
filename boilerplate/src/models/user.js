const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    userId: {
      type: String,
      unique: true,
      required: [true, 'please fill userId']
    },
    email: { 
      type: String,
      unique: true,
      required: [true, 'please fill email']
    },
    number: { 
      type: String,
      unique: true,
      required: [true, 'please fill number']
    },
    name: {
     type: String,
     required: [true, 'please fill Name']
    },
  },
  { timestamps: true },
);

UserSchema.plugin(mongoosePaginate);
const User = mongoose.model('User', UserSchema);
module.exports = User;
