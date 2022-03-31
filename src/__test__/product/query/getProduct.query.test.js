
import { makeExecutableSchema } from '@graphql-tools/schema'
import { addMocksToSchema } from '@graphql-tools/mock'
import { graphql } from 'graphql'
import productTypeDef from '../../../modules/product/typeDef/product.typeDef';
import getProductQuery from '../../../modules/product/query/getProduct.query';
import  * as redisHelper from '../../../bootstrap/redis.bootstrap';
import * as productRepository  from '../../../modules/product/repository/product.repository';

describe('get Product testing unit', () => {
    
    afterEach(() => {
        jest.clearAllMocks();
      });

    it('test graphql schema variables', async () => {
        const schema = makeExecutableSchema({ typeDefs: productTypeDef });
        const schemaWithMocks = addMocksToSchema({ schema });
        const query = 
        `
            query {
                getProduct(id: "623e0b69e516da5f9df0d6fd") {
                    code
                    name
                }
            }
        `;
        const response = await graphql(schemaWithMocks, query)
        expect(response.data.getProduct).toBeDefined();
    }) 

    it('Testing get product in redis', async() => {
        const outputExpected ={
            name:"helooooo",
            code:"623e0b69e516da5f9df0d6fd"
        }
        jest.spyOn(redisHelper, 'getDataRedis').mockReturnValue(JSON.stringify(outputExpected));
        jest.spyOn(redisHelper, 'setRedis').mockReturnValue(jest.fn());
        jest.spyOn(productRepository, 'getProductRepository').mockReturnValue(outputExpected);
        const response = await getProductQuery.getProduct({},{id:"'623e0b69e516da5f9df0d6fd'"})
        expect(
            response
        ).toEqual(outputExpected);
    
        expect(redisHelper.getDataRedis).toHaveBeenCalledTimes(1); 
      });

    it('Test get product mongoodb', async()=>{
        const outputExpected ={
            name:"helooooo",
            code:"623e0b69e516da5f9df0d6fd"
        }
        jest.spyOn(redisHelper, 'getDataRedis').mockReturnValue(null);
        jest.spyOn(redisHelper, 'setRedis').mockReturnValue(null);
        jest.spyOn(productRepository, 'getProductRepository').mockReturnValue(outputExpected);

        const response = await getProductQuery.getProduct({},{id:"'623e0b69e516da5f9df0d6fd'"})
        expect(
            response
        ).toEqual(outputExpected);
    
        expect(redisHelper.getDataRedis).toHaveBeenCalled();
        expect(productRepository.getProductRepository).toHaveBeenCalled();
    })

});