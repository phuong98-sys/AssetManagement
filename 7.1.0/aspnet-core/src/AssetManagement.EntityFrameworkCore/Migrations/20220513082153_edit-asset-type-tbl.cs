using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AssetManagement.Migrations
{
    public partial class editassettypetbl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "NumberOfYearDepreciation",
                table: "AssetType",
                newName: "MinNumberOfYearDepreciation");

            migrationBuilder.AddColumn<int>(
                name: "MaxNumberOfYearDepreciation",
                table: "AssetType",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MaxNumberOfYearDepreciation",
                table: "AssetType");

            migrationBuilder.RenameColumn(
                name: "MinNumberOfYearDepreciation",
                table: "AssetType",
                newName: "NumberOfYearDepreciation");
        }
    }
}
