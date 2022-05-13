using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AssetManagement.Migrations
{
    public partial class changenamemonthly : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AmortizationValue",
                table: "Asset",
                newName: "MonthlyAmortizationValue");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "MonthlyAmortizationValue",
                table: "Asset",
                newName: "AmortizationValue");
        }
    }
}
