namespace MarvelHeroesApi.Data.Entities;

public class Power
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;

    public virtual ICollection<Hero> Heroes { get; set; }
    public virtual ICollection<HeroPower> HeroPowers { get; set; }
}