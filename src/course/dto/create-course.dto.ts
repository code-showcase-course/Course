import { IsNotEmpty, IsString, Matches } from 'class-validator';
export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  subject: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{3}$/, {
    message: 'courseNumber must be a three-digit, zero-padded integer',
  })
  courseNumber: string;

  @IsString()
  description: string;
}
