using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Runtime.Session;
using Abp.UI;
using AssetManagement.SuggestionHandlingDetails;
using AssetManagement.SuggestionHandlings.DTO;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManagement.SuggestionHandlings
{
    public class SuggestionHandlingAppService : AssetManagementAppServiceBase, ISuggestionHandlingAppService
    {
        private readonly IRepository<SuggestionHandling> _suggestionHandlingRepository;
        private readonly IRepository<SuggestionHandlingDetail> _suggestionHandlingDetailRepository;
        public SuggestionHandlingAppService(IRepository<SuggestionHandling> suggestionHandlingRepository,
            IRepository<SuggestionHandlingDetail> suggestionHandlingDetailRepository)
        {
            _suggestionHandlingRepository = suggestionHandlingRepository;
            _suggestionHandlingDetailRepository = suggestionHandlingDetailRepository;
        }
        public async Task<ListResultDto<SuggestionHandlingDto>> GetSuggestionHandlings()
        {
            try
            {
                var suggestionHandlings = await _suggestionHandlingRepository.GetAll().ToListAsync();
                var suggestionHandlingDtos = ObjectMapper.Map<List<SuggestionHandlingDto>>(suggestionHandlings);
                return new ListResultDto<SuggestionHandlingDto>(suggestionHandlingDtos);
            }
            catch (Exception e)
            {
                throw (e);

            }
        }
        public async Task<SuggestionHandlingDto> InsertOrUpdateSuggestionHandling(SuggestionHandlingInputDto input)
        {
            try
            {

                if (!input.Id.HasValue)
                {
                    input.CreatorUserId = AbpSession.GetUserId();
                    var suggestionHandling = ObjectMapper.Map<SuggestionHandling>(input);
                    await _suggestionHandlingRepository.InsertAsync(suggestionHandling);
                    await CurrentUnitOfWork.SaveChangesAsync();
                    return ObjectMapper.Map<SuggestionHandlingDto>(suggestionHandling);
                }
                else
                {
                    var suggestionHandling = await _suggestionHandlingRepository.FirstOrDefaultAsync(x => x.Id == input.Id);
                    ObjectMapper.Map(input, suggestionHandling);
                    return ObjectMapper.Map<SuggestionHandlingDto>(suggestionHandling);
                }
                return null;

            }
            catch (Exception e)
            {
                throw (e);
            }

        }
        public SuggestionHandlingDto GetSuggestionHandling(GetSuggestionHandlingInput input)
        {
            try
            {
                var reduceAsset = _suggestionHandlingRepository.FirstOrDefault(x => x.Id == input.Id);
                var output = ObjectMapper.Map<SuggestionHandlingDto>(reduceAsset);
                return output;
            }
            catch (Exception e)
            {
                throw (e);
            }

        }

        public async Task DeleteSuggestionHandling(int input)
        {
            try
            {

                // xóa ở suggestionHandling List Detail
                var suggestionHandlingDetailList = _suggestionHandlingDetailRepository.GetAll().Where(x => x.SuggestionHandlingId == input);
                foreach (var suggestionHandlingDetail in suggestionHandlingDetailList)
                {
                     _suggestionHandlingDetailRepository.Delete(suggestionHandlingDetail);
                    //await CurrentUnitOfWork.SaveChangesAsync();
                }
                // xóa ở phiếu suggestionHandling 
                var suggestionHandling = await _suggestionHandlingRepository.FirstOrDefaultAsync(y => y.Id == input);
               _suggestionHandlingRepository.Delete(suggestionHandling);
                //await CurrentUnitOfWork.SaveChangesAsync();
            }
            catch (Exception e)
            {
                throw (e);
            }
        }
    }
}
