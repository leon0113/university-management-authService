/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import confiq from '../../../confiq';

const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    }, // To add createdAt and updatedAt fields to the schema
  },
);

// pre hook middleware
userSchema.pre('save', async function (next) {
  // hashing user password
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(confiq.bcrypt_salt_rounds),
  );
  next();
});

// Create a Model.
export const User = model<IUser, UserModel>('User', userSchema);
