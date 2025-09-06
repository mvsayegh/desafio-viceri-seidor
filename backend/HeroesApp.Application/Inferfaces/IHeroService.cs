using HeroesApp.Application.DTOs;

namespace HeroesApp.Application.Interfaces;

public interface IHeroService
{
    Task<List<HeroDto>> GetAllAsync();
    Task<HeroDto?> GetByIdAsync(int id);
    Task<HeroDto> CreateAsync(HeroDto heroDto);
    Task<HeroDto> UpdateAsync(int id, HeroDto heroDto);
    Task<bool> DeleteAsync(int id);
}
