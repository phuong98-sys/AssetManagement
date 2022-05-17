using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using AssetManagement.Transfers.DTO;
using Abp.Application.Services;

namespace AssetManagement.Transfers
{
    public interface ITransferAppService : IApplicationService
    {
        Task<ListResultDto<TransferDto>> GetTransfers();
        Task<TransferDto> InsertOrUpdateTransfer(TransferInputDto input);
        TransferDto GetTransfer(GetTransferInput input);
    }
}