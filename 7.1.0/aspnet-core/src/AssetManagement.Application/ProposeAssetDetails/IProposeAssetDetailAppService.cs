using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services;
using AssetManagement.ProposeAssetDetails.DTO;

namespace AssetManagement.ProposeAssetDetails
{
    public interface IProposeAssetDetailAppService : IApplicationService
    {
        Task<ListResultDto<ProposeAssetDetailDto>> GetProposeAssetDetails();
        ProposeAssetDetailDto GetProposeAssetDetail(GetProposeAssetDetailInput input);
        Task<ProposeAssetDetailListDto> InsertOrUpdateProposeAssetDetail(ProposeAssetDetailInputDto input);
    }
}