using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using AssetManagement.ProposeAssets.DTO;
using Abp.Application.Services;

namespace AssetManagement.ProposeAssets
{
    public interface IProposeAssetAppService : IApplicationService
    {
        Task<ListResultDto<ProposeAssetDto>> GetProposeAssets();
        ProposeAssetDto GetProposeAsset(GetProposeAssetInput input);
        Task<ProposeAssetListDto> InsertOrUpdateProposeAsset(ProposeAssetInputDto input);
    }
}