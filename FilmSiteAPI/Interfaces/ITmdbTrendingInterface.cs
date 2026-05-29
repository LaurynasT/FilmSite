using NetRefreshTokenDemo.Api.Models.DTOs;

namespace NetRefreshTokenDemo.Api.Interfaces;

public interface ITmdbTrendingInterface
{

    Task<ResponseDTO<TrendingModel>> GetTrendingAsync(string timeWindow);
   

}