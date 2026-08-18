using Microsoft.AspNetCore.Identity;

namespace FilmSiteAPI.Models;
public class ApplicationUser : IdentityUser
{
    public string Name { get; set; } = string.Empty;
}