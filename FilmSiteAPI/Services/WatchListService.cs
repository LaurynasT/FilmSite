using System.Security.Claims;
using FilmSiteAPI.DbContext;
using FilmSiteAPI.DTOs;
using FilmSiteAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace FilmSiteAPI.Services;

public class WatchListService(AppDbContext context, UserManager<ApplicationUser> userManager, IHttpContextAccessor httpContextAccessor) : IWatchlistInterface
{
    public async Task<List<UserMediaDTO>> GetWatchList(string mediaType)
    {
        var username = httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.Name);

        if (string.IsNullOrEmpty(username))
        {
            throw new UnauthorizedAccessException("User is not authenticated.");
        }

        var user = await userManager.FindByNameAsync(username) ?? throw new Exception("User not found");
        var query = context.WatchList.Where(w => w.UserId == user.Id);

        if(!string.IsNullOrEmpty(mediaType))
        {
            query = query.Where(w => w.MediaType == mediaType.ToLower());
        }

        var watchlist = await query 
        .AsNoTracking()
        .OrderByDescending(w => w.AddedOn)
        .Select(w => new UserMediaDTO
        {
            Id = w.Id,
            MediaId = w.MediaId,
            MediaType = w.MediaType,
            Title = w.Title,
            PosterPath = w.PosterPath,
        })
        .ToListAsync();

        if(watchlist.Count == 0)
        {
            throw new Exception("User has nothing in WatchList");
        }

        return watchlist;
    }

    public async Task<UserMediaDTO> AddToWatchList(AddUserMediaDTO addWatchlist)
    {
        if (string.IsNullOrEmpty(addWatchlist.MediaType) || (addWatchlist.MediaType != "movie" && addWatchlist.MediaType != "tv"))
            throw new Exception("MediaType must be either 'movie' or 'tv'");

        var username = httpContextAccessor.HttpContext?
           .User
           .FindFirstValue(ClaimTypes.Name);

        if (string.IsNullOrEmpty(username))
        {
            throw new UnauthorizedAccessException("User is not authenticated.");
        }

        var user = await userManager.FindByNameAsync(username) ?? throw new Exception("User not found");

        var existing = await context.WatchList
        .FirstOrDefaultAsync(w =>
        w.UserId == user.Id &&
        w.MediaId == addWatchlist.MediaId &&
        w.MediaType == addWatchlist.MediaType);

        if (existing != null)
            throw new Exception("Media already in watchlist");

        var watchList = new WatchListItem
        {
            UserId = user.Id,
            MediaId = addWatchlist.MediaId,
            MediaType = addWatchlist.MediaType,
            Title = addWatchlist.Title,
            PosterPath = addWatchlist.PosterPath,
            AddedOn = DateTime.UtcNow
        };


        context.WatchList.Add(watchList);
        await context.SaveChangesAsync();

        var watchListDTO = new UserMediaDTO
        {
            MediaId = addWatchlist.MediaId,
            MediaType = addWatchlist.MediaType,
            Title = addWatchlist.Title,
            PosterPath = addWatchlist.PosterPath
        };

        return watchListDTO;
    }

    public async Task DeleteFromWatchList(int mediaId, string mediaType)
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

        var watchlist = await context.WatchList
            .FirstOrDefaultAsync(w =>
                w.UserId == user.Id &&
                w.MediaId == mediaId &&
                w.MediaType == mediaType) ?? throw new Exception("Media not in watchlist");


        context.WatchList.Remove(watchlist);
        await context.SaveChangesAsync();
    }

    public async Task<bool> CheckWatchList(int mediaId, string mediaType)
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

        var isFavorite = await context.WatchList
            .AnyAsync(w =>
                w.UserId == user.Id &&
                w.MediaId == mediaId &&
                w.MediaType == mediaType);

        return isFavorite;
    }

}