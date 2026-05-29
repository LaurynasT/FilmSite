public class TvSeasonDTO
{
    public int  Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Season_number { get; set; }
    public double vote_average { get; set; }
    public List<TvEpisodeModel> Episodes { get; set; } = new ();
}

