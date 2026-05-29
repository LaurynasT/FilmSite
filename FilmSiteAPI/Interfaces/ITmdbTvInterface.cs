using NetRefreshTokenDemo.Api.Models.DTOs;

namespace NetRefreshTokenDemo.Api.Interfaces;

public interface ITmdbTvInterface
{

    Task<ResponseDTO<PopularTvModel>> GetPopularTvAsync();
    Task<TvDetailDto> GetTvDetailAsync(int id);
    Task<TrailerResponseDto> GetTvTrailerAsync(int id);
    Task<ResponseDTO<DiscoverTvModel>> GetDiscoverTvAsync(
    int page = 1,
    string sortBy = "popularity.desc",
    string genres = "",
    int? firstAirYear = null
);

    Task<CreditsResponseDto> GetTvCreditsAsync(int id);
    Task<TvSeasonDTO> GetTvSeasonDetailAsync(int tvId, int seasonNumber = 1);
    Task<ResponseDTO<SimilarTvModel>> GetSimilarTvAsync(int id);

}