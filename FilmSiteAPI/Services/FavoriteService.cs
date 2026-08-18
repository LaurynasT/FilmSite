using FilmSiteAPI.DbContext;
using FilmSiteAPI.DTOs;
using FilmSiteAPI.Interfaces;
using FilmSiteAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace FilmSiteAPI.Services;
public class FavoriteService(AppDbContext context, UserManager<ApplicationUser> userManager, IHttpContextAccessor httpContextAccessor) : IFavoritesInterface
{

    public async Task<List<UserMediaDTO>> GetFavorites(string mediaType)
    {
        var username = httpContextAccessor.HttpContext?
            .User
            .FindFirstValue(ClaimTypes.Name);

        if (string.IsNullOrEmpty(username))
        {
            throw new UnauthorizedAccessException("User is not authenticated.");
        }

        var user = await userManager.FindByNameAsync(username) ?? throw new Exception("User not found");
        var query = context.Favorites.Where(f => f.UserId == user.Id);

        if (!string.IsNullOrEmpty(mediaType))
        {
            query = query.Where(f => f.MediaType == mediaType.ToLower());
        }

        var favorites = await query
            .AsNoTracking()
            .OrderByDescending(f => f.AddedOn)
            .Select(f => new UserMediaDTO
            {
                Id = f.Id,
                MediaId = f.MediaId,
                MediaType = f.MediaType,
                Title = f.Title,
                PosterPath = f.PosterPath,
            })
            .ToListAsync();


        if (favorites.Count == 0)
        {
            throw new Exception("User has no favorites");
        }

        return favorites;
    }

    public async Task<UserMediaDTO> AddFavorite(AddUserMediaDTO addFavorite)
    {
        if (string.IsNullOrEmpty(addFavorite.MediaType) || (addFavorite.MediaType != "movie" && addFavorite.MediaType != "tv"))
            throw new Exception("MediaType must be either 'movie' or 'tv'");

        var username = httpContextAccessor.HttpContext?
           .User
           .FindFirstValue(ClaimTypes.Name);

        if (string.IsNullOrEmpty(username))
        {
            throw new UnauthorizedAccessException("User is not authenticated.");
        }

        var user = await userManager.FindByNameAsync(username) ?? throw new Exception("User not found");

        var existing = await context.Favorites
        .FirstOrDefaultAsync(f =>
        f.UserId == user.Id &&
        f.MediaId == addFavorite.MediaId &&
        f.MediaType == addFavorite.MediaType);

        if (existing != null)
            throw new Exception("Media already in favorites");

        var favorite = new FavoriteMedia
        {
            UserId = user.Id,
            MediaId = addFavorite.MediaId,
            MediaType = addFavorite.MediaType,
            Title = addFavorite.Title,
            PosterPath = addFavorite.PosterPath,
            AddedOn = DateTime.UtcNow
        };


        context.Favorites.Add(favorite);
        await context.SaveChangesAsync();

        var favoriteDTO = new UserMediaDTO
        {
            MediaId = addFavorite.MediaId,
            MediaType = addFavorite.MediaType,
            Title = addFavorite.Title,
            PosterPath = addFavorite.PosterPath
        };
        return favoriteDTO;
    }

    public async Task DeleteFavorite(int mediaId, string mediaType)
    {
        if (string.IsNullOrEmpty(mediaType) || (mediaType != "movie" && mediaType != "tv"))
            throw new Exception("MediaType must be either 'movie' or 'tv'");

        var username = httpContextAccessor.HttpContext?
            .User
            .FindFirstValue(ClaimTypes.Name);

        if (string.IsNullOrEmpty(username))
        {
            throw new UnauthorizedAccessException("User is not authenticated.");
        }

        var user = await userManager.FindByNameAsync(username) ?? throw new Exception("User not found");

        var favorite = await context.Favorites
            .FirstOrDefaultAsync(f =>
                f.UserId == user.Id &&
                f.MediaId == mediaId &&
                f.MediaType == mediaType) ?? throw new Exception("Media not in favorites");


        context.Favorites.Remove(favorite);
        await context.SaveChangesAsync();
    }

    public async Task<bool> CheckFavorite(int mediaId, string mediaType)
    {
        if (string.IsNullOrEmpty(mediaType) || (mediaType != "movie" && mediaType != "tv"))
            throw new Exception("MediaType must be either 'movie' or 'tv'");

        var username = httpContextAccessor.HttpContext?
            .User
            .FindFirstValue(ClaimTypes.Name);

        if (string.IsNullOrEmpty(username))
        {
            throw new UnauthorizedAccessException("User is not authenticated.");
        }

        var user = await userManager.FindByNameAsync(username) ?? throw new Exception("User not found");

        var isFavorite = await context.Favorites
            .AnyAsync(f =>
                f.UserId == user.Id &&
                f.MediaId == mediaId &&
                f.MediaType == mediaType);

        return isFavorite;
    }
}