namespace NetRefreshTokenDemo.Api.Interfaces;

public interface ITmdbGenreInterface
{
    Task<GenreDTO> GetMovieGenresAsync();
    Task<GenreDTO> GetTvGenresAsync();


}