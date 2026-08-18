using FilmSiteAPI.DTOs;

namespace FilmSiteAPI.Services;
public interface IWatchlistInterface
{
    Task<List<UserMediaDTO>> GetWatchList(string mediaType);
    Task<UserMediaDTO> AddToWatchList(AddUserMediaDTO addToWatchList);
    Task DeleteFromWatchList(int mediaId, string mediaType);
    Task<bool> CheckWatchList(int mediaId, string mediaType);
}