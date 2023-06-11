// import { Test, TestingModule } from '@nestjs/testing';
// import { CategoryService } from './category.service';
// import { CreateCategoryDto } from './dto/create-category.dto';
// import { Category } from '@prisma/client';

// describe('CategoryService', () => {
//   let service: CategoryService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [CategoryService],
//     }).compile();

//     service = module.get<CategoryService>(CategoryService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });

//   describe('create: ', () => {
//     it('should create with success', async () => {

//       const userId = '44c49bf3-bd75-4b04-9603-977be18a823c';
//       const createCategoryDTO: CreateCategoryDto = {
//         name: 'newCategoryName'
//       };
//       const mockedCategory: Category = {
//         id: 'db13a953-6695-41a6-a423-18107bcad336',
//         name: 'newCategoryName',
//         userId: userId,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       }

//       const createdCategory = await service.createCategory(createCategoryDTO, userId);

//       expect(createdCategory.id).toBe(mockedCategory.id)

//     });
//     it.todo(
//       'should return businessException when category name already exists',
//     );
//   });

//   describe('update: ', () => {
//     it.todo('should update with success');
//     it.todo(
//       'should return businessException when category name already exists',
//     );
//   });

//   describe('delete: ', () => {
//     it.todo('should delete with success');
//     it.todo(
//       'should return businessException when category has existent habits',
//     );
//     it.todo('');
//   });

//   describe('getCategories by userId: ', () => {
//     it.todo('should return categories');
//     it.todo('should empty array when user doesnt has any categories');
//   });
// });
