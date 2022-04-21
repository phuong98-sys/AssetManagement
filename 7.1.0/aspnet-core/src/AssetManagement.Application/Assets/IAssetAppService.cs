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
        Task<ListResultDto<AssetDto>> GetAll();
        Task<AssetListDto> InsertAsset(AssetInputDto input);
        AssetDto GetAsset(GetAssetInput input);
        Task UpdateAsset(UpdateAssetDto input);
    }
}
