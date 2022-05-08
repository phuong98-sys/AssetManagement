using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AssetManagement.Migrations
{
    public partial class editsuggestionHanding : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DepartmentName",
                table: "SuggestionHandling",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PetitionerId",
                table: "SuggestionHandling",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SuggestionHandlingStatusName",
                table: "SuggestionHandling",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DepartmentName",
                table: "SuggestionHandling");

            migrationBuilder.DropColumn(
                name: "PetitionerId",
                table: "SuggestionHandling");

            migrationBuilder.DropColumn(
                name: "SuggestionHandlingStatusName",
                table: "SuggestionHandling");
        }
    }
}
