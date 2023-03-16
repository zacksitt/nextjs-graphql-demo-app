import { GraphQLClient, gql } from 'graphql-request';

const query = gql
  `query pokemon($name: String){
    pokemon(name: $name){
      id
      number
      name
      weight{
        minimum
        maximum
      }
      height{
        minimum
        maximum
      }
      evolutions{
        id
        name
        image
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
    }
  }`;
export default query;