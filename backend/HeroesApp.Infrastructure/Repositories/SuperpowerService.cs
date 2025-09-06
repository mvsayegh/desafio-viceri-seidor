using HeroesApp.Application.DTOs;
using HeroesApp.Application.Interfaces;
using HeroesApp.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace HeroesApp.Infrastructure.Repositories;

public class SuperpowerService : ISuperpowerService
{
    private readonly AppDbContext _context;

    public SuperpowerService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<SuperpowerDto>> GetAllAsync()
    {
        return await _context.Superpoderes
            .Select(sp => new SuperpowerDto
            {
                Id = sp.Id,
                SuperpoderNome = sp.SuperpoderNome,
                Descricao = sp.Descricao
            })
            .ToListAsync();
    }
}
