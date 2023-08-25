import { Schema, model } from 'mongoose';
import { IStudent, StudentModel } from './student.interface';
import { bloodGroup, gender } from './student.constant';

export const StudentSchema = new Schema<IStudent, StudentModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        middleName: {
          type: String,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: gender,
    },
    bloodGroup: {
      type: String,
      enum: bloodGroup,
    },
    email: {
      type: String,
      // unique: true,
      required: true,
    },
    contactNo: {
      type: String,
      // unique: true,
      required: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    guardian: {
      type: {
        fatherName: {
          type: String,
          required: true,
        },
        fatherOccupation: {
          type: String,
          required: true,
        },
        motherName: {
          type: String,
          required: true,
        },
        motherOccupation: {
          type: String,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
      },
      required: true,
    },
    localGuardian: {
      type: {
        name: {
          type: String,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
        contactNo: {
          type: String,
          required: true,
          // unique: true,
        },
        occupation: {
          type: String,
          required: true,
        },
      },
      required: true,
    },
    profileImage: {
      type: String,
      // required: true
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty', // model name of academic Faculty
      required: true,
    },
    academicSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester', // model name of Academic Semester
      required: true,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment', // model name of Academic Department
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

// student model

export const Student = model<IStudent, StudentModel>('Student', StudentSchema);
