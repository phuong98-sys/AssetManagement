using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AssetManagement.Migrations
{
    public partial class editincreaseassettbl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "CreatorUserId",
                table: "IncreaseAsset",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "DeleterUserId",
                table: "IncreaseAsset",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletionTime",
                table: "IncreaseAsset",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "IncreaseAsset",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastModificationTime",
                table: "IncreaseAsset",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "LastModifierUserId",
                table: "IncreaseAsset",
                type: "bigint",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatorUserId",
                table: "IncreaseAsset");

            migrationBuilder.DropColumn(
                name: "DeleterUserId",
                table: "IncreaseAsset");

            migrationBuilder.DropColumn(
                name: "DeletionTime",
                table: "IncreaseAsset");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "IncreaseAsset");

            migrationBuilder.DropColumn(
                name: "LastModificationTime",
                table: "IncreaseAsset");

            migrationBuilder.DropColumn(
                name: "LastModifierUserId",
                table: "IncreaseAsset");
        }
    }
}
