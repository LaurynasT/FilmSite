
namespace FilmSiteAPI.DTOs;

public class AddUserMediaDTO
{
    public int MediaId { get; set; }
    public string MediaType { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string PosterPath { get; set; }  = string.Empty;
}