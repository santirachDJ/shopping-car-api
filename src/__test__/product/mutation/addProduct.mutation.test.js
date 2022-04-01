
import addProductMutation from '../../../modules/product/mutation/addProduct.mutation';
import * as productRepository from '../../../modules/product/repository/product.repository';
describe('add Product mutation testing unit', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });


    it('Testing add product repository', async () => {
        const outputExpected = {
            "_id": "623dca9be6c1f84b12504865",
            "code": "123",
            "name": "prueba",
            "price": 100,
            "category": "TOYS"
        }
        const input = {
            code: "1234",
            name: "testing Unit",
            price: 309222,
            category: "FOOD"
        }
        jest.spyOn(productRepository, 'addProductRepository').mockReturnValue(outputExpected);
        const response = await addProductMutation.addProduct({}, { input })
        expect(
            response
        ).toEqual(outputExpected);

        expect(productRepository.addProductRepository).toHaveBeenCalled();
    });
})