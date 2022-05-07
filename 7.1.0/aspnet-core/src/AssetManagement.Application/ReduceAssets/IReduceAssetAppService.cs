using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AssetManagement.ReduceAssets.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManagement.ReduceAssets
{
    public interface IReduceAssetAppService : IApplicationService
    {
        Task<ListResultDto<ReduceAssetDto>> GetReduceAssets();
        Task<ReduceAssetDto> InsertOrUpdateReduceAsset(ReduceAssetInputDto input);
        ReduceAssetDto GetReduceAsset(GetReduceAssetInput input);
        Task DeleteReduceAsset(DeleteReduceAssetInput input);
    }
}
