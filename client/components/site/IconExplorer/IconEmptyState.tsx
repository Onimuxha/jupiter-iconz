// components/site/IconExplorer/IconEmptyState.tsx

export function IconEmptyState({ query }: { query: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 sm:p-12 text-center">
      <img src="client/assets/nodata.svg" alt="No icons found" className="h-24 w-24 mb-4 opacity-70" />
      <h3 className="text-lg font-medium">No icons found</h3>
      <p className="text-gray-600 dark:text-gray-400">
        {query ? `No icons match "${query}"` : "No icons in this category"}.
      </p>
    </div>
  );
}
