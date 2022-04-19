using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using AssetManagement.Authorization.Roles;
using AssetManagement.Authorization.Users;
using AssetManagement.MultiTenancy;
using WS.PropertyTypes;

namespace AssetManagement.EntityFrameworkCore
{
    public class AssetManagementDbContext : AbpZeroDbContext<Tenant, Role, User, AssetManagementDbContext>
    {
        /* Define a DbSet for each entity of the application */
        public DbSet<PropertyType> PropertyTypes { get; set; }
        public AssetManagementDbContext(DbContextOptions<AssetManagementDbContext> options)
            : base(options)
        {
        }
    }
}
