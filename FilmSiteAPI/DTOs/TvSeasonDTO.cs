using System.Text.Json.Serialization;
using FilmSiteAPI.Models;

namespace FilmSiteAPI.DTOs;
public class TvSeasonDTO
{
    public int  Id { get; set; }
    public string Name { get; set; } = string.Empty;
    [JsonPropertyName("season_number")]
    public int SeasonNumber { get; set; }
    [JsonPropertyName("vote_average")]
    public double VoteAverage { get; set; }
    public List<TvEpisodeDTO> Episodes { get; set; } = [];
}

