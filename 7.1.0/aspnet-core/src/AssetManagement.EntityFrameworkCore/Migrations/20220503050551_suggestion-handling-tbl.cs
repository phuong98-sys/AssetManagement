using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AssetManagement.Migrations
{
    public partial class suggestionhandlingtbl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SuggestionHandlingDetail",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SuggestionHandlingId = table.Column<int>(type: "int", nullable: true),
                    AssetId = table.Column<int>(type: "int", nullable: true),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifierUserId = table.Column<long>(type: "bigint", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeleterUserId = table.Column<long>(type: "bigint", nullable: true),
                    DeletionTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SuggestionHandlingDetail", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SuggestionHandlingDetail_Asset_AssetId",
                        column: x => x.AssetId,
                        principalTable: "Asset",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_SuggestionHandlingDetail_SuggestionHandling_SuggestionHandlingId",
                        column: x => x.SuggestionHandlingId,
                        principalTable: "SuggestionHandling",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_SuggestionHandlingDetail_AssetId",
                table: "SuggestionHandlingDetail",
                column: "AssetId");

            migrationBuilder.CreateIndex(
                name: "IX_SuggestionHandlingDetail_SuggestionHandlingId",
                table: "SuggestionHandlingDetail",
                column: "SuggestionHandlingId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SuggestionHandlingDetail");
        }
    }
}
