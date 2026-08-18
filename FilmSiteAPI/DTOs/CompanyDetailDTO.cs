namespace FilmSiteAPI.DTOs;
public class CompanyDetailDTO
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string HomePage { get; set; } = string.Empty;
    public string Origin_Country { get; set; } = string.Empty;
    public string Logo_Path { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}