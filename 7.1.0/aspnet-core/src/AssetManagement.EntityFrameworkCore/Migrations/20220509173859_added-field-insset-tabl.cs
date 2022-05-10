using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AssetManagement.Migrations
{
    public partial class addedfieldinssettabl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "HandlingMethod",
                table: "SuggestionHandlingDetail",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AssetUnit",
                table: "Asset",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DepartmentId",
                table: "Asset",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "Asset",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Asset_DepartmentId",
                table: "Asset",
                column: "DepartmentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Asset_Department_DepartmentId",
                table: "Asset",
                column: "DepartmentId",
                principalTable: "Department",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Asset_Department_DepartmentId",
                table: "Asset");

            migrationBuilder.DropIndex(
                name: "IX_Asset_DepartmentId",
                table: "Asset");

            migrationBuilder.DropColumn(
                name: "HandlingMethod",
                table: "SuggestionHandlingDetail");

            migrationBuilder.DropColumn(
                name: "AssetUnit",
                table: "Asset");

            migrationBuilder.DropColumn(
                name: "DepartmentId",
                table: "Asset");

            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "Asset");
        }
    }
}
