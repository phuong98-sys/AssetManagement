using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AssetManagement.Migrations
{
    public partial class updaereducetbl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ReduceMethod",
                table: "Asset",
                newName: "ReasonReduceNote");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ReasonReduceNote",
                table: "Asset",
                newName: "ReduceMethod");
        }
    }
}
