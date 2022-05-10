using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AssetManagement.Migrations
{
    public partial class addeduserIdinassettbl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "UserId",
                table: "Asset",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Asset_UserId",
                table: "Asset",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Asset_AbpUsers_UserId",
                table: "Asset",
                column: "UserId",
                principalTable: "AbpUsers",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Asset_AbpUsers_UserId",
                table: "Asset");

            migrationBuilder.DropIndex(
                name: "IX_Asset_UserId",
                table: "Asset");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Asset");
        }
    }
}
