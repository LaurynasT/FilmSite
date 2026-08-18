using System.Text.Json.Serialization;

namespace FilmSiteAPI.DTOs;
public class PeopleTvDTO
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    [JsonPropertyName("poster_path")]
    public string PosterPath { get; set; } = string.Empty;
}