using FilmSiteAPI.DTOs;

namespace FilmSiteAPI.Interfaces;
public interface IFavoritesInterface
{
    Task<List<UserMediaDTO>> GetFavorites(string mediaType);
    Task<UserMediaDTO> AddFavorite(AddUserMediaDTO addFavorite);
    Task DeleteFavorite(int mediaId, string mediaType);
    Task<bool> CheckFavorite(int mediaId, string mediaType);
}