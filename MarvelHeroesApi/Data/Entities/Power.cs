namespace MarvelHeroesApi.Data.Entities;

public class Power
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;

    public ICollection<Hero> Heroes { get; set; } = new List<Hero>();
}