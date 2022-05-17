using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AssetManagement.Depreciations.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManagement.Depreciations
{
    public interface IDepreciationAppService : IApplicationService
    {
        Task<ListResultDto<DepreciationDto>> GetDepreciations();
        Task<DepreciationDto> InsertOrUpdateDepreciation(DepreciationInputDto input);
        DepreciationDto GetDepreciation(GetDepreciationInput input);

    }
}
