namespace FilmSiteAPI.DTOs;
public class UserMediaDTO
{
    public int Id { get; set; }
    public int MediaId { get; set; }
    public string? MediaType { get; set; }
    public string? Title { get; set; }
    public string? PosterPath { get; set; }
}