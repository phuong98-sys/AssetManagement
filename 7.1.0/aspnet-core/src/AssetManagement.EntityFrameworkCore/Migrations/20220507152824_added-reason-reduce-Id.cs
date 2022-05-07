using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AssetManagement.Migrations
{
    public partial class addedreasonreduceId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ReasonReduceId",
                table: "Asset",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Asset_ReasonReduceId",
                table: "Asset",
                column: "ReasonReduceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Asset_ReasonReduce_ReasonReduceId",
                table: "Asset",
                column: "ReasonReduceId",
                principalTable: "ReasonReduce",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Asset_ReasonReduce_ReasonReduceId",
                table: "Asset");

            migrationBuilder.DropIndex(
                name: "IX_Asset_ReasonReduceId",
                table: "Asset");

            migrationBuilder.DropColumn(
                name: "ReasonReduceId",
                table: "Asset");
        }
    }
}
