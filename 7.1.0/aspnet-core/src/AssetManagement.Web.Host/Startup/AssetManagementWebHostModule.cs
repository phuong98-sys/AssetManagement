using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using AssetManagement.Configuration;

namespace AssetManagement.Web.Host.Startup
{
    [DependsOn(
       typeof(AssetManagementWebCoreModule))]
    public class AssetManagementWebHostModule: AbpModule
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public AssetManagementWebHostModule(IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(AssetManagementWebHostModule).GetAssembly());
        }
    }
}
