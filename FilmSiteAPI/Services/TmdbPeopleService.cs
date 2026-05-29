using Microsoft.AspNetCore.Identity;
using NetRefreshTokenDemo.Api.Interfaces;

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
    public Task<PeopleShowDTO<PeopleMovieModel>> GetActorMovieCreditsAsync(int Id)
    {
        var url = $"{BaseUrl}/person/{Id}/movie_credits?api_key={_apiKey}&language=en-US";

        return GetAsync<PeopleShowDTO<PeopleMovieModel>>(url);
    }
    public Task<PeopleShowDTO<PeopleTvModel>> GetActorTvCreditsAsync(int Id)
    {
        var url = $"{BaseUrl}/person/{Id}/tv_credits?api_key={_apiKey}&language=en-US";

        return GetAsync<PeopleShowDTO<PeopleTvModel>>(url);
    }


}

