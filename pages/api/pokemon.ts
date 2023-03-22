// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { GraphQLClient, gql } from 'graphql-request';
const client = new GraphQLClient("https://graphql-pokemon2.vercel.app");
import query from '../../db/queryPokemon';
import {Pokemon} from '../../lib/pokemon';

type Response = {
  pokemon: Pokemon
  status:number
  message:string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {

  let name = req.body.name;
  const variables = { name };
  let pokeResponse:Response = await client.request(query, variables);
  pokeResponse.status  = 1;
  pokeResponse.message = "get_success";

  res.status(200).json(pokeResponse)
}