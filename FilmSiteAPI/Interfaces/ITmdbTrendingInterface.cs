using FilmSiteAPI.DTOs;
using FilmSiteAPI.Models;


namespace FilmSiteAPI.Interfaces;

public interface ITmdbTrendingInterface
{

    Task<ResponseDTO<TrendingDTO>> GetTrendingAsync(string timeWindow);
   

}