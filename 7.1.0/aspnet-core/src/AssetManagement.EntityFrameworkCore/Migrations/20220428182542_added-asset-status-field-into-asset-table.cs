using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AssetManagement.Migrations
{
    public partial class addedassetstatusfieldintoassettable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AssetStatusId",
                table: "Asset",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Asset_AssetStatusId",
                table: "Asset",
                column: "AssetStatusId");

            migrationBuilder.AddForeignKey(
                name: "FK_Asset_AssetStatus_AssetStatusId",
                table: "Asset",
                column: "AssetStatusId",
                principalTable: "AssetStatus",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Asset_AssetStatus_AssetStatusId",
                table: "Asset");

            migrationBuilder.DropIndex(
                name: "IX_Asset_AssetStatusId",
                table: "Asset");

            migrationBuilder.DropColumn(
                name: "AssetStatusId",
                table: "Asset");
        }
    }
}
