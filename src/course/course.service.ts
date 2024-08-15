import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCourseDto } from './dto/create-course.dto';
import { Course } from './course.model';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel('Course') private readonly courseModel: Model<Course>,
  ) {}

  async createCourse(createCourseDto: CreateCourseDto): Promise<Course> {
    const { subject, courseNumber } = createCourseDto;

    const existingCourseSubject = await this.courseModel.findOne({
      subject,
    });
    const existingCourseNumber = await this.courseModel.findOne({
      courseNumber,
    });
    if (!courseNumber.match(/^\d{3}$/)) {
      throw new ConflictException(
        'Course number must be a three-digit, zero-padded integer',
      );
    }
    if (existingCourseSubject) {
      throw new ConflictException('Course with this subject already exists.');
    }
    if (existingCourseNumber) {
      throw new ConflictException('Course with this number already exists.');
    }

    const course = new this.courseModel(createCourseDto);
    return course.save();
  }

  async findAll(description?: string): Promise<Course[]> {
    if (description) {
      const q = '%' + description + '%';
      return this.courseModel
        .find({ description: new RegExp(description, 'i') })
        .exec();
    }
    return this.courseModel.find().exec();
  }

  async findOne(id: string): Promise<Course> {
    const course = await this.courseModel.findById(id).exec();
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return course;
  }

  async findCoursesByDescription(description: string): Promise<Course[]> {
    return await this.courseModel
      .find({ description: new RegExp(description, 'i') })
      .exec();
  }

  async deleteCourse(id: string): Promise<boolean> {
    const result = await this.courseModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Course not found');
    }
    return true;
  }
}
