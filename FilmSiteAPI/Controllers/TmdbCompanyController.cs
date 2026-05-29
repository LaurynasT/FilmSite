using Microsoft.AspNetCore.Mvc;
using NetRefreshTokenDemo.Api.Interfaces;
using NetRefreshTokenDemo.Api.Services;
using System.Threading.Tasks;

namespace NetRefreshTokenDemo.Api.Controllers
{
    [ApiController]
    [Route("api/company")]
    public class TmdbCompanyController : ControllerBase
    {
        private readonly ITmdbCompanyInterface _tmdbService;

        public TmdbCompanyController(ITmdbCompanyInterface tmdbService)
        {
            _tmdbService = tmdbService;
        }



        [HttpGet("{id}")]
        public async Task<IActionResult> GetCompanyDetail(int id    )
        {
            var details = await _tmdbService.GetCompanyDetailAsync(id);
            return Ok(details);
        }

    }
}