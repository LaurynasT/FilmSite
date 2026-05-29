namespace NetRefreshTokenDemo.Api.Interfaces;

public interface ITmdbPeopleInterface
{
    Task<PeopleDTO> GetPeopleDetailsAsync(int id);
    Task<PeopleShowDTO<PeopleMovieModel>> GetActorMovieCreditsAsync(int id);
    Task<PeopleShowDTO<PeopleTvModel>> GetActorTvCreditsAsync(int id);
}

