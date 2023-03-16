import { React, useState } from 'react';
import { GraphQLClient, gql } from 'graphql-request';
const client = new GraphQLClient("https://graphql-pokemon2.vercel.app");
import query from '../db/queryPokemon';

type  Pokemon = {
    id: number;
    name:string;
    number: string;
    image: string;
    resistant: string[];
    weaknesses: string[];
    evolutions: string[]
}

type Response = {
  pokemon: Pokemon
}

export default function GraphQLRequest({p}:{p:Pokemon}) {
  
  const [name, setName] = useState('');
  const [searched, setSearched] = useState(false);
  const [pokemon, setPokemon] = useState(p);
  const [isLoading, setIsLoading] = useState(false);
  const findPokemonByName = async (name:String) => {
    
    try {
      setIsLoading(true);
      const variables = { name };
      let pokeResponse:Response = await client.request(query, variables);
      setSearched(true);

      if (pokeResponse.pokemon) {
        let pokemon:Pokemon = pokeResponse.pokemon;
        setPokemon(pokemon);
      }else{
        setPokemon(p)
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
    findPokemonByName(name); 
  }
  const onChangedText = async(value:any) => {
    setName(value);
    setSearched(false)
  }
  const clickOnName = async(pokemonName:any) => {

    setName(pokemonName);
    findPokemonByName(pokemonName);
    
  }

  return (
    <div className='flex w-full h-3/4'>
      <div className='flex flex-col justify-evenly rounded-lg shadow-xl w-1/2 p-4 m-4 bg-gray-100'>
        <h2 className="text-center text-black font-medium text-2xl mb-4 self-start ">
          Find pokemon information by name.
        </h2>
        <input
          className="border-2 outline-none p-2 rounded-md"
          type="text"
          placeholder="Type name"
          value={name}
          onChange={(e) => onChangedText(e.target.value)}
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
       pokemon ?
       <div className='flex flex-col items-center rounded-lg shadow-xl w-1/2 p-4 m-4 bg-gray-100 text-white'>
          <img src={pokemon.image} alt="" className='mt-4 text-center object-cover h-20 w-20 rounded-full'/>
          <h2 className="font-medium text-2xl mb-4 text-gray-500">
            {pokemon.name}
          </h2>

          <div className="text-gray-500 self-start mt-4"><strong>ID: </strong>{pokemon.id} </div >
          <div className="text-gray-500 self-start font-bold  mt-4"> Resistant </div >
          <div className='self-start mt-2'>
            {pokemon.resistant.map((w:any) => <span key={w} className="p-1 mr-1 text-gray-100 text-gray-100 rounded bg-red-400"> {w}</span>)}
          </div>

          <div className="text-gray-500 self-start font-bold mt-4"> Weaknesses </div >
          <div className='self-start mt-2'>
            {pokemon.weaknesses.map((w:any) => <span key={w} className="p-1 mr-1 text-gray-100 text-gray-100 rounded bg-green-400"> {w}</span>)}
          </div>
          {
            pokemon.evolutions ?
            <div className="text-gray-500 self-start font-bold mt-4"> Evolutions </div > : null
          }
          
          {pokemon.evolutions && pokemon.evolutions.map((e:any) => <div key={e.id} className="self-start">
              <img src={e.image} alt="" className='object-cover h-10 w-10 rounded-full'/>
              <a href="#" className="text-gray-500 text-sm text-center" onClick={() => clickOnName(e.name)}>{e.name}</a>
          </div>)}
        </div> : name != "" && searched ?
        <div className='flex flex-col justify-evenly items-center rounded-lg shadow-xl w-1/2 p-4 m-4 bg-gray-100 text-white'> 
          <span className='text-gray-500'>No result found!</span>
        </div>: null
      }
      
    </div>
  );
}  