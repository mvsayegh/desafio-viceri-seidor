using HeroesApp.Application.DTOs;

namespace HeroesApp.Application.Interfaces;

public interface ISuperpowerService
{
    Task<List<SuperpowerDto>> GetAllAsync();
}
