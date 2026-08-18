using System.Text.Json.Serialization;

namespace FilmSiteAPI.DTOs;

public class MovieDetailDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;

    public int Runtime { get; set; }
    [JsonPropertyName("vote_average")]
    public double VoteAverage { get; set; }
    public string Overview { get; set; } = string.Empty;
    [JsonPropertyName("poster_path")]
    public string PosterPath { get; set; } = string.Empty;
    [JsonPropertyName("release_date")]
    public string ReleaseDate { get; set; } = string.Empty;

    public int Budget { get; set; }
    public int Revenue { get; set; }

    public string Status { get; set; } = string.Empty;
    public string Homepage { get; set; } = string.Empty;
    public List<GenreModel> Genres { get; set; } = new();
    [JsonPropertyName("production_companies")]
    public List<ProductionCompanyModel> ProductionCompanies { get; set; } = new();
}

public class GenreModel
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
}

public class ProductionCompanyModel
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;

}