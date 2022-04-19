using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using AssetManagement.EntityFrameworkCore;
using AssetManagement.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace AssetManagement.Web.Tests
{
    [DependsOn(
        typeof(AssetManagementWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class AssetManagementWebTestModule : AbpModule
    {
        public AssetManagementWebTestModule(AssetManagementEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(AssetManagementWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(AssetManagementWebMvcModule).Assembly);
        }
    }
}