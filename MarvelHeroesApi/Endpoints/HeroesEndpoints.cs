using MarvelHeroesApi.Data;
using MarvelHeroesApi.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace MarvelHeroesApi.Endpoints;

public class HeroesEndpoints
{
    public HeroesEndpoints(RouteGroupBuilder routeGroupBuilder)
    {
    }

    public Task<List<Hero>> GetHeroes(MarvelHeroesDbContext db)
    {
        return db.Heroes.ToListAsync();
    } 
}