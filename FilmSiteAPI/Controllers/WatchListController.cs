using FilmSiteAPI.DTOs;
using FilmSiteAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace FilmSiteAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class WatchListController(IWatchlistInterface watchlistService) : ControllerBase
    {
        [HttpGet]
    public async Task<IActionResult> GetWatchList([FromQuery] string mediaType)
    {
        try
        {
            var result = await watchlistService.GetWatchList(mediaType);
            return Ok(result);
        }
        catch (Exception ex)
        {
            if (ex.Message == "User not found")
                return NotFound(ex.Message);

            if (ex.Message == "User has nothing in WatchList")
                return NotFound(ex.Message);

            if (ex.Message == "User is not authenticated")
                return Unauthorized(ex.Message);

            return StatusCode(500, ex.Message);
        }
    }

    [HttpPost("add")]
    public async Task<IActionResult> AddToWatchList([FromBody] AddUserMediaDTO addFavorite)
    {
        try
        {
            var added = await watchlistService.AddToWatchList(addFavorite);
            return Ok(added);
        }
        catch (Exception ex)
        {
            if (ex.Message == "MediaType must be either 'movie' or 'tv'")
                return BadRequest(ex.Message);

            if (ex.Message == "Media already in watchlist")
                return BadRequest(ex.Message);

            if (ex.Message == "User not found")
                return NotFound(ex.Message);

            if (ex.Message == "User is not authenticated")
                return Unauthorized(ex.Message);

            return StatusCode(500, ex.Message);
        }
    }

    [HttpDelete("remove")]
    public async Task<IActionResult> RemoveFromWatchList([FromQuery] int mediaId, [FromQuery] string mediaType)
    {
        try
        {
            await watchlistService.DeleteFromWatchList(mediaId, mediaType);
            return NoContent();
        }
        catch (Exception ex)
        {
            if (ex.Message == "MediaType must be either 'movie' or 'tv'")
                return BadRequest(ex.Message);

            if (ex.Message == "Media not in watchlist")
                return BadRequest(ex.Message);

            if (ex.Message == "User not found")
                return NotFound(ex.Message);

            if (ex.Message == "User is not authenticated")
                return Unauthorized(ex.Message);

            return StatusCode(500, ex.Message);
        }
    }

    [HttpGet("check")]
    public async Task<IActionResult> CheckWatchlist([FromQuery] int mediaId, [FromQuery] string mediaType)
    {
        try
        {
            var result = await watchlistService.CheckWatchList(mediaId, mediaType);
            return Ok(result);
        }
        catch (Exception ex)
        {
            if (ex.Message == "MediaType must be either 'movie' or 'tv'")
                return BadRequest(ex.Message);

            if (ex.Message == "User not found")
                return NotFound(ex.Message);

            if (ex.Message == "User is not authenticated")
                return Unauthorized(ex.Message);

            return StatusCode(500, ex.Message);
        }
    }
    }
}