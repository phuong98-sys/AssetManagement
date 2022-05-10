using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AssetManagement.Migrations
{
    public partial class addeddepartmentIdassettable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Asset_Department_DepartmentId",
                table: "Asset");

            migrationBuilder.DropIndex(
                name: "IX_Asset_DepartmentId",
                table: "Asset");

            migrationBuilder.DropColumn(
                name: "DepartmentId",
                table: "Asset");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DepartmentId",
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
    }
}
