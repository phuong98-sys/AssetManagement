using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AssetManagement.Migrations
{
    public partial class addemployeeeID : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "EmployeeId",
                table: "Asset",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Asset_EmployeeId",
                table: "Asset",
                column: "EmployeeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Asset_Employee_EmployeeId",
                table: "Asset",
                column: "EmployeeId",
                principalTable: "Employee",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Asset_Employee_EmployeeId",
                table: "Asset");

            migrationBuilder.DropIndex(
                name: "IX_Asset_EmployeeId",
                table: "Asset");

            migrationBuilder.DropColumn(
                name: "EmployeeId",
                table: "Asset");
        }
    }
}
