import { Schema } from 'mongoose';

export const CourseSchema = new Schema({
  subject: { type: String, required: true },
  courseNumber: { type: String, required: true, unique: true },
  description: { type: String, required: true },
});
