using FilmSiteAPI.Interfaces;
using Microsoft.AspNetCore.Mvc;


namespace FilmSiteAPI.Controllers
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