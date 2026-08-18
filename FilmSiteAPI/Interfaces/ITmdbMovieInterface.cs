using FilmSiteAPI.DTOs;
using FilmSiteAPI.Models;

namespace FilmSiteAPI.Interfaces;

public interface ITmdbMovieInterface
{
    Task<MovieDetailDto> GetMovieDetailAsync(int id);
    Task<TrailerResponseDto> GetMovieTrailerAsync(int id);
    Task<ResponseDTO<PopularMovieDTO>> GetPopularMoviesAsync();
    Task<CreditsResponseDto> GetMovieCreditsAsync(int id);
    Task<ResponseDTO<DiscoverMoviesModel>> GetDiscoverMoviesAsync(
        int page = 1,
        string sortBy = "popularity.desc",
        string genres = "",
        string releaseYear = ""
    );

    Task<ResponseDTO<UpcomingMoviesDTO>> GetUpcomingMoviesAsync();
    Task<ResponseDTO<SimilarMoviesDTO>> GetSimilarMoviesAsync(int id);

    Task<ResponseDTO<MovieReviewDTO>> GetMovieReviewsAsync(int id, int page = 1);
}