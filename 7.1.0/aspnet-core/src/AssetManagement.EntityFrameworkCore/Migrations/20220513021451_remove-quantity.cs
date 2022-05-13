using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AssetManagement.Migrations
{
    public partial class removequantity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropColumn(
            //    name: "AssetUnit",
            //    table: "Asset");

            //migrationBuilder.DropColumn(
            //    name: "Quantity",
            //    table: "Asset");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AssetUnit",
                table: "Asset",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "Asset",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
