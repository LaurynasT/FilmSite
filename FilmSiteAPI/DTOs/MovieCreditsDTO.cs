using System.Text.Json.Serialization;

public class CreditsResponseDto
{
    [JsonPropertyName("cast")]
    public List<CastModel> Cast { get; set; } = new();

    [JsonPropertyName("crew")]
    public List<CrewModel> Crew { get; set; } = new();
}