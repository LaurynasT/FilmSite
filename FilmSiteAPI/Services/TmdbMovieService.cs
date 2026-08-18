using FilmSiteAPI.DTOs;
using FilmSiteAPI.Interfaces;
using FilmSiteAPI.Models;

namespace FilmSiteAPI.Services;
public class TmdbMovieService : TmdbBaseService, ITmdbMovieInterface
{
    public TmdbMovieService(HttpClient httpClient, IConfiguration config)
        : base(httpClient, config)
    {
    }

    public Task<MovieDetailDto> GetMovieDetailAsync(int id)
    {
        var url = $"{BaseUrl}/movie/{id}?api_key={_apiKey}&language=en-US";

        return GetAsync<MovieDetailDto>(url);
    }

    public async Task<TrailerResponseDto> GetMovieTrailerAsync(int id)
    {
        var url = $"{BaseUrl}/movie/{id}/videos?api_key={_apiKey}&language=en-US";

        return await GetAsync<TrailerResponseDto>(url);
    }

    public Task<ResponseDTO<PopularMovieDTO>> GetPopularMoviesAsync()
    {
        var url = $"{BaseUrl}/movie/popular?api_key={_apiKey}&language=en-US";

        return GetAsync<ResponseDTO<PopularMovieDTO>>(url);
    }

    public Task<CreditsResponseDto> GetMovieCreditsAsync(int id)
    {
        var url = $"{BaseUrl}/movie/{id}/credits?api_key={_apiKey}&language=en-US";

        return GetAsync<CreditsResponseDto>(url);
    }

    public Task<ResponseDTO<DiscoverMoviesModel>> GetDiscoverMoviesAsync(
     int page,
     string sortBy,
     string genres,
     string releaseYear)
    {
        var url = $"{BaseUrl}/discover/movie" +
                  $"?api_key={_apiKey}" +
                  $"&language=en-US" +
                  $"&sort_by={sortBy}" +
                  $"&include_adult=false" +
                  $"&include_video=false" +
                  $"&page={page}" +
                  $"&with_genres={genres}" +
                  $"&primary_release_year={releaseYear}" +
                  $"&with_watch_monetization_types=flatrate";

        return GetAsync<ResponseDTO<DiscoverMoviesModel>>(url);
    }

    public Task<ResponseDTO<UpcomingMoviesDTO>> GetUpcomingMoviesAsync()
    {
        var url = $"{BaseUrl}/movie/upcoming?api_key={_apiKey}&language=en-US&page=1";

        return GetAsync<ResponseDTO<UpcomingMoviesDTO>>(url);
    }

    public Task<ResponseDTO<SimilarMoviesDTO>> GetSimilarMoviesAsync(int id)
    {
        var url = $"{BaseUrl}/movie/{id}/similar?api_key={_apiKey}&language=en-US&page=1";

        return GetAsync<ResponseDTO<SimilarMoviesDTO>>(url);
    }

    public Task<ResponseDTO<MovieReviewDTO>> GetMovieReviewsAsync(int id, int page = 1)
    {
        var url = $"{BaseUrl}/movie/{id}/reviews?api_key={_apiKey}&language=en-US&page={page}";

        return GetAsync<ResponseDTO<MovieReviewDTO>>(url);
    }
}

