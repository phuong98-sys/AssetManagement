using Abp.Application.Services;
using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using AssetManagement.ProposeAssets.DTO;

namespace AssetManagement.ProposeAssets
{
    public interface IProposeAssetAppService : IApplicationService
    {
        Task<ListResultDto<ProposeAssetDto>> GetAll();
    }
}