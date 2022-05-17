using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Runtime.Session;
using AssetManagement.Depreciations.DTO;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManagement.Depreciations
{
    public class DepreciationAppService : AssetManagementAppServiceBase, IDepreciationAppService
    {
        private readonly IRepository<Depreciation> _DepreciationRepository;
        private readonly IRepository<DepreciationDetail> _DepreciationDetailRepository;
        public DepreciationAppService(IRepository<Depreciation> DepreciationRepository,
            IRepository<DepreciationDetail> DepreciationDetailRepository)
        {
            _DepreciationRepository = DepreciationRepository;
            _DepreciationDetailRepository = DepreciationDetailRepository;
        }
        public async Task<ListResultDto<DepreciationDto>> GetDepreciations()
        {
            try
            {
                var Depreciations = await _DepreciationRepository.GetAll().ToListAsync();
                var DepreciationDtos = ObjectMapper.Map<List<DepreciationDto>>(Depreciations);
                return new ListResultDto<DepreciationDto>(DepreciationDtos);
            }
            catch (Exception e)
            {
                throw (e);

            }
        }
        public async Task<DepreciationDto> InsertOrUpdateDepreciation(DepreciationInputDto input)
        {
            try
            {

                if (!input.Id.HasValue)
                {
                    input.CreatorUserId = AbpSession.GetUserId();
                    var depreciation = ObjectMapper.Map<Depreciation>(input);
                    await _DepreciationRepository.InsertAsync(depreciation);
                    await CurrentUnitOfWork.SaveChangesAsync();
                    return ObjectMapper.Map<DepreciationDto>(depreciation);
                }
                else
                {
                    var depreciation = await _DepreciationRepository.FirstOrDefaultAsync(x => x.Id == input.Id);
                    ObjectMapper.Map(input, depreciation);
                    return ObjectMapper.Map<DepreciationDto>(depreciation);
                }
                return null;

            }
            catch (Exception e)
            {
                throw (e);
            }

        }
        public DepreciationDto GetDepreciation(GetDepreciationInput input)
        {
            try
            {
                var reduceAsset = _DepreciationRepository.FirstOrDefault(x => x.Id == input.Id);
                var output = ObjectMapper.Map<DepreciationDto>(reduceAsset);
                return output;
            }
            catch (Exception e)
            {
                throw (e);
            }

        }

        public async Task DeleteDepreciation(int input)
        {
            try
            {

                // xóa ở depreciation List Detail
                var DepreciationDetailList = _DepreciationDetailRepository.GetAll().Where(x => x.DepreciationId == input);
                foreach (var DepreciationDetail in DepreciationDetailList)
                {
                    _DepreciationDetailRepository.Delete(DepreciationDetail);
                    //await CurrentUnitOfWork.SaveChangesAsync();
                }
                // xóa ở phiếu depreciation 
                var depreciation = await _DepreciationRepository.FirstOrDefaultAsync(y => y.Id == input);
                _DepreciationRepository.Delete(depreciation);
                //await CurrentUnitOfWork.SaveChangesAsync();
            }
            catch (Exception e)
            {
                throw (e);
            }
        }
    }

    
        
    }
