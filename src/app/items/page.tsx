import { ItemClient, NamedAPIResource } from "pokenode-ts";
import Link from "next/link";
import Image from "next/image";

type ItemsPageProps = {
  searchParams: Promise<{ page?: string; q?: string }>;
};

const Items = async ({ searchParams }: ItemsPageProps) => {
  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const limit = 24;
  const offset = (page - 1) * limit;

  const itemClient = new ItemClient();
  const items = await itemClient.listItems(offset, limit);
  const totalCount = items.count || 0;
  const totalPages = Math.ceil(totalCount / limit);

  // Filter by search if provided
  let filteredItems = items.results;
  if (params.q) {
    filteredItems = items.results.filter((item: NamedAPIResource) =>
      item.name.toLowerCase().includes(params.q!.toLowerCase())
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-8">Items</h1>
      
      <form className="w-full max-w-md mb-8" action="/items" method="GET">
        <input
          type="text"
          name="q"
          placeholder="Search items..."
          defaultValue={params.q || ""}
          className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
        />
      </form>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 w-full max-w-6xl">
        {filteredItems.map((item: NamedAPIResource) => (
          <Link
            key={item.name}
            href={`/items/${item.name}`}
            className="flex flex-col items-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            <div className="relative w-16 h-16">
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.name}.png`}
                alt={item.name}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <span className="mt-2 text-sm capitalize text-center">
              {item.name.replace(/-/g, " ")}
            </span>
          </Link>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <p className="text-gray-500">No items found</p>
      )}

      {/* Pagination */}
      {!params.q && totalPages > 1 && (
        <div className="flex gap-2 mt-8">
          {page > 1 && (
            <Link
              href={`/items?page=${page - 1}`}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Previous
            </Link>
          )}
          <span className="px-4 py-2">
            Page {page} of {totalPages}
          </span>
          {page < totalPages && (
            <Link
              href={`/items?page=${page + 1}`}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Next
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Items;
