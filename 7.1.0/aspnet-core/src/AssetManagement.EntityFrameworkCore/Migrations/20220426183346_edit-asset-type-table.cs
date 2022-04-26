using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AssetManagement.Migrations
{
    public partial class editassettypetable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Asset_AssetType_AssetTypeId",
                table: "Asset");

            migrationBuilder.AlterColumn<int>(
                name: "AssetTypeId",
                table: "Asset",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

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

            migrationBuilder.AlterColumn<int>(
                name: "AssetTypeId",
                table: "Asset",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Asset_AssetType_AssetTypeId",
                table: "Asset",
                column: "AssetTypeId",
                principalTable: "AssetType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
