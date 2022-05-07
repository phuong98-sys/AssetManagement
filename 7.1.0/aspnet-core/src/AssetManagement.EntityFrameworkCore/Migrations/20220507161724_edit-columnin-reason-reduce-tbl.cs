using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AssetManagement.Migrations
{
    public partial class editcolumninreasonreducetbl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ReasonReducesnName",
                table: "ReasonReduce",
                newName: "ReasonReduceName");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ReasonReduceName",
                table: "ReasonReduce",
                newName: "ReasonReducesnName");
        }
    }
}
