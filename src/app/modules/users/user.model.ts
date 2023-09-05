/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { IUser, IUserMethods, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import confiq from '../../../confiq';

const userSchema = new Schema<IUser, Record<string, never>, IUserMethods>(
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

// custom instance method to check user exists or not
userSchema.methods.isUserExist = async function (
  id: string,
): Promise<Partial<IUser> | null> {
  const user = await User.findOne(
    { id },
    { id: 1, password: 1, role: 1, needsPasswordChange: 1 },
  );
  return user;
};

// custom instance method to match hashed password with given password
userSchema.methods.isPasswordMatched = async function (
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
  next();
});

// Create a Model.
export const User = model<IUser, UserModel>('User', userSchema);
