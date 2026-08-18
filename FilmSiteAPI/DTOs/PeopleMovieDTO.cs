using System.Text.Json.Serialization;

namespace FilmSiteAPI.DTOs;
public class PeopleMovieDTO
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    [JsonPropertyName("poster_path")]
    public string PosterPath { get; set; } = string.Empty;
}