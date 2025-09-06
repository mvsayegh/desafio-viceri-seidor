using HeroesApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace HeroesApp.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
        // Habilita Foreign Keys no SQLite
        if (Database.IsSqlite())
            Database.ExecuteSqlRaw("PRAGMA foreign_keys = ON;");
    }

    public DbSet<Hero> Herois { get; set; } = null!;
    public DbSet<Superpower> Superpoderes { get; set; } = null!;
    public DbSet<Herosuperpower> HeroisSuperpoderes { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // ================= Hero =================
        modelBuilder.Entity<Hero>(entity =>
        {
            entity.ToTable("Herois");
            entity.HasKey(e => e.Id);

            entity.Property(e => e.Nome).IsRequired();
            entity.Property(e => e.NomeHeroi).IsRequired();
            entity.Property(e => e.DataNascimento);
            entity.Property(e => e.Altura).IsRequired();
            entity.Property(e => e.Peso).IsRequired();
        });

        // ================= Superpower =================
        modelBuilder.Entity<Superpower>(entity =>
        {
            entity.ToTable("Superpoderes");
            entity.HasKey(e => e.Id);

            entity.Property(e => e.SuperpoderNome)
                  .HasColumnName("Superpoder")
                  .IsRequired();

            entity.Property(e => e.Descricao);

            // Seed de superpoderes
            entity.HasData(
                new Superpower { Id = 1, SuperpoderNome = "Força", Descricao = "Força sobre-humana" },
                new Superpower { Id = 2, SuperpoderNome = "Voo", Descricao = "Capacidade de voar" },
                new Superpower { Id = 3, SuperpoderNome = "Invisibilidade", Descricao = "Ficar invisível aos olhos" }
            );
        });

        // ================= HeroisSuperpoderes (N:N) =================
        modelBuilder.Entity<Herosuperpower>(entity =>
        {
            entity.ToTable("HeroisSuperpoderes");

            // Chave composta
            entity.HasKey(e => new { e.HeroiId, e.SuperpoderId });

            // FK para Hero
            entity.HasOne(hs => hs.Heroi)
                  .WithMany(h => h.HeroisSuperpoderes)
                  .HasForeignKey(hs => hs.HeroiId)
                  .OnDelete(DeleteBehavior.Cascade);

            // FK para Superpower
            entity.HasOne(hs => hs.Superpoder)
                  .WithMany(s => s.HeroisSuperpoderes)
                  .HasForeignKey(hs => hs.SuperpoderId)
                  .OnDelete(DeleteBehavior.Cascade);
        });
    }
}
