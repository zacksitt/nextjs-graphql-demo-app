export interface Pokemon {
    id: number;
    name:string;
    number?: string;
    weight:{
      minimum:string,
      maximum:string
    },
    height:{
      minimum:string,
      maximum:string
    },
    classification?:string,
    types:string[],
    fleeRate?:number,
    maxCP?:string,
    maxHP?:string,
    image?: string;
    resistant: string[];
    weaknesses: string[];
    evolutions: string[]
}