using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AssetManagement.Assets.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManagement.Assets
{
    public interface IAssetAppService: IApplicationService
    {
        Task<ListResultDto<AssetDto>> GetAssets();
        AssetDto GetAsset(GetAssetInput input);
        Task<AssetListDto> InsertOrUpdateAsset(AssetInputDto input);
        Task IncreaseAssetList(List<AssetInputDto> t);
    }
}
