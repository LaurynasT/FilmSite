using FilmSiteAPI.Interfaces;
using Microsoft.AspNetCore.Mvc;


namespace FilmSiteAPI.Controllers
{
    [ApiController]
    [Route("api/people")]
    public class TmdbPeopleController : ControllerBase
    {
        private readonly ITmdbPeopleInterface _tmdbService;

        public TmdbPeopleController(ITmdbPeopleInterface tmdbService)
        {
            _tmdbService = tmdbService;
        }



        [HttpGet("{id}")]
        public async Task<IActionResult> GetPeopleDetails(int id)
        {
            var details = await _tmdbService.GetPeopleDetailsAsync(id);
            return Ok(details);
        }
        [HttpGet("{id}/movie_credits")]
        public async Task<IActionResult> GetActorMovieCredits(int id)
        {
            var credits = await _tmdbService.GetActorMovieCreditsAsync(id);
            return Ok(credits);
        }
        [HttpGet("{id}/tv_credits")]
        public async Task<IActionResult> GetActorTvCredits(int id)
        {
            var credits = await _tmdbService.GetActorTvCreditsAsync(id);
            return Ok(credits);
        }


    }
}