namespace MarvelHeroesApi.Dtos.Power;

public class UpdatePower
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
}