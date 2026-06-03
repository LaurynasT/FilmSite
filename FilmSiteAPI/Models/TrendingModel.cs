public class TrendingModel
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public double Vote_average { get; set; }
    public string Poster_path { get; set; } = string.Empty;
    public string Backdrop_path { get; set; } = string.Empty;
    public string Overview { get; set; } = string.Empty;
    public string Release_date { get; set; } = string.Empty;
    public List<int> Genre_ids { get; set; } = new List<int>();
    public string Media_type { get; set; } = string.Empty;

}
