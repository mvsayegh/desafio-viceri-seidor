using HeroesApp.Application.DTOs;
using System.ComponentModel.DataAnnotations;

public class HeroDto
{
    public int Id { get; set; }

    [Required(ErrorMessage = "O nome do herói é obrigatório")]
    [StringLength(100, ErrorMessage = "O nome não pode ter mais de 100 caracteres")]
    public string Nome { get; set; } = string.Empty;

    [Required(ErrorMessage = "O nome do herói é obrigatório")]
    [StringLength(100, ErrorMessage = "O nome do herói não pode ter mais de 100 caracteres")]
    public string NomeHeroi { get; set; } = string.Empty;

    [Required(ErrorMessage = "Deve existir pelo menos um superpoder")]
    [MinLength(1, ErrorMessage = "Deve existir pelo menos um superpoder")]
    public List<int> SuperpoderId { get; set; } = new();

    public DateTime? DataNascimento { get; set; } = null;

    [Range(0.5, 3, ErrorMessage = "Altura deve estar entre 0,5m e 3m")]
    public float Altura { get; set; }

    [Range(1, 500, ErrorMessage = "Peso deve estar entre 1kg e 500kg")]
    public float Peso { get; set; }

}
