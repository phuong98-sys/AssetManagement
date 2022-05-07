using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AssetManagement.Migrations
{
    public partial class edtincreaseassettable2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropForeignKey(
            //    name: "FK_ReasonReduction_IncreaseAsset_IncreaseAssetId",
            //    table: "ReasonReduction");

            //migrationBuilder.DropIndex(
            //    name: "IX_ReasonReduction_IncreaseAssetId",
            //    table: "ReasonReduction");

            migrationBuilder.DropColumn(
                name: "IncreaseAssetId",
                table: "ReasonReduction");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "IncreaseAssetId",
                table: "ReasonReduction",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ReasonReduction_IncreaseAssetId",
                table: "ReasonReduction",
                column: "IncreaseAssetId");

            migrationBuilder.AddForeignKey(
                name: "FK_ReasonReduction_IncreaseAsset_IncreaseAssetId",
                table: "ReasonReduction",
                column: "IncreaseAssetId",
                principalTable: "IncreaseAsset",
                principalColumn: "Id");
        }
    }
}
