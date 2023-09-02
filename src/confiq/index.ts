import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  default_student_password: process.env.DEFAULT_STUDENT_PASSWARD,
  default_faculty_password: process.env.DEFAULT_FACULTY_PASSWARD,
  default_admin_password: process.env.DEFAULT_ADMIN_PASSWARD,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
};
