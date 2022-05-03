using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AssetManagement.Migrations
{
    public partial class editproposeassettable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.AddColumn<long>(
            //    name: "CreatorUserId",
            //    table: "ProposeAsset",
            //    type: "bigint",
            //    nullable: true);

            //migrationBuilder.AddColumn<long>(
            //    name: "DeleterUserId",
            //    table: "ProposeAsset",
            //    type: "bigint",
            //    nullable: true);

            //migrationBuilder.AddColumn<DateTime>(
            //    name: "DeletionTime",
            //    table: "ProposeAsset",
            //    type: "datetime2",
            //    nullable: true);

            //migrationBuilder.AddColumn<bool>(
            //    name: "IsDeleted",
            //    table: "ProposeAsset",
            //    type: "bit",
            //    nullable: false,
            //    defaultValue: false);

            //migrationBuilder.AddColumn<DateTime>(
            //    name: "LastModificationTime",
            //    table: "ProposeAsset",
            //    type: "datetime2",
            //    nullable: true);

            //migrationBuilder.AddColumn<long>(
            //    name: "LastModifierUserId",
            //    table: "ProposeAsset",
            //    type: "bigint",
            //    nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropColumn(
            //    name: "CreatorUserId",
            //    table: "ProposeAsset");

            //migrationBuilder.DropColumn(
            //    name: "DeleterUserId",
            //    table: "ProposeAsset");

            //migrationBuilder.DropColumn(
            //    name: "DeletionTime",
            //    table: "ProposeAsset");

            //migrationBuilder.DropColumn(
            //    name: "IsDeleted",
            //    table: "ProposeAsset");

            //migrationBuilder.DropColumn(
            //    name: "LastModificationTime",
            //    table: "ProposeAsset");

            //migrationBuilder.DropColumn(
            //    name: "LastModifierUserId",
            //    table: "ProposeAsset");
        }
    }
}
