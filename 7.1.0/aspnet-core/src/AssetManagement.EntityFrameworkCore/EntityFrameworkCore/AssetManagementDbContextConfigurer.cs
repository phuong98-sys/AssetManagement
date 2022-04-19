using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace AssetManagement.EntityFrameworkCore
{
    public static class AssetManagementDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<AssetManagementDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<AssetManagementDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}
