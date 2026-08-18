using FilmSiteAPI.DTOs;
using FilmSiteAPI.Interfaces;


namespace FilmSiteAPI.Services;
public class TmdbCompanyService : TmdbBaseService, ITmdbCompanyInterface
{
    public TmdbCompanyService(HttpClient httpClient, IConfiguration config)
        : base(httpClient, config)
    {
    }

    public Task<CompanyDetailDTO> GetCompanyDetailAsync(int id)
    {
        var url = $"{BaseUrl}/company/{id}?api_key={_apiKey}&language=en-US";

        return GetAsync<CompanyDetailDTO>(url);
    }

}

