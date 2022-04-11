using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace WS.EntityFrameworkCore
{
    public static class WSDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<WSDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<WSDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}