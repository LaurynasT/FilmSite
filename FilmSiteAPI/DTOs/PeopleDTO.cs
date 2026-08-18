using System.Text.Json.Serialization;

namespace FilmSiteAPI.DTOs;
public class PeopleDTO
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Biography { get; set; } = string.Empty;
    [JsonPropertyName("profile_path")]
    public string ProfilePath { get; set; } = string.Empty;
    public string Birthday { get; set; } = string.Empty;
    [JsonPropertyName("place_of_birth")]
    public string PlaceOfBirth { get; set; } = string.Empty;
}