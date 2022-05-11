using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.UI;
using AssetManagement.Transfers.DTO;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManagement.Transfers
{
    public class TransferAppService : AssetManagementAppServiceBase, ITransferAppService
    {
        private readonly IRepository<Transfer> _transferRepository;
        public TransferAppService(IRepository<Transfer> transferRepository)
        {
            _transferRepository = transferRepository;
        }
        public async Task<ListResultDto<TransferDto>> GetTransfers()
        {
            try
            {
                var transfers = await _transferRepository.GetAll()
                    .Select(a => new TransferDto
                    {
                        Id = a.Id,
                        NumbersTransfer = a.NumbersTransfer,
                        DateFound = a.DateFound,
                        DepartmentName = a.DepartmentName,
                        Content = a.Content,
                        Approver = a.Approver,
                        ApprovalStatus = a.ApprovalStatus,
                        UserCode = a.UserCode,
                        CreationTime = a.CreationTime
                    }).ToListAsync();
                var transferDtos = ObjectMapper.Map<List<TransferDto>>(transfers);
                return new ListResultDto<TransferDto>(transferDtos);
            }
            catch (Exception e)
            {
                throw (e);

            }
        }
        public async Task<TransferListDto> InsertOrUpdateTransfer(TransferInputDto input)
        {
            try
            {
                if (!input.Id.HasValue)
                {

                    var transfer = ObjectMapper.Map<Transfer>(input);
                    await _transferRepository.InsertAsync(transfer);
                    await CurrentUnitOfWork.SaveChangesAsync();
                    return ObjectMapper.Map<TransferListDto>(transfer);
                }
                else
                {


                    var transferForEdit = await _transferRepository.FirstOrDefaultAsync(x => x.Id == input.Id);
                    ObjectMapper.Map(input, transferForEdit);
                    return ObjectMapper.Map<TransferListDto>(transferForEdit);
                }
                return null;

            }
            catch (Exception e)
            {
                throw (e);
            }

        }
        public TransferDto GetTransfer(GetTransferInput input)
        {
            try
            {
                var employee = _transferRepository.FirstOrDefault(x => x.Id == input.Id);
                var output = ObjectMapper.Map<TransferDto>(employee);
                return output;
            }
            catch (Exception e)
            {
                throw (e);
            }

        }
        public async Task DeleteTransfer(DeleteTransferInput input)
        {
            try
            {
                var task = _transferRepository.FirstOrDefault(x => x.Id == input.Id);
                if (task == null)
                {
                    throw new UserFriendlyException("No Data Found");
                }
                else
                {
                    _transferRepository.Delete(task);
                }
            }
            catch (Exception e)
            {
                throw (e);
            }

        }
    }
}

