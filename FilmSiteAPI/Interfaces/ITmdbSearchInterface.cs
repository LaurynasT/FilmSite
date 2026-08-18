namespace FilmSiteAPI.Interfaces;

public interface ITmdbSearchInterface
{
    Task<object> SearchMultiAsync(string query);

}