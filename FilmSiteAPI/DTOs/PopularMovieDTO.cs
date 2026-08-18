using System.Text.Json.Serialization;

namespace FilmSiteAPI.DTOs;
public class PopularMovieDTO
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    [JsonPropertyName("vote_average")]
    public double VoteAverage { get; set; }
    [JsonPropertyName("poster_path")]
    public string PosterPath { get; set; } = string.Empty;

}