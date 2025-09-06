using HeroesApp.Application.Interfaces;
using HeroesApp.Domain.Entities;
using HeroesApp.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

public class HeroService : IHeroService
{
    private readonly AppDbContext _context;

    public HeroService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<HeroDto>> GetAllAsync()
    {
        return await _context.Herois
            .Include(h => h.HeroisSuperpoderes)
            .OrderByDescending(h => h.Id)
            .Select(h => new HeroDto
            {
                Id = h.Id,
                Nome = h.Nome,
                NomeHeroi = h.NomeHeroi,
                DataNascimento = h.DataNascimento,
                Altura = h.Altura ?? 0,
                Peso = h.Peso ?? 0,
                SuperpoderId = h.HeroisSuperpoderes.Select(hs => hs.SuperpoderId).ToList()
            }).ToListAsync();
    }

    public async Task<HeroDto?> GetByIdAsync(int id)
    {
        var hero = await _context.Herois
            .Include(h => h.HeroisSuperpoderes)
            .FirstOrDefaultAsync(h => h.Id == id);

        if (hero == null) return null;

        return new HeroDto
        {
            Id = hero.Id,
            Nome = hero.Nome,
            NomeHeroi = hero.NomeHeroi,
            DataNascimento = hero.DataNascimento,
            Altura = hero.Altura ?? 0,
            Peso = hero.Peso ?? 0,
            SuperpoderId = hero.HeroisSuperpoderes.Select(hs => hs.SuperpoderId).ToList()
        };
    }

    public async Task<HeroDto> CreateAsync(HeroDto heroDto)
    {
        if (await _context.Herois.AnyAsync(h => h.NomeHeroi == heroDto.NomeHeroi))
            throw new Exception("Já existe um herói com esse nome de herói.");

        if (await _context.Herois.AnyAsync(h => h.Nome == heroDto.Nome))
            throw new Exception("Já existe um herói com esse nome.");

        if (await _context.Herois.AnyAsync(h => h.DataNascimento > DateTime.Today))
            throw new Exception("Não é possível cadastrar uma data de nascimento futura.");

        var hero = new Hero
        {
            Nome = heroDto.Nome,
            NomeHeroi = heroDto.NomeHeroi,
            DataNascimento = heroDto.DataNascimento,
            Altura = heroDto.Altura,
            Peso = heroDto.Peso
        };

        _context.Herois.Add(hero);
        await _context.SaveChangesAsync();

        // Vincula superpoderes
        foreach (var spId in heroDto.SuperpoderId)
        {
            if (!await _context.Superpoderes.AnyAsync(sp => sp.Id == spId))
                throw new Exception($"SuperpoderId {spId} não existe.");

            _context.HeroisSuperpoderes.Add(new Herosuperpower
            {
                HeroiId = hero.Id,
                SuperpoderId = spId
            });
        }

        await _context.SaveChangesAsync();
        heroDto.Id = hero.Id;
        return heroDto;
    }

    public async Task<HeroDto> UpdateAsync(int id, HeroDto heroDto)
    {
        var hero = await _context.Herois
            .Include(h => h.HeroisSuperpoderes)
            .FirstOrDefaultAsync(h => h.Id == id);

        if (hero == null) throw new Exception("Herói não encontrado");

        if (await _context.Herois.AnyAsync(h => h.NomeHeroi == heroDto.NomeHeroi && h.Id != id))
            throw new Exception("Já existe outro herói com esse nome de herói.");

        if (await _context.Herois.AnyAsync(h => h.Nome == heroDto.Nome && h.Id != id))
            throw new Exception("Já existe outro herói com esse nome.");

        if (await _context.Herois.AnyAsync(h => h.DataNascimento > DateTime.Today))
            throw new Exception("Não é possível cadastrar uma data de nascimento futura.");

        hero.Nome = heroDto.Nome;
        hero.NomeHeroi = heroDto.NomeHeroi;
        hero.DataNascimento = heroDto.DataNascimento;
        hero.Altura = heroDto.Altura;
        hero.Peso = heroDto.Peso;

        // Remove superpoderes que não existem mais
        var toRemove = hero.HeroisSuperpoderes
            .Where(hs => !heroDto.SuperpoderId.Contains(hs.SuperpoderId))
            .ToList();

        _context.HeroisSuperpoderes.RemoveRange(toRemove);

        // Adiciona superpoderes novos
        var existingIds = hero.HeroisSuperpoderes.Select(hs => hs.SuperpoderId).ToList();
        var toAddIds = heroDto.SuperpoderId.Except(existingIds);

        foreach (var spId in toAddIds)
        {
            if (!await _context.Superpoderes.AnyAsync(sp => sp.Id == spId))
                throw new Exception($"SuperpoderId {spId} não existe.");

            _context.HeroisSuperpoderes.Add(new Herosuperpower
            {
                HeroiId = hero.Id,
                SuperpoderId = spId
            });
        }

        await _context.SaveChangesAsync();
        return heroDto;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var hero = await _context.Herois.FindAsync(id);
        if (hero == null) return false;

        _context.Herois.Remove(hero);
        await _context.SaveChangesAsync();
        return true;
    }
}
