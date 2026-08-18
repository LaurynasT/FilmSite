using FilmSiteAPI.Interfaces;
using Microsoft.AspNetCore.Mvc;


namespace FilmSiteAPI.Controllers
{
    [ApiController]
    [Route("api/")]
    public class TmdbSearchController : ControllerBase
    {
        private readonly ITmdbSearchInterface _tmdbService;

        public TmdbSearchController(ITmdbSearchInterface tmdbService)
        {
            _tmdbService = tmdbService;
        }



        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery] string query)
        {
            var results = await _tmdbService.SearchMultiAsync(query);
            return Ok(results);
        }


    }
}