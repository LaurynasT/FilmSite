FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["FilmSiteAPI.csproj", "./"]
RUN dotnet restore
COPY . .
RUN dotnet build "FilmSiteAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "FilmSiteAPI.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_ENVIRONMENT=Production
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "FilmSiteAPI.dll"]