import Image from "next/image";

const PokemonInfoCard = ({ pokemon }: { pokemon: any }) => {
  return (
    <div>
      <h1>{pokemon.name}</h1>
      <Image src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>{pokemon.species.url}</p>
    </div>
  );
};

export default PokemonInfoCard;
