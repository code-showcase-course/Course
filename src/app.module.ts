import { Module } from '@nestjs/common';
import { CourseModule } from './course/course.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/course-db'),
    CourseModule,
  ],
})
export class AppModule {}
