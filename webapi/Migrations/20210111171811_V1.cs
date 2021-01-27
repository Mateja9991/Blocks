using Microsoft.EntityFrameworkCore.Migrations;

namespace webapi.Migrations
{
    public partial class V1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Balls",
                columns: table => new
                {
                    User = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Speed = table.Column<float>(type: "real", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Balls", x => x.User);
                });

            migrationBuilder.CreateTable(
                name: "Sliders",
                columns: table => new
                {
                    User = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Color = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sliders", x => x.User);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Username = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HighScore = table.Column<int>(type: "int", nullable: false),
                    LoptaUser = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    SliderUser = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Username);
                    table.ForeignKey(
                        name: "FK_Users_Balls_LoptaUser",
                        column: x => x.LoptaUser,
                        principalTable: "Balls",
                        principalColumn: "User",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Users_Sliders_SliderUser",
                        column: x => x.SliderUser,
                        principalTable: "Sliders",
                        principalColumn: "User",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_LoptaUser",
                table: "Users",
                column: "LoptaUser");

            migrationBuilder.CreateIndex(
                name: "IX_Users_SliderUser",
                table: "Users",
                column: "SliderUser");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Balls");

            migrationBuilder.DropTable(
                name: "Sliders");
        }
    }
}
