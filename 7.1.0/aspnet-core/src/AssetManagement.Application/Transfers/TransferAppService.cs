using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Runtime.Session;
using Abp.UI;
using AssetManagement.TransferDetails;
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
        private readonly IRepository<TransferDetail> _transferDetailRepository;
        public TransferAppService(IRepository<Transfer> transferRepository,
            IRepository<TransferDetail> transferDetailRepository)
        {
            _transferRepository = transferRepository;
            _transferDetailRepository = transferDetailRepository;
        }
        public async Task<ListResultDto<TransferDto>> GetTransfers()
        {
            try
            {
                var transfers = await _transferRepository.GetAll().ToListAsync();
                var transferDtos = ObjectMapper.Map<List<TransferDto>>(transfers);
                return new ListResultDto<TransferDto>(transferDtos);
            }
            catch (Exception e)
            {
                throw (e);

            }
        }
        public async Task<TransferDto> InsertOrUpdateTransfer(TransferInputDto input)
        {
            try
            {

                if (!input.Id.HasValue)
                {
                    input.CreatorUserId = AbpSession.GetUserId();
                    var transfer = ObjectMapper.Map<Transfer>(input);
                    await _transferRepository.InsertAsync(transfer);
                    await CurrentUnitOfWork.SaveChangesAsync();
                    return ObjectMapper.Map<TransferDto>(transfer);
                }
                else
                {
                    var transfer = await _transferRepository.FirstOrDefaultAsync(x => x.Id == input.Id);
                    ObjectMapper.Map(input, transfer);
                    return ObjectMapper.Map<TransferDto>(transfer);
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
                var reduceAsset = _transferRepository.FirstOrDefault(x => x.Id == input.Id);
                var output = ObjectMapper.Map<TransferDto>(reduceAsset);
                return output;
            }
            catch (Exception e)
            {
                throw (e);
            }

        }

        public async Task DeleteTransfer(int input)
        {
            try
            {

                // xóa ở transfer List Detail
                var transferDetailList = _transferDetailRepository.GetAll().Where(x => x.TransferId == input).ToList();
                foreach (var transferDetail in transferDetailList)
                {
                    _transferDetailRepository.Delete(transferDetail);
                    await CurrentUnitOfWork.SaveChangesAsync();
                }
                // xóa ở phiếu transfer 
                var transfer = _transferRepository.GetAll().Where(y => y.Id == input).FirstOrDefault();
                await _transferRepository.DeleteAsync(transfer);
                await CurrentUnitOfWork.SaveChangesAsync();
            }
            catch (Exception e)
            {
                throw (e);
            }
        }
    }
}
