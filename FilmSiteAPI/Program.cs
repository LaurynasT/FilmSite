using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using NetRefreshTokenDemo.Api.Data;
using NetRefreshTokenDemo.Api.Interfaces;
using NetRefreshTokenDemo.Api.Models;
using NetRefreshTokenDemo.Api.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddSwaggerGen();

string? connectionString = builder.Configuration.GetConnectionString("defaultConnection");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.SaveToken = true;
    options.RequireHttpsMetadata = true; 
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidAudience = builder.Configuration["JWT:ValidAudience"],
        ValidIssuer = builder.Configuration["JWT:ValidIssuer"],
        ClockSkew = TimeSpan.Zero,
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["JWT:secret"]
                ?? throw new InvalidOperationException("JWT secret is missing")))
    };

    options.Events = new JwtBearerEvents
    {
        OnMessageReceived = context =>
        {
            context.Token = context.Request.Cookies["accessToken"];
            return Task.CompletedTask;
        }
    };
});




builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowCredentials", policy =>
    {
        policy
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

builder.Services.AddAuthorization();
builder.Services.AddControllers();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddHttpClient<IOpenAIService, OpenAIService>();
builder.Services.AddHttpClient<ITmdbMovieInterface, TmdbMovieService>();
builder.Services.AddHttpClient<ITmdbTvInterface, TmdbTvService>();
builder.Services.AddHttpClient<ITmdbSearchInterface, TmdbSearchService>();
builder.Services.AddHttpClient<ITmdbGenreInterface, TmdbGenreService>();
builder.Services.AddHttpClient<ITmdbTrendingInterface, TmdbTrendingService>();
builder.Services.AddHttpClient<IMediaLookupService, MediaLookupService>();
builder.Services.AddHttpClient<ITmdbPeopleInterface, TmdbPeopleService>();
builder.Services.AddHttpClient<ITmdbCompanyInterface, TmdbCompanyService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseCors("AllowCredentials");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

try
{
    await DbSeeder.SeedData(app);
}
catch (Exception ex)
{
    var logger = app.Services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred while seeding the database.");
}

app.Run();