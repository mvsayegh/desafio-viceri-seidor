namespace HeroesApp.Domain.Entities;

public class Superpower
{
    public int Id { get; set; }
    public string SuperpoderNome { get; set; } = string.Empty;
    public string? Descricao { get; set; }

    public ICollection<Herosuperpower> HeroisSuperpoderes { get; set; } = new List<Herosuperpower>();
}
