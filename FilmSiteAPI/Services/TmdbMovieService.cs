using Microsoft.AspNetCore.Mvc;
using NetRefreshTokenDemo.Api.Interfaces;
using NetRefreshTokenDemo.Api.Models.DTOs;

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

    public Task<ResponseDTO<PopularMovieModel>> GetPopularMoviesAsync()
    {
        var url = $"{BaseUrl}/movie/popular?api_key={_apiKey}&language=en-US";

        return GetAsync<ResponseDTO<PopularMovieModel>>(url);
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

    public Task<ResponseDTO<UpcomingMoviesModel>> GetUpcomingMoviesAsync()
    {
        var url = $"{BaseUrl}/movie/upcoming?api_key={_apiKey}&language=en-US&page=1";

        return GetAsync<ResponseDTO<UpcomingMoviesModel>>(url);
    }

    public Task<ResponseDTO<SimilarMoviesModel>> GetSimilarMoviesAsync(int id)
    {
        var url = $"{BaseUrl}/movie/{id}/similar?api_key={_apiKey}&language=en-US&page=1";

        return GetAsync<ResponseDTO<SimilarMoviesModel>>(url);
    }

    public Task<ResponseDTO<MovieReviewModel>> GetMovieReviewsAsync(int id, int page = 1)
    {
        var url = $"{BaseUrl}/movie/{id}/reviews?api_key={_apiKey}&language=en-US&page={page}";

        return GetAsync<ResponseDTO<MovieReviewModel>>(url);
    }
}

