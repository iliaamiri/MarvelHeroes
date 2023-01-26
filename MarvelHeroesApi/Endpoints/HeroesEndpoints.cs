using System.Text.Json;
using System.Text.Json.Serialization;
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

    async Task<IResult> GetHeroes(MarvelHeroesDbContext db)
        => Results.Ok(await db.Heroes.ToListAsync());

    async Task<IResult> GetHero(MarvelHeroesDbContext db, int id)
    {
        var hero = await db.Heroes.Where(h => h.Id == id).Include(h => h.Powers).FirstOrDefaultAsync();
        if (hero == null)
            return Results.NotFound();

        return Results.Json(hero, new JsonSerializerOptions()
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            ReferenceHandler = ReferenceHandler.Preserve
        }, statusCode: 200);
    }

    async Task<IResult> CreateHero(MarvelHeroesDbContext db, CreateHero hero)
    {
        var newHero = new Hero()
        {
            HeroName = hero.HeroName,
            SecretIdentity = hero.SecretIdentity,
            Gender = hero.Gender,
            BirthDate = hero.BirthDate.ToUniversalTime(),
            FirstAppearance = hero.FirstAppearance.ToUniversalTime(),

            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,

            Powers = new List<Power>()
        };

        await db.Heroes.AddAsync(newHero);

        var powers = await db.Powers.Where(p => hero.PowersIds.Contains(p.Id)).ToListAsync();

        powers.ForEach(power =>
        {
            db.HeroPowers.AddAsync(new HeroPower()
            {
                Hero = newHero,
                Power = power,
            });
        });
        await db.SaveChangesAsync();

        return Results.Json(newHero, new JsonSerializerOptions()
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            ReferenceHandler = ReferenceHandler.Preserve
        }, statusCode: 201);
    }

    async Task<IResult> UpdateHero(MarvelHeroesDbContext db, UpdateHero payload)
    {
        var hero = await db.Heroes.Where(h => h.Id == payload.Id).Include(h => h.Powers).FirstOrDefaultAsync();
        if (hero == null)
            return Results.NotFound();

        hero.HeroName = payload.HeroName;
        hero.SecretIdentity = payload.SecretIdentity;
        hero.Gender = payload.Gender;
        hero.BirthDate = payload.BirthDate.ToUniversalTime();
        hero.FirstAppearance = payload.FirstAppearance.ToUniversalTime();
        hero.UpdatedAt = DateTime.UtcNow;

        foreach (var heroPower in hero.Powers)
        {
            if (payload.PowersIds.Contains(heroPower.Id)) continue;
            var power = hero.HeroPowers.Where(p => p.PowerId == heroPower.Id).ToList()[0];
            db.Entry(power).State = EntityState.Deleted;
        }

        await db.SaveChangesAsync();

        foreach (var powerId in payload.PowersIds)
        {
            if (hero.Powers.Any(p => p.Id == powerId)) continue;
            db.HeroPowers.Add(new HeroPower() { HeroId = hero.Id, PowerId = powerId });
        }

        try
        {
            await db.SaveChangesAsync();
        }
        catch
        {
        } // If fails due to duplicated rows, it's ok.

        return Results.Json(hero, new JsonSerializerOptions()
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            ReferenceHandler = ReferenceHandler.Preserve
        }, statusCode: 200);
    }

    async Task<IResult> DeleteHero(MarvelHeroesDbContext db, int id)
    {
        return await Task.Run(() =>
        {
            db.Heroes.Remove(new Hero() { Id = id });
            db.SaveChanges();
            return Results.Ok();
        });
    }
}