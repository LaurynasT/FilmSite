using Microsoft.AspNetCore.Mvc;
using NetRefreshTokenDemo.Api.Interfaces;
using NetRefreshTokenDemo.Api.Services;
using System.Threading.Tasks;

namespace NetRefreshTokenDemo.Api.Controllers
{
    [ApiController]
    [Route("api/movie")]
    public class TmdbMovieController : ControllerBase
    {
        private readonly ITmdbMovieInterface _tmdbService;

        public TmdbMovieController(ITmdbMovieInterface tmdbService)
        {
            _tmdbService = tmdbService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetMovieDetail(int id)
        {
            var movie = await _tmdbService.GetMovieDetailAsync(id);
            if (movie == null) return NotFound();
            return Ok(movie);
        }

        [HttpGet("{id}/trailer")]
        public async Task<IActionResult> GetMovieTrailer(int id)
        {
            var trailer = await _tmdbService.GetMovieTrailerAsync(id);
            if (trailer == null) return NotFound();
            return Ok(trailer);
        }

        [HttpGet("popular")]
        public async Task<IActionResult> GetPopularMovies()
        {
            var movies = await _tmdbService.GetPopularMoviesAsync();
            return Ok(movies);
        }

        [HttpGet("discover")]
        public async Task<IActionResult> GetDiscoverMovies(
        [FromQuery] int page = 1,
        [FromQuery] string sortBy = "popularity.desc",
        [FromQuery] string genres = "",
        [FromQuery] string releaseYear = "")
        {
            var movies = await _tmdbService.GetDiscoverMoviesAsync(page, sortBy, genres, releaseYear);
            return Ok(movies);
        }

        [HttpGet("{id}/credits")]
        public async Task<IActionResult> GetMovieCredits(int id)
        {
            var credits = await _tmdbService.GetMovieCreditsAsync(id);
            if (credits == null) return NotFound();
            return Ok(credits);
        }

        [HttpGet("upcoming")]
        public async Task<IActionResult> GetUpcomingMovies()
        {
            var movies = await _tmdbService.GetUpcomingMoviesAsync();
            return Ok(movies);
        }

        [HttpGet("{id}/similar")]
        public async Task<IActionResult> GetSimilarMovies(int id)
        {
            var movies = await _tmdbService.GetSimilarMoviesAsync(id);
            return Ok(movies);
        }

        [HttpGet("{id}/reviews")]
        public async Task<IActionResult> GetMovieReviews(int id, [FromQuery] int page = 1)
        {
            var reviews = await _tmdbService.GetMovieReviewsAsync(id, page);
            return Ok(reviews);
        }
    }
}