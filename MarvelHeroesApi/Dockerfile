FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["MarvelHeroesApi/MarvelHeroesApi.csproj", "MarvelHeroesApi/"]
RUN dotnet restore "MarvelHeroesApi/MarvelHeroesApi.csproj"
COPY . .
WORKDIR "/src/MarvelHeroesApi"
RUN dotnet build "MarvelHeroesApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "MarvelHeroesApi.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "MarvelHeroesApi.dll"]
