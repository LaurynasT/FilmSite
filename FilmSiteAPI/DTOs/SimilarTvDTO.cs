using System.Text.Json.Serialization;

namespace FilmSiteAPI.DTOs;
public class SimilarTvDTO
{
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("vote_average")]
    public double VoteAverage { get; set; }

    [JsonPropertyName("poster_path")]
    public string PosterPath { get; set; } = string.Empty;
}