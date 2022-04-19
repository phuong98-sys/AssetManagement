using System.Threading.Tasks;
using AssetManagement.Configuration.Dto;

namespace AssetManagement.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
