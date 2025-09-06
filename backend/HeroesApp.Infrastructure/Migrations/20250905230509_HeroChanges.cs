using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HeroesApp.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class HeroChanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Superpoder",
                table: "Superpoderes",
                newName: "SuperpoderNome");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SuperpoderNome",
                table: "Superpoderes",
                newName: "Superpoder");
        }
    }
}
