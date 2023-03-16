import { React, useState,useEffect } from 'react';
// import { GRAPHCMS_URL, GRAPHCMS_PERMANENTAUTH_TOKEN } from '../lib/constants';
import { GraphQLClient, gql } from 'graphql-request';
// import { UserDetail } from '../components/UserDetail';
const client = new GraphQLClient("https://graphql-pokemon2.vercel.app", {
  headers: {
    // Authorization: `Bearer ${GRAPHCMS_PERMANENTAUTH_TOKEN}`,
  },
});

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

export default function GraphQLRequest() {
  const [name, setName] = useState('');
  const [pokemon, setPokemon] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getUserDetailByGraphQLRequestAPICall = async (name) => {
    
    console.log("user detail by api call",name);
    try {
      setIsLoading(true);
      const variables = { name };
      console.log("varaibles",variables);
      const response = await client.request(query, variables);
      console.log('RESPONSE FROM GRAPHQL-REQUEST API CALL', response);
      if (response.pokemon) {
        setPokemon(response.pokemon);
      }else{
        setPokemon({})
      }
    }
    catch (err) {
      console.log('ERROR FROM GRAPHQL-REQUEST API CALL', err);
    }
    finally {
      setIsLoading(false);
    }
  };

  const clickOnSearch = async() => {
    getUserDetailByGraphQLRequestAPICall(name); 
  }
  
  const clickOnName = async(pokemonName) => {

    setName(pokemonName);
    getUserDetailByGraphQLRequestAPICall(pokemonName);
    
  }

  return (
    <div className='flex w-full h-3/4'>
      <div className='flex flex-col justify-evenly rounded-lg shadow-xl w-1/2 p-4 m-4 bg-gray-100'>
        <h2 className="text-center text-black font-medium text-2xl mb-4 self-start ">
          GRAPHQL REQUEST CALL
        </h2>
        <input
          className="border-2 outline-none p-2 rounded-md"
          type="text"
          placeholder="Type name"
          value={name}
          onChange={(e) => { setName(e.target.value); }}
        />
        
        <button
          className="
            flex justify-center
            p-2 rounded-md
          bg-yellow-400  text-white hover:bg-yellow-500 w-1/2 self-center"
          onClick={() => clickOnSearch()}
        >
          {
            isLoading ?
              <div className="mr-2 w-5 h-5 border-l-2 rounded-full animate-spin" /> : null
          }
          <span>
             Search
          </span>
        </button>
       
      </div>
      {
       Object.keys(pokemon).length > 0 ?
       <div className='flex flex-col items-center rounded-lg shadow-xl w-1/2 p-4 m-4 bg-gray-100 text-white'>
          <img src={pokemon.image} alt="" className='mt-4 text-center object-cover h-20 w-20 rounded-full'/>
          <h2 className="font-medium text-2xl mb-4 text-gray-500">
            {pokemon.name}
          </h2>

          <div className="text-gray-500 self-start mt-4"><strong>ID: </strong>{pokemon.id} </div >
          <div className="text-gray-500 self-start font-bold  mt-4"> Resistant </div >
          <div className='self-start mt-2'>
            {pokemon.resistant.map((w) => <span key={w} className="p-1 mr-1 text-gray-100 text-gray-500 rounded bg-red-400"> {w}</span>)}
          </div>

          <div className="text-gray-500 self-start font-bold mt-4"> Weaknesses </div >
          <div className='self-start mt-2'>
            {pokemon.weaknesses.map((w) => <span key={w} className="p-1 mr-1 text-gray-100 text-gray-500 rounded bg-green-400"> {w}</span>)}
          </div>
          {
            pokemon.evolutions ?
            <div className="text-gray-500 self-start font-bold mt-4"> Evolutions </div > : null
          }
          
          {pokemon.evolutions && pokemon.evolutions.map((e) => <div key={e.id} className="self-start">
              <img src={e.image} alt="" className='object-cover h-10 w-10 rounded-full'/>
              <a href="#" className="text-gray-500 text-sm text-center" onClick={() => clickOnName(e.name)}>{e.name}</a>
          </div>)}
        </div>:
        <div className='flex flex-col justify-evenly items-center rounded-lg shadow-xl w-1/2 p-4 m-4 bg-gray-100 text-white'> 
          <span className='text-gray-500'>No result found!</span>
        </div>
      }
      
    </div>
  );
}  