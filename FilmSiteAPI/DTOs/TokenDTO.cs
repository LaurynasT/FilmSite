using System.ComponentModel.DataAnnotations;

namespace FilmSiteAPI.DTOs;
public class TokenDTO
{
    [Required]
    public string AccessToken { get; set; } = string.Empty;

    [Required]
    public string RefreshToken { get; set; } = string.Empty;
}