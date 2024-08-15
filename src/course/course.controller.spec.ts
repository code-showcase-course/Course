import { Test, TestingModule } from '@nestjs/testing';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';

describe('CourseController', () => {
  let controller: CourseController;
  let service: CourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseController],
      providers: [
        {
          provide: CourseService,
          useValue: {
            createCourse: jest.fn(),
            findCoursesByDescription: jest.fn(),
            deleteCourse: jest.fn(),
            updateCourse: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CourseController>(CourseController);
    service = module.get<CourseService>(CourseService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a course', async () => {
      const createCourseDto: CreateCourseDto = {
        subject: 'BIO',
        courseNumber: '101',
        description: 'Introduction to Biology',
      };
      const createdCourse = { createCourseDto, id: String };
      jest
        .spyOn(service, 'createCourse')
        .mockResolvedValue(createdCourse as any);
      expect(await controller.create(createCourseDto)).toEqual(createdCourse);
    });
  });

  describe('find', () => {
    it('should return courses by description', async () => {
      const course = {
        subject: 'BIO',
        courseNumber: '101',
        description: 'Introduction to Biology',
      };
      jest
        .spyOn(service, 'findCoursesByDescription')
        .mockResolvedValue([course as any]);

      expect(await controller.find('Biology')).toEqual([course]);
    });
  });

  describe('remove', () => {
    it('should return true if course is deleted', async () => {
      jest.spyOn(service, 'deleteCourse').mockResolvedValue(true);

      expect(await controller.remove('1')).toBe(true);
    });

    it('should throw an error if course is not found', async () => {
      jest
        .spyOn(service, 'deleteCourse')
        .mockRejectedValue(new Error('Course not found'));

      await expect(controller.remove('1')).rejects.toThrow('Course not found');
    });
  });
});
