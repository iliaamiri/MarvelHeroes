using MarvelHeroesApi.Data;
using MarvelHeroesApi.Data.Entities;
using MarvelHeroesApi.Dtos.Power;
using Microsoft.EntityFrameworkCore;

namespace MarvelHeroesApi.Endpoints;

public class PowersEndpoints
{
    public PowersEndpoints(RouteGroupBuilder routeGroupBuilder)
    {
        routeGroupBuilder.MapGet("/powers", GetPowers);
        routeGroupBuilder.MapGet("/powers/{id}", GetPowerById);
        routeGroupBuilder.MapPost("/powers", CreatePower);
        routeGroupBuilder.MapPut("/powers", UpdatePower);
        routeGroupBuilder.MapDelete("/powers/{id}", DeletePower);
    }

    async Task<IResult> GetPowers(MarvelHeroesDbContext db)
        => Results.Ok(await db.Powers.ToListAsync());

    async Task<IResult> GetPowerById(MarvelHeroesDbContext db, int id)
    {
        var power = await db.Powers.FindAsync(id);
        if (power == null)
            return Results.NotFound();

        return Results.Ok(power);
    }

    async Task<IResult> CreatePower(MarvelHeroesDbContext db, CreatePower payload)
    {
        var power = db.Powers.Add(new Power
        {
            Name = payload.Name,
            Description = payload.Description
        }).Entity;

        await db.SaveChangesAsync();
        return Results.Created($"/powers/{power.Id}", power);
    }

    async Task<IResult> UpdatePower(MarvelHeroesDbContext db, UpdatePower payload)
    {
        var power = await db.Powers.FindAsync(payload.Id);
        if (power == null)
            return Results.NotFound();

        power.Name = payload.Name;
        power.Description = payload.Description;

        await db.SaveChangesAsync();
        return Results.Ok(power);
    }

    Task<IResult> DeletePower(MarvelHeroesDbContext db, int id)
        => Task.Run(() =>
            Results.Ok(db.Powers.Remove(new Power() { Id = id })));
}