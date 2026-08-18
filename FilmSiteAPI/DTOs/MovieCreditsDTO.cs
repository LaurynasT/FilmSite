using System.Text.Json.Serialization;
using FilmSiteAPI.Models;

namespace FilmSiteAPI.DTOs;
public class CreditsResponseDto
{
    [JsonPropertyName("cast")]
    public List<CastDTO> Cast { get; set; } = new();

    [JsonPropertyName("crew")]
    public List<CrewDTO> Crew { get; set; } = new();
}