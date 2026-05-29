using Microsoft.AspNetCore.Mvc;
using NetRefreshTokenDemo.Api.Interfaces;
using NetRefreshTokenDemo.Api.Services;
using System.Threading.Tasks;

namespace NetRefreshTokenDemo.Api.Controllers
{
    [ApiController]
    [Route("api/genre")]
    public class TmdbGenreController : ControllerBase
    {
        private readonly ITmdbGenreInterface _tmdbService;

        public TmdbGenreController(ITmdbGenreInterface tmdbService)
        {
            _tmdbService = tmdbService;
        }



        [HttpGet("tv")]
        public async Task<IActionResult> GetTvGenres()
        {
            var results = await _tmdbService.GetTvGenresAsync();
            return Ok(results);
        }
        [HttpGet("movie")]
        public async Task<IActionResult> GetMovieGenres()
        {
            var results = await _tmdbService.GetMovieGenresAsync();
            return Ok(results);
        }


    }
}