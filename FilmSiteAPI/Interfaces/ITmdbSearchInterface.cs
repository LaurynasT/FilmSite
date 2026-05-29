namespace NetRefreshTokenDemo.Api.Interfaces;

public interface ITmdbSearchInterface
{
    Task<object> SearchMultiAsync(string query);

}