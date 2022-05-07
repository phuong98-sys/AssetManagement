using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AssetManagement.Migrations
{
    public partial class addedreduceAssetDateintoassettable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "ReduceAssetDate",
                table: "Asset",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ReduceAssetId",
                table: "Asset",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Asset_ReduceAssetId",
                table: "Asset",
                column: "ReduceAssetId");

            migrationBuilder.AddForeignKey(
                name: "FK_Asset_ReduceAsset_ReduceAssetId",
                table: "Asset",
                column: "ReduceAssetId",
                principalTable: "ReduceAsset",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Asset_ReduceAsset_ReduceAssetId",
                table: "Asset");

            migrationBuilder.DropIndex(
                name: "IX_Asset_ReduceAssetId",
                table: "Asset");

            migrationBuilder.DropColumn(
                name: "ReduceAssetDate",
                table: "Asset");

            migrationBuilder.DropColumn(
                name: "ReduceAssetId",
                table: "Asset");
        }
    }
}
