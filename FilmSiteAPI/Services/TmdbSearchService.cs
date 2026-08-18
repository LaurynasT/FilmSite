using FilmSiteAPI.Interfaces;

namespace FilmSiteAPI.Services;
public class TmdbSearchService : TmdbBaseService, ITmdbSearchInterface
{
    public TmdbSearchService(HttpClient httpClient, IConfiguration config)
        : base(httpClient, config)
    {
    }

    public Task<object> SearchMultiAsync(string query)
    {
        var url = $"{BaseUrl}/search/multi?api_key={_apiKey}&language=en-US&query={query}";

        return GetAsync<object>(url);
    }


}

