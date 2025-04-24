import { Schema, Types, model, type Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  sex: 'Male' | 'Female'; // ✅ added this for more fun 
  thoughts: Types.ObjectId[];
  friends: Types.ObjectId[];
  friendCount?: number;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    sex: {
      type: String,
      enum: ['Male', 'Female'],
      required: true // or make optional if needed
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// 🔢 Virtual: friendCount
userSchema.virtual('friendCount').get(function (this: IUser) {
  return this.friends.length;
});

const User = model<IUser>('User', userSchema);

export default User;
