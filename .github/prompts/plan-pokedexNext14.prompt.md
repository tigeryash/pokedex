## 1) Finish filter system (type/region/options) with URL as source of truth
Update:
- [src/components/header/tags.tsx](src/components/header/tags.tsx) (`[`Tags`](src/components/header/tags.tsx)`)
- [src/components/pokemonlist/pokemon-list.tsx](src/components/pokemonlist/pokemon-list.tsx) (`[`PokemonList`](src/components/pokemonlist/pokemon-list.tsx)`)
- [src/app/actions.tsx](src/app/actions.tsx) (`[`fetchPokemon`](src/app/actions.tsx)`, [`fetchPokemonByTag`](src/app/actions.tsx)`)
- [src/lib/constants.ts](src/lib/constants.ts) (region mapping source)

Implement:
- Parse `types`, `regions`, `options` from search params.
- Add one filtered fetch path (instead of current unfiltered infinite list).
- Make region filtering explicit via ID ranges per region.
- Keep infinite scroll only for current filter query.

## 2) Stop filters from pushing cards down (layout fix)
Update:
- [src/components/header/header.tsx](src/components/header/header.tsx)
- [src/components/header/tags.tsx](src/components/header/tags.tsx)
- [src/stores/pokemonstore.tsx](src/stores/pokemonstore.tsx) (`[`usePokemonStore`](src/stores/pokemonstore.tsx)`)

Implement:
- Render tags panel as overlay/absolute below sticky header.
- Reserve fixed vertical space once (or none, if overlay desired), not dynamic expansion in normal flow.
- Keep list offset controlled only by sticky state in [src/components/pokemonlist/pokemon-list.tsx](src/components/pokemonlist/pokemon-list.tsx).

## 3) Migrate AI chat to current SDK pattern + newer model
Update:
- [src/app/actions.tsx](src/app/actions.tsx) (`[`continueConversation`](src/app/actions.tsx)`)
- [src/components/chat/chat.tsx](src/components/chat/chat.tsx)
- [src/components/chat/chat-input.tsx](src/components/chat/chat-input.tsx)

Implement:
- Move from RSC-centric state pattern to API route + `useChat` flow (current stable direction).
- Keep tool calling for Pokémon lookup.
- Switch model from `gpt-4o` to modern model (example: `gpt-4.1` or `gpt-4.1-mini` for cost/perf balance).

## 4) Complete Pokémon detail page
Update:
- [src/app/[pokemonId]/page.tsx](src/app/[pokemonId]/page.tsx) (`[`PokemonDetails`](src/app/[pokemonId]/page.tsx)`)
- [src/components/pokemoninfo/main-info.tsx](src/components/pokemoninfo/main-info.tsx)
- [src/components/pokemoninfo/abilties.tsx](src/components/pokemoninfo/abilties.tsx)
- [src/components/pokemoninfo/moves.tsx](src/components/pokemoninfo/moves.tsx)

Implement:
- Pass fetched `Pokemon` + `Species` data into these components.
- Remove temporary placeholders.
- Do not import moves page component into detail page; keep domain components separate.

## 5) Implement real Items and Moves pages
Update:
- [src/app/items/page.tsx](src/app/items/page.tsx)
- [src/app/moves/page.tsx](src/app/moves/page.tsx)

Implement:
- Server-side paginated lists using `pokenode-ts` clients.
- Search + basic filters.
- Reuse card/list patterns from Pokémon list.

## 6) File structure cleanup (recommended)
Create app domains:
- `src/features/pokemon/*`
- `src/features/moves/*`
- `src/features/items/*`
- `src/features/chat/*`
- `src/shared/ui/*` (keep current UI primitives)

If needed, a concrete patch can be generated starting with filter + layout (highest impact first).
