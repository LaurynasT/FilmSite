using FilmSiteAPI.DTOs;
using FilmSiteAPI.Models;

namespace FilmSiteAPI.Interfaces;

public interface ITmdbPeopleInterface
{
    Task<PeopleDTO> GetPeopleDetailsAsync(int id);
    Task<PeopleShowDTO<PeopleMovieDTO>> GetActorMovieCreditsAsync(int id);
    Task<PeopleShowDTO<PeopleTvDTO>> GetActorTvCreditsAsync(int id);
}

