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
        modelBuilder.Entity<Power>()
            .HasMany(p => p.Heroes)
            .WithMany(h => h.Powers)
            .UsingEntity<HeroPower>(
                j => j
                    .HasOne(hp => hp.Hero)
                    .WithMany(t => t.HeroPowers)
                    .HasForeignKey(hp => hp.HeroId)
                    .OnDelete(DeleteBehavior.Cascade),
                j => j
                    .HasOne(hp => hp.Power)
                    .WithMany(t => t.HeroPowers)
                    .HasForeignKey(hp => hp.PowerId)
                    .OnDelete(DeleteBehavior.Cascade),
                j => { j.HasKey(t => new { t.HeroId, t.PowerId }); });

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

    public DbSet<HeroPower> HeroPowers => Set<HeroPower>();
    public DbSet<Hero> Heroes => Set<Hero>();
    public DbSet<Power> Powers => Set<Power>();
}