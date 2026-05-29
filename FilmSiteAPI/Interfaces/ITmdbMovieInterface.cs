using NetRefreshTokenDemo.Api.Models.DTOs;

namespace NetRefreshTokenDemo.Api.Interfaces;

public interface ITmdbMovieInterface
{
    Task<MovieDetailDto> GetMovieDetailAsync(int id);
    Task<TrailerResponseDto> GetMovieTrailerAsync(int id);
    Task<ResponseDTO<PopularMovieModel>> GetPopularMoviesAsync();
    Task<CreditsResponseDto> GetMovieCreditsAsync(int id);
    Task<ResponseDTO<DiscoverMoviesModel>> GetDiscoverMoviesAsync(
        int page = 1,
        string sortBy = "popularity.desc",
        string genres = "",
        string releaseYear = ""
    );

    Task<ResponseDTO<UpcomingMoviesModel>> GetUpcomingMoviesAsync();
    Task<ResponseDTO<SimilarMoviesModel>> GetSimilarMoviesAsync(int id);

    Task<ResponseDTO<MovieReviewModel>> GetMovieReviewsAsync(int id, int page = 1);
}