using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using AssetManagement.Authorization.Roles;
using AssetManagement.Authorization.Users;
using AssetManagement.MultiTenancy;
using WS.PropertyTypes;
using AssetManagement.IncreaseAssets;
using AssetManagement.Assets;
using AssetManagement.AssetTypes;
using AssetManagement.ReduceAssets;
using AssetManagement.Departments;
using AssetManagement.AssetStatuses;
using AssetManagement.PlaneShops;
using AssetManagement.SuggestionHandlings;
using AssetManagement.ProposeAssets;
using AssetManagement.SuggestionHandlingDetails;
using AssetManagement.ReasonRuduces;
using AssetManagement.PlaneMaintains;
using AssetManagement.Transfers;
using AssetManagement.ProposeAssetDetails;

namespace AssetManagement.EntityFrameworkCore
{
    public class AssetManagementDbContext : AbpZeroDbContext<Tenant, Role, User, AssetManagementDbContext>
    {
        /* Define a DbSet for each entity of the application */
        public DbSet<PropertyType> PropertyTypes { get; set; }
        public DbSet<IncreaseAsset> IncreaseAssets { get; set; }
        public DbSet<Asset> Assets { get; set; }
        public DbSet<AssetType> AssetTypes { get; set; }
        public DbSet<ReduceAsset> ReduceAssets { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<AssetStatus> AssetStatuses { get; set; }
        public DbSet<PlaneShop> PlaneShops { get; set; }
        public DbSet<SuggestionHandling> SuggestionHandlings { get; set; }
        public DbSet<ProposeAsset> ProposeAssets { get; set; }
        public DbSet<SuggestionHandlingDetail> SuggestionHandlingDetails { get; set; }
        public DbSet<ReasonReduce> ReasonReduces { get; set; }
        public DbSet<PlaneMaintain> PlaneMaintains { get; set; }
        public DbSet<Transfer> Transfers { get; set; }
        public DbSet<ProposeAssetDetail> ProposeAssetDetails { get; set; }
        public AssetManagementDbContext(DbContextOptions<AssetManagementDbContext> options)
            : base(options)
        {
        }
    }
}
