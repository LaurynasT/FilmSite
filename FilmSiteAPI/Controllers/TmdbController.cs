using Microsoft.AspNetCore.Mvc;
using NetRefreshTokenDemo.Api.Services;
using System.Threading.Tasks;

namespace NetRefreshTokenDemo.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TmdbController : ControllerBase
    {
        private readonly ITmdbService _tmdbService;

        public TmdbController(ITmdbService tmdbService)
        {
            _tmdbService = tmdbService;
        }

        [HttpGet("movie/{id}")]
        public async Task<IActionResult> GetMovieDetail(int id)
        {
            var movie = await _tmdbService.GetMovieDetailAsync(id);
            if (movie == null) return NotFound();
            return Ok(movie);
        }

        [HttpGet("movie/{id}/trailer")]
        public async Task<IActionResult> GetMovieTrailer(int id)
        {
            var trailer = await _tmdbService.GetMovieTrailerAsync(id);
            if (trailer == null) return NotFound();
            return Ok(trailer);
        }

        [HttpGet("movie/popular")]
        public async Task<IActionResult> GetPopularMovies()
        {
            var movies = await _tmdbService.GetPopularMoviesAsync();
            return Ok(movies);
        }

        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery] string query)
        {
            var results = await _tmdbService.SearchMultiAsync(query);
            return Ok(results);
        }

        [HttpGet("discover")]
        public async Task<IActionResult> GetDiscoverMovies()
        {
            var movies = await _tmdbService.GetDiscoverMoviesAsync();
            return Ok(movies);
        }
    }
}