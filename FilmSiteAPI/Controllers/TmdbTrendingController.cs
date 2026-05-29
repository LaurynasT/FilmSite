using Microsoft.AspNetCore.Mvc;
using NetRefreshTokenDemo.Api.Interfaces;
using NetRefreshTokenDemo.Api.Services;
using System.Threading.Tasks;

namespace NetRefreshTokenDemo.Api.Controllers
{
    [ApiController]
    [Route("api/")]
    public class TmdbTrendingController : ControllerBase
    {
        private readonly ITmdbTrendingInterface _tmdbService;

        public TmdbTrendingController(ITmdbTrendingInterface tmdbService)
        {
            _tmdbService = tmdbService;
        }



        [HttpGet("trending")]
        public async Task<IActionResult> GetTrending([FromQuery] string timeWindow = "day")
        {
            var results = await _tmdbService.GetTrendingAsync(timeWindow);
            return Ok(results);
        }


    }
}