using FilmSiteAPI.DTOs;

namespace FilmSiteAPI.Interfaces;

public interface ITmdbGenreInterface
{
    Task<GenreDTO> GetMovieGenresAsync();
    Task<GenreDTO> GetTvGenresAsync();


}