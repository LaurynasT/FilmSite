using NetRefreshTokenDemo.Api.Interfaces;

public class TmdbTrendingService : TmdbBaseService, ITmdbTrendingInterface
{
    public TmdbTrendingService(HttpClient httpClient, IConfiguration config)
        : base(httpClient, config)
    {
    }

    public Task<ResponseDTO<TrendingModel>> GetTrendingAsync(string timeWindow)
    {
        var url = $"{BaseUrl}/trending/all/{timeWindow}?api_key={_apiKey}&language=en-US";

        return GetAsync<ResponseDTO<TrendingModel>>(url);
    }


}

