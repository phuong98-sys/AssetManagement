using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AssetManagement.Migrations
{
    public partial class addedassetTypeIdassettable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AssetTypeId",
                table: "Asset",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Asset_AssetTypeId",
                table: "Asset",
                column: "AssetTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Asset_AssetType_AssetTypeId",
                table: "Asset",
                column: "AssetTypeId",
                principalTable: "AssetType",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Asset_AssetType_AssetTypeId",
                table: "Asset");

            migrationBuilder.DropIndex(
                name: "IX_Asset_AssetTypeId",
                table: "Asset");

            migrationBuilder.DropColumn(
                name: "AssetTypeId",
                table: "Asset");
        }
    }
}
