
const Hero = ({ lang, onDownload, loading }) => {
  const [inputUrl, setInputUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputUrl.trim()) {
      onDownload(inputUrl.trim());
    }
  };

  return (
    <>

      <Helmet>
        <title>{lang.hero.title} | VidLink</title>
        <meta name="description" content={lang.hero.subtitle} />
      </Helmet>
    <section className="py-24 bg-gradient-to-br from-green-500 via-green-600 to-green-700 text-white">
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg">
          {lang.hero.title}
        </h1>
        <p className="text-xl mb-12 max-w-xl mx-auto drop-shadow-md">
          {lang.hero.subtitle}
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex max-w-xl mx-auto shadow-lg rounded-full overflow-hidden border border-green-700"
        >
          <input
            type="url"
            placeholder={lang.hero.placeholder}
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            className="flex-grow px-6 py-4 text-lg rounded-none bg-white text-green-900 placeholder-green-600 focus:outline-none focus:ring-4 focus:ring-green-400"
            required
            disabled={loading}
            aria-label="Video URL input"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-white text-green-700 font-bold px-8 py-4 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
            aria-live="polite"
            aria-busy={loading}
          >
            {loading ? (
              <svg
                className="animate-spin h-6 w-6 text-green-600"
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
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            ) : (
              lang.hero.button
            )}
          </button>
        </form>
      </div>
      </section>
    </>
  );
};
