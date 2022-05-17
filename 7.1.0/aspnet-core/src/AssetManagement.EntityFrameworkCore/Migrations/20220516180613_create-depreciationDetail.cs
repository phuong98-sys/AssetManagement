using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AssetManagement.Migrations
{
    public partial class createdepreciationDetail : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DepreciationDetail",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DepreciationId = table.Column<int>(type: "int", nullable: true),
                    AssetId = table.Column<int>(type: "int", nullable: true),
                    HandlingMethod = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HandlingMethodId = table.Column<int>(type: "int", nullable: true),
                    AmortizationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    OrginalPrice = table.Column<double>(type: "float", nullable: false),
                    MonthlyAmortizationValue = table.Column<double>(type: "float", nullable: false),
                    DepreciationOfAsset = table.Column<double>(type: "float", nullable: false),
                    ResidualValue = table.Column<double>(type: "float", nullable: false),
                    NumberOfDayUsedAsset = table.Column<int>(type: "int", nullable: false),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifierUserId = table.Column<long>(type: "bigint", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeleterUserId = table.Column<long>(type: "bigint", nullable: true),
                    DeletionTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DepreciationDetail", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DepreciationDetail_Asset_AssetId",
                        column: x => x.AssetId,
                        principalTable: "Asset",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_DepreciationDetail_Depreciation_DepreciationId",
                        column: x => x.DepreciationId,
                        principalTable: "Depreciation",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_DepreciationDetail_AssetId",
                table: "DepreciationDetail",
                column: "AssetId");

            migrationBuilder.CreateIndex(
                name: "IX_DepreciationDetail_DepreciationId",
                table: "DepreciationDetail",
                column: "DepreciationId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DepreciationDetail");
        }
    }
}
