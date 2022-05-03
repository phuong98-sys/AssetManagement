using Microsoft.EntityFrameworkCore.Migrations;
using System;

#nullable disable

namespace AssetManagement.Migrations
{
    public partial class proposeassettable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.CreateTable(
            //    name: "ProposeAsset",
            //    columns: table => new
            //    {
            //        Id = table.Column<int>(type: "int", nullable: false)
            //            .Annotation("SqlServer:Identity", "1, 1"),
            //        NumbersProposeAsset = table.Column<string>(type: "nvarchar(32)", maxLength: 32, nullable: false),
            //        DateFound = table.Column<DateTime>(type: "datetime2", nullable: true),
            //        Proponent = table.Column<string>(type: "nvarchar(max)", nullable: true),
            //        Content = table.Column<string>(type: "nvarchar(max)", nullable: true),
            //        Approver = table.Column<string>(type: "nvarchar(max)", nullable: true),
            //        ApprovalStatus = table.Column<string>(type: "nvarchar(max)", nullable: true),
            //        UserCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
            //        CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_ProposeAsset", x => x.Id);
            //    });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
          name: "ProposeAsset");
        }
    }
}
