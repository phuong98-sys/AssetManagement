using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AssetManagement.Migrations
{
    public partial class createreasonreducetable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            //migrationBuilder.DropForeignKey(
            //   name: "FK_Asset_ReasonReduction_ReasonReductionId",
            //   table: "Asset");

            migrationBuilder.DropTable(
                name: "ReasonReduction");

            //migrationBuilder.DropIndex(
            //    name: "IX_Asset_ReasonReductionId",
            //    table: "Asset");

            //migrationBuilder.DropColumn(
            //    name: "ReasonReductionId",
            //    table: "Asset");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
