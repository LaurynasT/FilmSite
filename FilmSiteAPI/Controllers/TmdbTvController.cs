using Microsoft.AspNetCore.Mvc;
using NetRefreshTokenDemo.Api.Interfaces;
using System.Threading.Tasks;

namespace NetRefreshTokenDemo.Api.Controllers
{
    [ApiController]
    [Route("api/tv")]
    public class TmdbTvController : ControllerBase
    {
        private readonly ITmdbTvInterface _tmdbService;

        public TmdbTvController(ITmdbTvInterface tmdbService)
        {
            _tmdbService = tmdbService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTvDetail(int id)
        {
            var tv = await _tmdbService.GetTvDetailAsync(id);
            if (tv == null) return NotFound();
            return Ok(tv);
        }

        [HttpGet("{id}/trailer")]
        public async Task<IActionResult> GetTvTrailer(int id)
        {
            var trailer = await _tmdbService.GetTvTrailerAsync(id);
            if (trailer == null) return NotFound();
            return Ok(trailer);
        }

        [HttpGet("popular")]
        public async Task<IActionResult> GetPopularTv()
        {
            var tv = await _tmdbService.GetPopularTvAsync();
            return Ok(tv);
        }

        [HttpGet("discover")]
        public async Task<IActionResult> GetDiscoverTv(
        [FromQuery] int page = 1,
        [FromQuery] string sortBy = "popularity.desc",
        [FromQuery] string genres = "",
        [FromQuery] int? firstAirYear = null)
        {
            var tv = await _tmdbService.GetDiscoverTvAsync(page, sortBy, genres, firstAirYear);
            return Ok(tv);
        }

        [HttpGet("{id}/credits")]
        public async Task<IActionResult> GetTvCredits(int id)
        {
            var credits = await _tmdbService.GetTvCreditsAsync(id);
            if (credits == null) return NotFound();
            return Ok(credits);
        }

        [HttpGet("{id}/seasons")]
        public async Task<IActionResult> GetTvSeasonDetail(int id, [FromQuery] int seasonNumber = 1)
        {
            var season = await _tmdbService.GetTvSeasonDetailAsync(id, seasonNumber);
            return Ok(season);
        }

        [HttpGet("{id}/similar")]
        public async Task<IActionResult> GetSimilarTv(int id)
        {
            var similarTv = await _tmdbService.GetSimilarTvAsync(id);
            return Ok(similarTv);
        }
    }
}