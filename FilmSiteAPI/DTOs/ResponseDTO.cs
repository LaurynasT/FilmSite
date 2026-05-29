public class ResponseDTO<T>
{
    public int Page { get; set; }
    public int TotalResults { get; set; }
    public int TotalPages { get; set; }
    public List<T> Results { get; set; } = new ();
}