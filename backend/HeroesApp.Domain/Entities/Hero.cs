namespace HeroesApp.Domain.Entities;

public class Hero
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public string NomeHeroi { get; set; } = string.Empty;
    public DateTime? DataNascimento { get; set; }
    public float? Altura { get; set; }
    public float? Peso { get; set; }
    public ICollection<Herosuperpower> HeroisSuperpoderes { get; set; } = new List<Herosuperpower>();
}
