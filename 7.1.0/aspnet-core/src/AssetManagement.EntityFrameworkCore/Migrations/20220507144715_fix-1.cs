using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AssetManagement.Migrations
{
    public partial class fix1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropForeignKey(
            //    name: "FK_Asset_ReasonReduction_ReasonReductionId",
            //    table: "Asset");

            //migrationBuilder.DropIndex(
            //    name: "IX_Asset_ReasonReductionId",
            //    table: "Asset");

            //migrationBuilder.DropColumn(
            //    name: "ReasonReductionId",
            //    table: "Asset");

            migrationBuilder.CreateTable(
                name: "ReasonReduce",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ReasonReduceCode = table.Column<string>(type: "nvarchar(32)", maxLength: 32, nullable: false),
                    ReasonReducesnName = table.Column<string>(type: "nvarchar(32)", maxLength: 32, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReasonReduce", x => x.Id);
                });
            migrationBuilder.DropColumn(
              name: "IncreaseAssetId",
              table: "ReasonReduction");
            migrationBuilder.DropTable(
              name: "ReasonReduction");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ReasonReduce");

            migrationBuilder.AddColumn<int>(
                name: "ReasonReductionId",
                table: "Asset",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Asset_ReasonReductionId",
                table: "Asset",
                column: "ReasonReductionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Asset_ReasonReduction_ReasonReductionId",
                table: "Asset",
                column: "ReasonReductionId",
                principalTable: "ReasonReduction",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
