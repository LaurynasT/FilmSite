using System.Text.Json.Serialization;

public class MovieDetailDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;

    public int Runtime { get; set; }
    public double Vote_average { get; set; }
    public string Overview { get; set; } = string.Empty;
    public string Poster_path { get; set; } = string.Empty;

    public string Release_date { get; set; } = string.Empty;

    public int Budget { get; set; }
    public int Revenue { get; set; }

    public string Status { get; set; } = string.Empty;
    public string Homepage { get; set; } = string.Empty;
    public List<GenreModel> Genres { get; set; } = new();
    public List<ProductionCompanyModel> Production_companies { get; set; } = new();
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