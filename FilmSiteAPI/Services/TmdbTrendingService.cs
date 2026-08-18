using FilmSiteAPI.DTOs;
using FilmSiteAPI.Interfaces;

namespace FilmSiteAPI.Services;
public class TmdbTrendingService : TmdbBaseService, ITmdbTrendingInterface
{
    public TmdbTrendingService(HttpClient httpClient, IConfiguration config)
        : base(httpClient, config)
    {
    }

    public Task<ResponseDTO<TrendingDTO>> GetTrendingAsync(string timeWindow)
    {
        var url = $"{BaseUrl}/trending/all/{timeWindow}?api_key={_apiKey}&language=en-US";

        return GetAsync<ResponseDTO<TrendingDTO>>(url);
    }


}

