using System.Text.Json.Serialization;

namespace FilmSiteAPI.DTOs;
public class TvEpisodeDTO
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    [JsonPropertyName("still_path")]
    public string StillPath { get; set; } = string.Empty;
    [JsonPropertyName("episode_number")]
    public int EpisodeNumber { get; set; }
    [JsonPropertyName("vote_average")]
    public double VoteAverage { get; set; }
}