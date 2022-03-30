import addShoppingCarMutation from "../../../modules/shoppingCar/mutation/addShoppingCar.mutation";
import * as shoppingCarRepository from "../../../modules/shoppingCar/repository/shoppingCar.repository";



describe('add Shopping mutation testing unit', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });


    it('Testing add shoppingCar repository', async () => {
        const outputExpected = {
            code: "1234",
            totalPrice: 309222,
            products: []
        }
        const input = {
            code: "1234",
            totalPrice: 309222,
            products: []
        }
        jest.spyOn(shoppingCarRepository, 'addShoppingCarRepository').mockReturnValue(outputExpected);
        const response = await addShoppingCarMutation.addShoppingCar({}, { input })
        expect(
            response
        ).toEqual(outputExpected);

        expect(shoppingCarRepository.addShoppingCarRepository).toHaveBeenCalled();
    });
})