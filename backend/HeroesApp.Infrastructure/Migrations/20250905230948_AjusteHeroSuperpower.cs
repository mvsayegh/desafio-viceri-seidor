using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace HeroesApp.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AjusteHeroSuperpower : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SuperpoderNome",
                table: "Superpoderes",
                newName: "Superpoder");

            migrationBuilder.InsertData(
                table: "Superpoderes",
                columns: new[] { "Id", "Descricao", "Superpoder" },
                values: new object[,]
                {
                    { 1, "Força sobre-humana", "Força" },
                    { 2, "Capacidade de voar", "Voo" },
                    { 3, "Ficar invisível aos olhos", "Invisibilidade" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Superpoderes",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Superpoderes",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Superpoderes",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.RenameColumn(
                name: "Superpoder",
                table: "Superpoderes",
                newName: "SuperpoderNome");
        }
    }
}
