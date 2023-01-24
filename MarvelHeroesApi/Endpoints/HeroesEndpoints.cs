using MarvelHeroesApi.Data;
using MarvelHeroesApi.Data.Entities;
using MarvelHeroesApi.Dtos.Hero;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MarvelHeroesApi.Endpoints;

public class HeroesEndpoints
{
    public HeroesEndpoints(RouteGroupBuilder routeGroupBuilder)
    {
        routeGroupBuilder.MapGet("/heroes", GetHeroes);
        routeGroupBuilder.MapGet("/heroes/{id}", GetHero);
        routeGroupBuilder.MapPost("/heroes", CreateHero);
        routeGroupBuilder.MapPut("/heroes", UpdateHero);
        routeGroupBuilder.MapDelete("/heroes/{id}", DeleteHero);
    }

    Task<IResult> GetHeroes(MarvelHeroesDbContext db)
    {
        return Task.Run(() => Results.Ok(db.Heroes.ToListAsync()));
    }

    async Task<IResult> GetHero(MarvelHeroesDbContext db, int id)
    {
        var hero = await db.Heroes.FindAsync(id);
        if (hero == null)
            return Results.NotFound();

        return Results.Ok(hero);
    }

    async Task<IResult> CreateHero(MarvelHeroesDbContext db, CreateHero hero)
    {
        var newHero = new Hero()
        {
            HeroName = hero.HeroName,
            SecretIdentity = hero.SecretIdentity,
            Gender = hero.Gender,
            BirthDate = hero.BirthDate,
            FirstAppearance = hero.FirstAppearance,

            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
        };

        var powers = await db.Powers.Where(p => hero.PowersIds.Contains(p.Id)).ToListAsync();
        newHero.Powers = powers;

        await db.Heroes.AddAsync(newHero);
        await db.SaveChangesAsync();

        return Results.Created($"/heroes/{newHero.Id}", newHero);
    }

    async Task<IResult> UpdateHero(MarvelHeroesDbContext db, UpdateHero payload)
    {
        var hero = await db.Heroes.FindAsync(payload.Id);
        if (hero == null)
            return Results.NotFound();

        hero.HeroName = payload.HeroName;
        hero.Gender = payload.Gender;
        hero.BirthDate = payload.BirthDate;
        hero.FirstAppearance = payload.FirstAppearance;
        hero.UpdatedAt = DateTime.UtcNow;

        var powers = await db.Powers.Where(p => payload.PowersIds.Contains(p.Id)).ToListAsync();
        hero.Powers = powers;

        await db.SaveChangesAsync();

        return Results.Ok(hero);
    }

    Task<IResult> DeleteHero(MarvelHeroesDbContext db, int id)
        => Task.Run(() =>
            Results.Ok(db.Heroes.Remove(new Hero() { Id = id })));
}