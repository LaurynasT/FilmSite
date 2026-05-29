using System.Text.Json.Serialization;

public class TvDetailDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;

    public DateOnly First_air_date { get; set; }
    public double Vote_average { get; set; }
    public int Number_of_episodes { get; set; }
    public int Number_of_seasons { get; set; }
    public string Overview { get; set; } = string.Empty;
    public string Poster_path { get; set; } = string.Empty;

    public string Release_date { get; set; } = string.Empty;

    public int Budget { get; set; }
    public int Revenue { get; set; }

    public string Status { get; set; } = string.Empty;
    public string Homepage { get; set; } = string.Empty;
    public List<TvGenreModel> Genres { get; set; } = new();
    public List<TvProductionCompanyModel> Production_companies { get; set; } = new();
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