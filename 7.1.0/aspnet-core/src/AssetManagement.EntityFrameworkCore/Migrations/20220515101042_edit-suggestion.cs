using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AssetManagement.Migrations
{
    public partial class editsuggestion : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SuggestionHandlingDetailId",
                table: "SuggestionHandlingDetail",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_SuggestionHandlingDetail_SuggestionHandlingDetailId",
                table: "SuggestionHandlingDetail",
                column: "SuggestionHandlingDetailId");

            migrationBuilder.AddForeignKey(
                name: "FK_SuggestionHandlingDetail_SuggestionHandlingDetail_SuggestionHandlingDetailId",
                table: "SuggestionHandlingDetail",
                column: "SuggestionHandlingDetailId",
                principalTable: "SuggestionHandlingDetail",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SuggestionHandlingDetail_SuggestionHandlingDetail_SuggestionHandlingDetailId",
                table: "SuggestionHandlingDetail");

            migrationBuilder.DropIndex(
                name: "IX_SuggestionHandlingDetail_SuggestionHandlingDetailId",
                table: "SuggestionHandlingDetail");

            migrationBuilder.DropColumn(
                name: "SuggestionHandlingDetailId",
                table: "SuggestionHandlingDetail");
        }
    }
}
