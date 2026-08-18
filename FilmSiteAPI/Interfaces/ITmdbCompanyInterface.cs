using FilmSiteAPI.DTOs;

namespace FilmSiteAPI.Interfaces;

public interface ITmdbCompanyInterface
{
    Task<CompanyDetailDTO> GetCompanyDetailAsync(int id);
}

