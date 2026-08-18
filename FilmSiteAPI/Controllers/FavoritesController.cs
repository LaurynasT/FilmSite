using FilmSiteAPI.DTOs;
using FilmSiteAPI.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FilmSiteAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class FavoritesController(IFavoritesInterface favoriteService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetFavorites([FromQuery] string mediaType)
    {
        try
        {
            var result = await favoriteService.GetFavorites(mediaType);
            return Ok(result);
        }
        catch (Exception ex)
        {
            if (ex.Message == "User not found")
                return NotFound(ex.Message);

            if (ex.Message == "User has no favorites")
                return NotFound(ex.Message);

            if (ex.Message == "User is not authenticated")
                return Unauthorized(ex.Message);

            return StatusCode(500, ex.Message);
        }
    }

    [HttpPost("add")]
    public async Task<IActionResult> AddFavorite([FromBody] AddUserMediaDTO addFavorite)
    {
        try
        {
            var added = await favoriteService.AddFavorite(addFavorite);
            return Ok(added);
        }
        catch (Exception ex)
        {
            if (ex.Message == "MediaType must be either 'movie' or 'tv'")
                return BadRequest(ex.Message);

            if (ex.Message == "Media already in favorites")
                return BadRequest(ex.Message);

            if (ex.Message == "User not found")
                return NotFound(ex.Message);

            if (ex.Message == "User is not authenticated")
                return Unauthorized(ex.Message);

            return StatusCode(500, ex.Message);
        }
    }

    [HttpDelete("remove")]
    public async Task<IActionResult> RemoveFavorite([FromQuery] int mediaId, [FromQuery] string mediaType)
    {
        try
        {
            await favoriteService.DeleteFavorite(mediaId, mediaType);
            return NoContent();
        }
        catch (Exception ex)
        {
            if (ex.Message == "MediaType must be either 'movie' or 'tv'")
                return BadRequest(ex.Message);

            if (ex.Message == "Media not in favorites")
                return BadRequest(ex.Message);

            if (ex.Message == "User not found")
                return NotFound(ex.Message);

            if (ex.Message == "User is not authenticated")
                return Unauthorized(ex.Message);

            return StatusCode(500, ex.Message);
        }
    }

    [HttpGet("check")]
    public async Task<IActionResult> CheckFavorite([FromQuery] int mediaId, [FromQuery] string mediaType)
    {
        try
        {
            var result = await favoriteService.CheckFavorite(mediaId, mediaType);
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