using FilmSiteAPI.DTOs;
using FilmSiteAPI.Interfaces;
using FilmSiteAPI.Models;

namespace FilmSiteAPI.Services;
public class TmdbPeopleService : TmdbBaseService, ITmdbPeopleInterface
{
    public TmdbPeopleService(HttpClient httpClient, IConfiguration config)
        : base(httpClient, config)
    {
    }

    public Task<PeopleDTO> GetPeopleDetailsAsync(int Id)
    {
        var url = $"{BaseUrl}/person/{Id}?api_key={_apiKey}&language=en-US";

        return GetAsync<PeopleDTO>(url);
    }
    public Task<PeopleShowDTO<PeopleMovieDTO>> GetActorMovieCreditsAsync(int Id)
    {
        var url = $"{BaseUrl}/person/{Id}/movie_credits?api_key={_apiKey}&language=en-US";

        return GetAsync<PeopleShowDTO<PeopleMovieDTO>>(url);
    }
    public Task<PeopleShowDTO<PeopleTvDTO>> GetActorTvCreditsAsync(int Id)
    {
        var url = $"{BaseUrl}/person/{Id}/tv_credits?api_key={_apiKey}&language=en-US";

        return GetAsync<PeopleShowDTO<PeopleTvDTO>>(url);
    }


}

