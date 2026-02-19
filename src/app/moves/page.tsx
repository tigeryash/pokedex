import { MoveClient, NamedAPIResource } from "pokenode-ts";

type MovesPageProps = {
  searchParams: Promise<{ page?: string; q?: string; type?: string }>;
};

const Moves = async ({ searchParams }: MovesPageProps) => {
  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const limit = 24;
  const offset = (page - 1) * limit;

  const moveClient = new MoveClient();
  const moves = await moveClient.listMoves(offset, limit);
  const totalCount = moves.count || 0;
  const totalPages = Math.ceil(totalCount / limit);

  // Filter by search if provided
  let filteredMoves = moves.results;
  if (params.q) {
    filteredMoves = moves.results.filter((move: NamedAPIResource) =>
      move.name.toLowerCase().includes(params.q!.toLowerCase())
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-8">Moves</h1>
      
      <form className="w-full max-w-md mb-8" action="/moves" method="GET">
        <input
          type="text"
          name="q"
          placeholder="Search moves..."
          defaultValue={params.q || ""}
          className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
        />
      </form>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 w-full max-w-6xl">
        {filteredMoves.map((move: NamedAPIResource) => (
          <div
            key={move.name}
            className="flex flex-col items-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition cursor-pointer"
          >
            <span className="text-sm capitalize text-center">
              {move.name.replace(/-/g, " ")}
            </span>
          </div>
        ))}
      </div>

      {filteredMoves.length === 0 && (
        <p className="text-gray-500">No moves found</p>
      )}

      {/* Pagination */}
      {!params.q && totalPages > 1 && (
        <div className="flex gap-2 mt-8">
          {page > 1 && (
            <a
              href={`/moves?page=${page - 1}`}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Previous
            </a>
          )}
          <span className="px-4 py-2">
            Page {page} of {totalPages}
          </span>
          {page < totalPages && (
            <a
              href={`/moves?page=${page + 1}`}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Next
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default Moves;
