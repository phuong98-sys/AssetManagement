using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using AssetManagement.Authorization;

namespace AssetManagement
{
    [DependsOn(
        typeof(AssetManagementCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class AssetManagementApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<AssetManagementAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(AssetManagementApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}
