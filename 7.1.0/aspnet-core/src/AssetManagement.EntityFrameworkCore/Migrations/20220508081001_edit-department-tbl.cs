using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AssetManagement.Migrations
{
    public partial class editdepartmenttbl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "CreatorUserId",
                table: "Department",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "DeleterUserId",
                table: "Department",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletionTime",
                table: "Department",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Department",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastModificationTime",
                table: "Department",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "LastModifierUserId",
                table: "Department",
                type: "bigint",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatorUserId",
                table: "Department");

            migrationBuilder.DropColumn(
                name: "DeleterUserId",
                table: "Department");

            migrationBuilder.DropColumn(
                name: "DeletionTime",
                table: "Department");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Department");

            migrationBuilder.DropColumn(
                name: "LastModificationTime",
                table: "Department");

            migrationBuilder.DropColumn(
                name: "LastModifierUserId",
                table: "Department");
        }
    }
}
