using MarvelHeroesApi.Data.Entities;

namespace MarvelHeroesApi.Dtos.Hero;

public class UpdatePayload
{
    public int Id { get; set; }
    public string HeroName { get; set; } = null!;
    public string? SecretIdentity { get; set; }
    public string Gender { get; set; } = null!;

    public DateTime BirthDate { get; set; }
    public DateTime FirstAppearance { get; set; }
    
    public List<int> PowersIds { get; set; } = new List<int>();
}