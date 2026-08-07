using System.Text.Json.Serialization;

public class CastModel
{
    [JsonPropertyName("id")]
    public int Id { get; set; }


    [JsonPropertyName("credit_id")]
    public string credit_id { get; set; } = string.Empty;

    [JsonPropertyName("profile_path")]
    public string ProfilePath { get; set; } = string.Empty;

    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("character")]
    public string Character { get; set; } = string.Empty;
}