using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AssetManagement.Migrations
{
    public partial class editassettable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AssetTypeName",
                table: "Asset",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "CreatorUserId",
                table: "Asset",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "DeleterUserId",
                table: "Asset",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletionTime",
                table: "Asset",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Asset",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastModificationTime",
                table: "Asset",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "LastModifierUserId",
                table: "Asset",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TenantId",
                table: "Asset",
                type: "int",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AssetTypeName",
                table: "Asset");

            migrationBuilder.DropColumn(
                name: "CreatorUserId",
                table: "Asset");

            migrationBuilder.DropColumn(
                name: "DeleterUserId",
                table: "Asset");

            migrationBuilder.DropColumn(
                name: "DeletionTime",
                table: "Asset");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Asset");

            migrationBuilder.DropColumn(
                name: "LastModificationTime",
                table: "Asset");

            migrationBuilder.DropColumn(
                name: "LastModifierUserId",
                table: "Asset");

            migrationBuilder.DropColumn(
                name: "TenantId",
                table: "Asset");
        }
    }
}
