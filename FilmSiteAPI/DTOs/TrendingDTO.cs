using System.Text.Json.Serialization;

namespace FilmSiteAPI.DTOs;
public class TrendingDTO
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    [JsonPropertyName("vote_average")]
    public double VoteAverage { get; set; }
    [JsonPropertyName("poster_path")]
    public string PosterPath { get; set; } = string.Empty;
    public string Backdrop_path { get; set; } = string.Empty;
    public string Overview { get; set; } = string.Empty;
    [JsonPropertyName("release_date")]
    public string ReleaseDate { get; set; } = string.Empty;
    [JsonPropertyName("genre_ids")]
    public List<int> GenreIds { get; set; } = new List<int>();
    [JsonPropertyName("media_type")]
    public string MediaType { get; set; } = string.Empty;
    [JsonPropertyName("original_title")]
    public string OriginalTitle { get; set; } = string.Empty;

}
