using FilmSiteAPI.DTOs;
using FilmSiteAPI.Interfaces;
using FilmSiteAPI.Models;

namespace FilmSiteAPI.Services;
public class TmdbTvService : TmdbBaseService, ITmdbTvInterface
{
    public TmdbTvService(HttpClient httpClient, IConfiguration config)
        : base(httpClient, config)
    {
    }

    public Task<TvDetailDto> GetTvDetailAsync(int id)
    {
        var url = $"{BaseUrl}/tv/{id}?api_key={_apiKey}&language=en-US";

        return GetAsync<TvDetailDto>(url);
    }

    public async Task<TrailerResponseDto> GetTvTrailerAsync(int id)
    {
        var url = $"{BaseUrl}/tv/{id}/videos?api_key={_apiKey}&language=en-US";

        return await GetAsync<TrailerResponseDto>(url);
    }

    public Task<ResponseDTO<PopularTvDTO>> GetPopularTvAsync()
    {
        var url = $"{BaseUrl}/tv/popular?api_key={_apiKey}&language=en-US";

        return GetAsync<ResponseDTO<PopularTvDTO>>(url);
    }

    public Task<CreditsResponseDto> GetTvCreditsAsync(int id)
    {
        var url = $"{BaseUrl}/tv/{id}/credits?api_key={_apiKey}&language=en-US";

        return GetAsync<CreditsResponseDto>(url);
    }
    public Task<ResponseDTO<DiscoverTvDTO>> GetDiscoverTvAsync(
    int page,
    string sortBy,
    string genres,
    int? firstAirYear)
    {
        var url = $"{BaseUrl}/discover/tv" +
                  $"?api_key={_apiKey}" +
                  $"&language=en-US" +
                  $"&sort_by={sortBy}" +
                  $"&include_adult=false" +
                  $"&include_video=false" +
                  $"&page={page}" +
                  $"&with_genres={genres}" +
                  $"&primary_release_year={firstAirYear}" +
                  $"&with_watch_monetization_types=flatrate";

        return GetAsync<ResponseDTO<DiscoverTvDTO>>(url);
    }

    public Task<TvSeasonDTO> GetTvSeasonDetailAsync( int id, int seasonNumber)
    {
        var url = $"{BaseUrl}/tv/{id}/season/{seasonNumber}?api_key={_apiKey}&language=en-US";

        return GetAsync<TvSeasonDTO>(url);
    }

    public Task<ResponseDTO<SimilarTvDTO>> GetSimilarTvAsync(int id)
    {
        var url = $"{BaseUrl}/tv/{id}/similar?api_key={_apiKey}&language=en-US&page=1";

        return GetAsync<ResponseDTO<SimilarTvDTO>>(url);
    }
}

