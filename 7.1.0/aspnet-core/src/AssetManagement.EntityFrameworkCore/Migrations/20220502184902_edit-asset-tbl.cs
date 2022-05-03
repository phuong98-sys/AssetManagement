using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AssetManagement.Migrations
{
    public partial class editassettbl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AmortizationDate",
                table: "Asset");

            migrationBuilder.AlterColumn<DateTime>(
                name: "IncreaseAssetDate",
                table: "Asset",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);

            migrationBuilder.AddColumn<double>(
                name: "NumberOfDayAmortization",
                table: "Asset",
                type: "float",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NumberOfDayAmortization",
                table: "Asset");

            migrationBuilder.AlterColumn<DateTime>(
                name: "IncreaseAssetDate",
                table: "Asset",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AddColumn<DateTime>(
                name: "AmortizationDate",
                table: "Asset",
                type: "datetime2",
                nullable: true);
        }
    }
}
