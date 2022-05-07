using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AssetManagement.Migrations
{
    public partial class editreduceassettbl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "CreatorUserId",
                table: "ReduceAsset",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "DeleterUserId",
                table: "ReduceAsset",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletionTime",
                table: "ReduceAsset",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "ReduceAsset",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastModificationTime",
                table: "ReduceAsset",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "LastModifierUserId",
                table: "ReduceAsset",
                type: "bigint",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatorUserId",
                table: "ReduceAsset");

            migrationBuilder.DropColumn(
                name: "DeleterUserId",
                table: "ReduceAsset");

            migrationBuilder.DropColumn(
                name: "DeletionTime",
                table: "ReduceAsset");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "ReduceAsset");

            migrationBuilder.DropColumn(
                name: "LastModificationTime",
                table: "ReduceAsset");

            migrationBuilder.DropColumn(
                name: "LastModifierUserId",
                table: "ReduceAsset");
        }
    }
}
