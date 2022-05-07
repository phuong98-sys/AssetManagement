using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AssetManagement.ReasonReduces.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManagement.ReasonReduces
{
    public interface IReasonReduceAppService : IApplicationService
    {
        Task<ListResultDto<ReasonReduceDto>> GetReasonReduces();
    }
}
