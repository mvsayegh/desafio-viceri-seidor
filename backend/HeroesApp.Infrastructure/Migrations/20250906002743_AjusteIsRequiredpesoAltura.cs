using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HeroesApp.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AjusteIsRequiredpesoAltura : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<float>(
                name: "Peso",
                table: "Herois",
                type: "REAL",
                nullable: false,
                defaultValue: 0f,
                oldClrType: typeof(float),
                oldType: "REAL",
                oldNullable: true);

            migrationBuilder.AlterColumn<float>(
                name: "Altura",
                table: "Herois",
                type: "REAL",
                nullable: false,
                defaultValue: 0f,
                oldClrType: typeof(float),
                oldType: "REAL",
                oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<float>(
                name: "Peso",
                table: "Herois",
                type: "REAL",
                nullable: true,
                oldClrType: typeof(float),
                oldType: "REAL");

            migrationBuilder.AlterColumn<float>(
                name: "Altura",
                table: "Herois",
                type: "REAL",
                nullable: true,
                oldClrType: typeof(float),
                oldType: "REAL");
        }
    }
}
