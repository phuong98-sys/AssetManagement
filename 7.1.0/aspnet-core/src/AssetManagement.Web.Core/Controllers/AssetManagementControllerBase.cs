using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace AssetManagement.Controllers
{
    public abstract class AssetManagementControllerBase: AbpController
    {
        protected AssetManagementControllerBase()
        {
            LocalizationSourceName = AssetManagementConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
