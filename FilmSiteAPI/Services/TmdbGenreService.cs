using FilmSiteAPI.DTOs;
using FilmSiteAPI.Interfaces;
using FilmSiteAPI.Services;

namespace FilmSiteAPI.Services;
public class TmdbGenreService : TmdbBaseService, ITmdbGenreInterface
{
    public TmdbGenreService(HttpClient httpClient, IConfiguration config)
        : base(httpClient, config)
    {
    }

    public Task<GenreDTO> GetMovieGenresAsync()
    {
        var url = $"{BaseUrl}/genre/movie/list?api_key={_apiKey}&language=en-US";

        return GetAsync<GenreDTO>(url);
    }
    public Task<GenreDTO> GetTvGenresAsync()
    {
        var url = $"{BaseUrl}/genre/tv/list?api_key={_apiKey}&language=en-US";

        return GetAsync<GenreDTO>(url);
    }

}

