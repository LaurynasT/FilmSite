using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace NetRefreshTokenDemo.Api.Services
{
    public interface ITmdbService
    {
        Task<object> GetMovieDetailAsync(int id);
        Task<object> GetMovieTrailerAsync(int id);
        Task<object> GetPopularMoviesAsync();
        Task<object> SearchMultiAsync(string query);
        Task<object> GetDiscoverMoviesAsync();
    }

    public class TmdbService : ITmdbService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;
        private readonly ILogger<TmdbService> _logger;
        private const string BaseUrl = "https://api.themoviedb.org/3";

        public TmdbService(HttpClient httpClient, IConfiguration config, ILogger<TmdbService> logger)
        {
            _httpClient = httpClient;
            _logger = logger;
            _apiKey = config["TMDB:ApiKey"];
            if (string.IsNullOrEmpty(_apiKey))
                _logger.LogWarning("TMDB API key is missing!");
        }

        private async Task<T> GetAsync<T>(string url)
        {
            try
            {
                var response = await _httpClient.GetAsync(url);
                response.EnsureSuccessStatusCode();
                var content = await response.Content.ReadAsStringAsync();
                return JsonSerializer.Deserialize<T>(content, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error calling TMDB API: {url}");
                return default;
            }
        }

        public Task<object> GetMovieDetailAsync(int id)
        {
            var url = $"{BaseUrl}/movie/{id}?api_key={_apiKey}&language=en-US";
            return GetAsync<object>(url);
        }

        public async Task<object> GetMovieTrailerAsync(int id)
        {
            var url = $"{BaseUrl}/movie/{id}/videos?api_key={_apiKey}&language=en-US";
            var result = await GetAsync<JsonElement>(url);
            return result;
        }

        public Task<object> GetPopularMoviesAsync()
        {
            var url = $"{BaseUrl}/movie/popular?api_key={_apiKey}&language=en-US";
            return GetAsync<object>(url);
        }

        public Task<object> SearchMultiAsync(string query)
        {
            var url = $"{BaseUrl}/search/multi?api_key={_apiKey}&query={Uri.EscapeDataString(query)}&language=en-US&include_adult=false";
            return GetAsync<object>(url);
        }

        public Task<object> GetDiscoverMoviesAsync()
        {
            var url = $"{BaseUrl}/discover/movie?api_key={_apiKey}&language=en-US";
            return GetAsync<object>(url);
        }
    }
}