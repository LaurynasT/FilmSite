using System.Text.Json.Serialization;

namespace FilmSiteAPI.DTOs;
public class CastDTO
{
    [JsonPropertyName("id")]
    public int Id { get; set; }


    [JsonPropertyName("credit_id")]
    public string CreditId { get; set; } = string.Empty;

    [JsonPropertyName("profile_path")]
    public string ProfilePath { get; set; } = string.Empty;

    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("character")]
    public string Character { get; set; } = string.Empty;
}