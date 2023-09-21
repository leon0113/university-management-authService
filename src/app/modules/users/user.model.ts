/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import confiq from '../../../confiq';

const userSchema = new Schema<IUser, UserModel>(
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
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangeAt: {
      type: Date,
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

userSchema.statics.isUserExist = async function (
  id: string,
): Promise<Pick<
  IUser,
  'id' | 'password' | 'needsPasswordChange' | 'role'
> | null> {
  const user = await User.findOne(
    { id },
    { id: 1, password: 1, role: 1, needsPasswordChange: 1 },
  );
  return user;
};

userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string,
): Promise<boolean> {
  const isPasswordMatched = await bcrypt.compare(givenPassword, savedPassword);
  return isPasswordMatched;
};

// pre hook middleware
userSchema.pre('save', async function (next) {
  // hashing user password
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(confiq.bcrypt_salt_rounds),
  );

  if (!user.needsPasswordChange) {
    user.passwordChangeAt = new Date();
  }

  next();
});

// Create a Model.
export const User = model<IUser, UserModel>('User', userSchema);
