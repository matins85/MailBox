export default function Loading() {
  return (
    <>
      <div className="flex h-screen">
        <div className="m-auto">
          <button
            type="button"
            className="inline-flex cursor-not-allowed items-center rounded-md bg-primary px-4 py-2 text-sm font-semibold leading-6 text-primary-foreground shadow transition duration-150 ease-in-out"
            disabled={true}
          >
            <svg
              className="-ml-1 mr-3 h-5 w-5 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Loading...
          </button>
        </div>
      </div>
    </>
  );
}
