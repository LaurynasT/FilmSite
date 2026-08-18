using FilmSiteAPI.DTOs;
using FilmSiteAPI.Models;

namespace FilmSiteAPI.Interfaces;

public interface ITmdbTvInterface
{

    Task<ResponseDTO<PopularTvDTO>> GetPopularTvAsync();
    Task<TvDetailDto> GetTvDetailAsync(int id);
    Task<TrailerResponseDto> GetTvTrailerAsync(int id);
    Task<ResponseDTO<DiscoverTvDTO>> GetDiscoverTvAsync(
    int page = 1,
    string sortBy = "popularity.desc",
    string genres = "",
    int? firstAirYear = null
);

    Task<CreditsResponseDto> GetTvCreditsAsync(int id);
    Task<TvSeasonDTO> GetTvSeasonDetailAsync(int tvId, int seasonNumber = 1);
    Task<ResponseDTO<SimilarTvDTO>> GetSimilarTvAsync(int id);

}