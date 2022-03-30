import * as productRepository from "../../../modules/product/repository/product.repository";
import addShoppingCarMutation from "../../../modules/shoppingCar/mutation/addShoppingCar.mutation";
import updateShoppingCarMutation from "../../../modules/shoppingCar/mutation/updateShoppingCar.mutation";
import * as shoppingCarRepository from "../../../modules/shoppingCar/repository/shoppingCar.repository";



describe('update Shopping mutation testing unit', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });


    it('Testing update shoppingCar repository', async () => {
        const outputExpected = {
            code: "1234",
            totalPrice: 309222,
            products: []
        }
        const products = [
            {productId:"623e0b5ae516da5f9df0d6fb",quantity:15},
            {productId:"623dca9be6c1f84b12504865",quantity:10}
            ]
        const id = "623dca9be6c1f84b12504865"
        jest.spyOn(shoppingCarRepository, 'updateShoppingCarRepository').mockReturnValue(true);
        jest.spyOn(shoppingCarRepository, 'getShoppingCarRepository').mockReturnValue(outputExpected);
        jest.spyOn(productRepository, 'getProductRepository').mockReturnValue({price:200});
        const response = await updateShoppingCarMutation.updateShoppingCar({}, { id,products })
        expect(
            response
        ).toEqual(outputExpected);

        expect(shoppingCarRepository.updateShoppingCarRepository).toHaveBeenCalled();
        expect(shoppingCarRepository.getShoppingCarRepository).toHaveBeenCalled();
        expect(productRepository.getProductRepository).toHaveBeenCalled();
    });
})