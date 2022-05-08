using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AssetManagement.SuggestionHandlings.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManagement.SuggestionHandlings
{
    public interface ISuggestionHandlingAppService : IApplicationService
    {
        Task<ListResultDto<SuggestionHandlingDto>> GetSuggestionHandlings();
        Task<SuggestionHandlingDto> InsertOrUpdateSuggestionHandling(SuggestionHandlingInputDto input);
    }
}
