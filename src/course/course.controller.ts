import { Controller, Post, Get, Delete, Body, Query } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { Course } from './course.model';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post('create')
  async create(@Body() createCourseDto: CreateCourseDto): Promise<Course> {
    return this.courseService.createCourse(createCourseDto);
  }

  @Get('description')
  async find(@Query('description') description: string): Promise<Course[]> {
    return this.courseService.findCoursesByDescription(description);
  }

  @Get('id')
  async findOne(@Query('id') id: string): Promise<Course> {
    return this.courseService.findOne(id);
  }

  @Get()
  async findAll(@Query('description') description?: string): Promise<Course[]> {
    return this.courseService.findAll(description);
  }

  @Delete(':id')
  async remove(@Query('id') id: string): Promise<boolean> {
    return this.courseService.deleteCourse(id);
  }
}
