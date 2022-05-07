using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AssetManagement.Migrations
{
    public partial class createreasonreducetbl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ReasonReductionId",
                table: "Asset",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "ReasonReduction",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ReasonReductionCode = table.Column<string>(type: "nvarchar(32)", maxLength: 32, nullable: false),
                    ReasonReductionName = table.Column<string>(type: "nvarchar(32)", maxLength: 32, nullable: false),
                    IncreaseAssetId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReasonReduction", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ReasonReduction_IncreaseAsset_IncreaseAssetId",
                        column: x => x.IncreaseAssetId,
                        principalTable: "IncreaseAsset",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Asset_ReasonReductionId",
                table: "Asset",
                column: "ReasonReductionId");

            migrationBuilder.CreateIndex(
                name: "IX_ReasonReduction_IncreaseAssetId",
                table: "ReasonReduction",
                column: "IncreaseAssetId");

            migrationBuilder.AddForeignKey(
                name: "FK_Asset_ReasonReduction_ReasonReductionId",
                table: "Asset",
                column: "ReasonReductionId",
                principalTable: "ReasonReduction",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Asset_ReasonReduction_ReasonReductionId",
                table: "Asset");

            migrationBuilder.DropTable(
                name: "ReasonReduction");

            migrationBuilder.DropIndex(
                name: "IX_Asset_ReasonReductionId",
                table: "Asset");

            migrationBuilder.DropColumn(
                name: "ReasonReductionId",
                table: "Asset");
        }
    }
}
