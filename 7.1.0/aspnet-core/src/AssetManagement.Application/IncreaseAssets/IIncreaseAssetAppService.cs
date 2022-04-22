using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AssetManagement.IncreaseAssets.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManagement.IncreaseAssets
{
    public interface IIncreaseAssetAppService: IApplicationService
    {
        Task<IncreaseAssetDto> InsertOrUpdateIncreaseAsset(IncreaseAssetInputDto input);
        Task<ListResultDto<IncreaseAssetDto>> GetIncreaseAssets();
        Task DeleteIncreaseAsset(DeleteIncreaseAssetInput input);
    }
}
