using System.Text.Json;

namespace FilmSiteAPI.Services;
public abstract class TmdbBaseService
{
    protected readonly HttpClient _httpClient;
    protected readonly string _apiKey;

    protected const string BaseUrl = "https://api.themoviedb.org/3";

    protected TmdbBaseService(HttpClient httpClient, IConfiguration config)
    {
        _httpClient = httpClient;
        _apiKey = config["TMDB:ApiKey"] ?? throw new InvalidOperationException("No api key");
    }

    protected async Task<T> GetAsync<T>(string url)
    {
        var response = await _httpClient.GetAsync(url);

        response.EnsureSuccessStatusCode();

        var json = await response.Content.ReadAsStringAsync();

        return JsonSerializer.Deserialize<T>(
            json,
            new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            }) ?? throw new JsonException("Failed to deserialize TMDB response.");
    }
}