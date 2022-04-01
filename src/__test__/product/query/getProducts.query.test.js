
import { makeExecutableSchema } from '@graphql-tools/schema'
import { addMocksToSchema } from '@graphql-tools/mock'
import { graphql } from 'graphql'
import productTypeDef from '../../../modules/product/typeDef/product.typeDef';
import * as productRepository  from '../../../modules/product/repository/product.repository';
import getProductsQuery from '../../../modules/product/query/getProducts.query';

describe('get Products testing unit', () => {
    
    afterEach(() => {
        jest.clearAllMocks();
      });

      it('test graphql schema variables', async () => {
        const schema = makeExecutableSchema({ typeDefs: productTypeDef });
        const schemaWithMocks = addMocksToSchema({ schema });
        const query = 
        `
            query {
                getProducts(search:{name:"BAIROn",code:"*23*",sort:"code"}) {
                    category,
                    name,
                    code,
                    price
                  } 
            }
        `;
        const response = await graphql(schemaWithMocks, query)
        expect(response.data.getProducts).toBeDefined();
    })  

    it('Testing get products', async() => {
        const outputExpected = [
            [
                {
                  "category": "FOOD",
                  "name": "BAIRON",
                  "code": "123456789",
                  "price": 20500000
                }
              ]
        ]
        jest.spyOn(productRepository, 'getProductsRepository').mockReturnValue(outputExpected);
        const response = await getProductsQuery.getProducts({},{search:{name:"BAIROn",code:"*23*",sort:"code"},pagination:{ limit: 25, offset: 0 }})
        expect(
            response
        ).toEqual(outputExpected);
    
        expect(productRepository.getProductsRepository).toHaveBeenCalledTimes(1); 
      });


    it('Testing get products empty', async() => {
        const outputExpected = []
        jest.spyOn(productRepository, 'getProductsRepository').mockReturnValue(outputExpected);
        const response = await getProductsQuery.getProducts({},{search:{name:"BAIROn",code:"*23*",sort:"code"},pagination:{ limit: 25, offset: 0 }})
        expect(
            response
        ).toEqual(outputExpected);
        expect(response).toHaveLength(0)    
        expect(productRepository.getProductsRepository).toHaveBeenCalledTimes(1); 
      });

});