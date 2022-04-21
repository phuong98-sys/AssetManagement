using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using AssetManagement.Authorization.Roles;
using AssetManagement.Authorization.Users;
using AssetManagement.MultiTenancy;
using WS.PropertyTypes;
using AssetManagement.IncreaseAssets;
using AssetManagement.Assets;
using AssetManagement.AssetTypes;

namespace AssetManagement.EntityFrameworkCore
{
    public class AssetManagementDbContext : AbpZeroDbContext<Tenant, Role, User, AssetManagementDbContext>
    {
        /* Define a DbSet for each entity of the application */
        public DbSet<PropertyType> PropertyTypes { get; set; }
        public DbSet<IncreaseAsset> IncreaseAssets { get; set; }
        public DbSet<Asset> Assets { get; set; }
        public DbSet<AssetType> AssetTypes { get; set; }
        public AssetManagementDbContext(DbContextOptions<AssetManagementDbContext> options)
            : base(options)
        {
        }
    }
}
