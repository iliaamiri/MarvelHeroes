namespace MarvelHeroesApi.Dtos.Hero;

public class CreateHero
{
    public string HeroName { get; set; } = null!;
    public string? SecretIdentity { get; set; }
    public string Gender { get; set; } = null!;
    
    public DateTime BirthDate { get; set; }
    public DateTime FirstAppearance { get; set; }
    
    public List<int> PowersIds { get; set; } = new List<int>();
}