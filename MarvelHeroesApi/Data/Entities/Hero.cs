namespace MarvelHeroesApi.Data.Entities;

public class Hero
{
    public int Id { get; set; }
    public string HeroName { get; set; } = null!;
    public string? SecretIdentity { get; set; }
    public string Gender { get; set; } = null!;
    
    public DateTime BirthDate { get; set; }
    public DateTime FirstAppearance { get; set; }
    
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    
    public ICollection<Power> Powers { get; set; } = new List<Power>();
}