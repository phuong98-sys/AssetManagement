using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AssetManagement.Migrations
{
    public partial class Create_asset_table_2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Asset",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AssetCode = table.Column<string>(type: "nvarchar(32)", maxLength: 32, nullable: false),
                    AssetName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IncreaseAssetDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    AmortizationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    NumberOfDayUsedAsset = table.Column<int>(type: "int", nullable: false),
                    NumberOfDayRemaing = table.Column<int>(type: "int", nullable: false),
                    OrginalPrice = table.Column<double>(type: "float", nullable: false),
                    AmortizationValue = table.Column<double>(type: "float", nullable: false),
                    DepreciationOfAsset = table.Column<double>(type: "float", nullable: false),
                    ResidualValue = table.Column<double>(type: "float", nullable: false),
                    UsageStatus = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ReasonForReduction = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RecoverableValue = table.Column<double>(type: "float", nullable: false),
                    IncreaseAssetId = table.Column<int>(type: "int", nullable: false),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Asset", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Asset_IncreaseAsset_IncreaseAssetId",
                        column: x => x.IncreaseAssetId,
                        principalTable: "IncreaseAsset",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Asset_IncreaseAssetId",
                table: "Asset",
                column: "IncreaseAssetId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Asset");
        }
    }
}
