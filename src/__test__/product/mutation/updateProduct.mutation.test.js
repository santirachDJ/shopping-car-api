
import  * as redisHelper from '../../../bootstrap/redis.bootstrap';
import updateProductMutation from '../../../modules/product/mutation/updateProduct.mutation';
import * as productRepository from '../../../modules/product/repository/product.repository';
describe('update Product mutation testing unit', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });


    it('Testing update product repository', async () => {
        const outputExpected = {
            "_id": "623dca9be6c1f84b12504865",
            "code": "123",
            "name": "prueba",
            "price": 100,
            "category": "TOYS"
        }
        const input = {
            "_id": "623dca9be6c1f84b12504865",
            code: "1234",
            name: "testing Unit",
            price: 309222,
            category: "FOOD"
        }
        jest.spyOn(redisHelper, 'getDataRedis').mockReturnValue(JSON.stringify(outputExpected));
        jest.spyOn(redisHelper, 'deleteRedis').mockReturnValue(true);
        jest.spyOn(productRepository, 'updateProductRepository').mockReturnValue(true);
        jest.spyOn(productRepository, 'getProductRepository').mockReturnValue(outputExpected);
        const response = await updateProductMutation.updateProduct({}, { id:"623dca9be6c1f84b12504865", input })
        expect(
            response
        ).toEqual(true);

        expect(productRepository.updateProductRepository).toHaveBeenCalled();
    });

    it('Testing update product repository no cache redis', async () => {
        const outputExpected = {
            "_id": "623dca9be6c1f84b12504865",
            "code": "123",
            "name": "prueba",
            "price": 100,
            "category": "TOYS"
        }
        const input = {
            "_id": "623dca9be6c1f84b12504865",
            code: "1234",
            name: "testing Unit",
            price: 309222,
            category: "FOOD"
        }
        jest.spyOn(redisHelper, 'getDataRedis').mockReturnValue(null);
        jest.spyOn(productRepository, 'updateProductRepository').mockReturnValue(true);
        jest.spyOn(productRepository, 'getProductRepository').mockReturnValue(outputExpected);
        const response = await updateProductMutation.updateProduct({}, { id:"623dca9be6c1f84b12504865", input })
        expect(
            response
        ).toEqual(true);

        expect(productRepository.updateProductRepository).toHaveBeenCalled();
        expect(redisHelper.getDataRedis).toHaveBeenCalled();
        expect(redisHelper.deleteRedis).not.toHaveBeenCalled();
    });
})