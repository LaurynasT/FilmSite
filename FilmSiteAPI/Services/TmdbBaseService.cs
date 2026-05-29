using System.Text.Json;

public abstract class TmdbBaseService
{
    protected readonly HttpClient _httpClient;
    protected readonly string _apiKey;

    protected const string BaseUrl = "https://api.themoviedb.org/3";

    protected TmdbBaseService(HttpClient httpClient, IConfiguration config)
    {
        _httpClient = httpClient;
        _apiKey = config["TMDB:ApiKey"];
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
            });
    }
}