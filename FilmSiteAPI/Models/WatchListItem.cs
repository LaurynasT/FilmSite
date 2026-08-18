namespace FilmSiteAPI.Models;

public class WatchListItem
{
    public int Id { get; set; }
    public string UserId { get; set; } = string.Empty;
    public int MediaId { get; set; }
    public string MediaType { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string PosterPath { get; set; } = string.Empty;
    public DateTime AddedOn { get; set; }

    public required ApplicationUser User { get; set; }
}