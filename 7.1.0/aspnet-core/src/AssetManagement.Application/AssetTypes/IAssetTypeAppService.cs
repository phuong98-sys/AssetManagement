using Abp.Application.Services;
using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using WS.AssetTypes.DTO;

namespace WS.AssetTypes
{
    public interface IAssetTypeAppService: IApplicationService
    {
        Task<ListResultDto<AssetTypeDto>> GetAssetTypes();
        Task<AssetTypeDto> InsertOrUpdateAssetType(AssetTypeInputDto input);
        Task DeleteAssetType(DeleteAssetTypeDto input);
    }
}
