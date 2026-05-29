namespace NetRefreshTokenDemo.Api.Interfaces;

public interface ITmdbCompanyInterface
{
    Task<CompanyDetailDTO> GetCompanyDetailAsync(int id);
}

