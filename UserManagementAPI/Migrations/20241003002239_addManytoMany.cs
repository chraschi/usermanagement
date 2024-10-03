using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UserManagementAPI.Migrations
{
    /// <inheritdoc />
    public partial class addManytoMany : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Permissions_SecurityGroups_SecurityGroupId",
                table: "Permissions");

            migrationBuilder.DropIndex(
                name: "IX_Permissions_SecurityGroupId",
                table: "Permissions");

            migrationBuilder.DropColumn(
                name: "SecurityGroupId",
                table: "Permissions");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Permissions",
                newName: "PermissionName");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Permissions",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "PermissionSecurityGroup",
                columns: table => new
                {
                    PermissionsId = table.Column<int>(type: "integer", nullable: false),
                    SecurityGroupsId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PermissionSecurityGroup", x => new { x.PermissionsId, x.SecurityGroupsId });
                    table.ForeignKey(
                        name: "FK_PermissionSecurityGroup_Permissions_PermissionsId",
                        column: x => x.PermissionsId,
                        principalTable: "Permissions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PermissionSecurityGroup_SecurityGroups_SecurityGroupsId",
                        column: x => x.SecurityGroupsId,
                        principalTable: "SecurityGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PermissionSecurityGroup_SecurityGroupsId",
                table: "PermissionSecurityGroup",
                column: "SecurityGroupsId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PermissionSecurityGroup");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Permissions");

            migrationBuilder.RenameColumn(
                name: "PermissionName",
                table: "Permissions",
                newName: "Name");

            migrationBuilder.AddColumn<int>(
                name: "SecurityGroupId",
                table: "Permissions",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Permissions_SecurityGroupId",
                table: "Permissions",
                column: "SecurityGroupId");

            migrationBuilder.AddForeignKey(
                name: "FK_Permissions_SecurityGroups_SecurityGroupId",
                table: "Permissions",
                column: "SecurityGroupId",
                principalTable: "SecurityGroups",
                principalColumn: "Id");
        }
    }
}
