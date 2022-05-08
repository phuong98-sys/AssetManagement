using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Runtime.Session;
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
        public SuggestionHandlingAppService(IRepository<SuggestionHandling> suggestionHandlingRepository)
        {
            _suggestionHandlingRepository = suggestionHandlingRepository;
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

                if (input.Id == 0)
                {
                    input.CreatorUserId = AbpSession.GetUserId();
                    var suggestionHandling = ObjectMapper.Map<SuggestionHandling>(input);
                    await _suggestionHandlingRepository.InsertAsync(suggestionHandling);
                    await CurrentUnitOfWork.SaveChangesAsync();
                    return ObjectMapper.Map<SuggestionHandlingDto>(suggestionHandling);
                }
                if (input.Id > 0)
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
    }
}
