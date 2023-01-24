using MarvelHeroesApi.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace MarvelHeroesApi.Data;

public class MarvelHeroesDbContext : DbContext
{
    public MarvelHeroesDbContext(DbContextOptions<MarvelHeroesDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Hero>()
            .HasMany(h => h.Powers)
            .WithMany(p => p.Heroes)
            .UsingEntity(j => j.ToTable("HeroPowers"));

        modelBuilder.Entity<Power>()
            .HasData(
                new Power
                {
                    Id = 1,
                    Name = "Super Strength",
                    Description =
                        "The ability to lift and move objects that are far beyond the normal physical limits of the human body.",
                },
                new Power()
                {
                    Id = 2,
                    Name = "Super Speed",
                    Description =
                        "The ability to move at speeds greater than the normal physical limits of the human body.",
                },
                new Power()
                {
                    Id = 3,
                    Name = "Super Stamina",
                    Description =
                        "The ability to exert oneself physically for long periods of time without tiring.",
                });
    }

    public DbSet<Hero> Heroes => Set<Hero>();
    public DbSet<Power> Powers => Set<Power>();
}