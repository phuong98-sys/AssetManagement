﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AssetManagement.Migrations
{
    public partial class addpetitionerName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.AddColumn<int>(
            //    name: "HandlingMethodId",
            //    table: "SuggestionHandlingDetail",
            //    type: "int",
            //    nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PetitionerName",
                table: "SuggestionHandling",
                type: "nvarchar(max)",
                nullable: true);

            //migrationBuilder.CreateTable(
            //    name: "ProposeAssetDetail",
            //    columns: table => new
            //    {
            //        Id = table.Column<int>(type: "int", nullable: false)
            //            .Annotation("SqlServer:Identity", "1, 1"),
            //        ProposeAssetId = table.Column<int>(type: "int", nullable: true),
            //        AssetId = table.Column<int>(type: "int", nullable: true),
            //        AssetName = table.Column<string>(type: "nvarchar(max)", nullable: true),
            //        AssetTypeName = table.Column<string>(type: "nvarchar(max)", nullable: true),
            //        DateFound = table.Column<DateTime>(type: "datetime2", nullable: false),
            //        Quantity = table.Column<int>(type: "int", nullable: false),
            //        Describe = table.Column<string>(type: "nvarchar(max)", nullable: true),
            //        Estimates = table.Column<double>(type: "float", nullable: false),
            //        DepartmentName = table.Column<string>(type: "nvarchar(max)", nullable: true),
            //        DepartmentId = table.Column<int>(type: "int", nullable: true),
            //        CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
            //        CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
            //        LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
            //        LastModifierUserId = table.Column<long>(type: "bigint", nullable: true),
            //        IsDeleted = table.Column<bool>(type: "bit", nullable: false),
            //        DeleterUserId = table.Column<long>(type: "bigint", nullable: true),
            //        DeletionTime = table.Column<DateTime>(type: "datetime2", nullable: true)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_ProposeAssetDetail", x => x.Id);
            //        table.ForeignKey(
            //            name: "FK_ProposeAssetDetail_Asset_AssetId",
            //            column: x => x.AssetId,
            //            principalTable: "Asset",
            //            principalColumn: "Id");
            //        table.ForeignKey(
            //            name: "FK_ProposeAssetDetail_Department_DepartmentId",
            //            column: x => x.DepartmentId,
            //            principalTable: "Department",
            //            principalColumn: "Id");
            //        table.ForeignKey(
            //            name: "FK_ProposeAssetDetail_ProposeAsset_ProposeAssetId",
            //            column: x => x.ProposeAssetId,
            //            principalTable: "ProposeAsset",
            //            principalColumn: "Id");
            //    });

            //migrationBuilder.CreateIndex(
            //    name: "IX_ProposeAssetDetail_AssetId",
            //    table: "ProposeAssetDetail",
            //    column: "AssetId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_ProposeAssetDetail_DepartmentId",
            //    table: "ProposeAssetDetail",
            //    column: "DepartmentId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_ProposeAssetDetail_ProposeAssetId",
            //    table: "ProposeAssetDetail",
            //    column: "ProposeAssetId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProposeAssetDetail");

            migrationBuilder.DropColumn(
                name: "HandlingMethodId",
                table: "SuggestionHandlingDetail");

            migrationBuilder.DropColumn(
                name: "PetitionerName",
                table: "SuggestionHandling");
        }
    }
}
