import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty, Matches } from 'class-validator';
import { CreateCourseDto } from './create-course.dto';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsString()
  subject: string;

  @IsString()
  @Matches(/^\d{3}$/, {
    message: 'courseNumber must be a three-digit, zero-padded integer',
  })
  courseNumber: string;

  @IsString()
  description: string;
}
