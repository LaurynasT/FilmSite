using System.Text.Json.Serialization;

namespace FilmSiteAPI.DTOs;
public class TvDetailDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    [JsonPropertyName("first_air_date")]
    public DateOnly FirstAirDate { get; set; }

    [JsonPropertyName("vote_average")]
    public double VoteAverage { get; set; }

    [JsonPropertyName("number_of_episodes")]
    public int NumberOfEpisodes { get; set; }

    [JsonPropertyName("number_of_seasons")]
    public int NumberOfSeasons { get; set; }
    public string Overview { get; set; } = string.Empty;

    [JsonPropertyName("poster_path")]
    public string PosterPath { get; set; } = string.Empty;

    [JsonPropertyName("release_date")]
    public string ReleaseDate { get; set; } = string.Empty;

    public int Budget { get; set; }
    public int Revenue { get; set; }

    public string Status { get; set; } = string.Empty;
    public string Homepage { get; set; } = string.Empty;
    public List<TvGenreModel> Genres { get; set; } = new();

    [JsonPropertyName("production_companies")]
    public List<TvProductionCompanyModel> ProductionCompanies { get; set; } = new();
    public List<TvNetworksModel> Networks { get; set; } = new();
}

public class TvGenreModel
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
}

public class TvProductionCompanyModel
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;

}

public class TvNetworksModel
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
}