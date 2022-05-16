using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AssetManagement.Assets.DTO;
using AssetManagement.SuggestionHandlings.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManagement.Assets
{
    public interface IAssetAppService: IApplicationService
    {
        Task<ListResultDto<AssetDto>> GetAssets();
        AssetDto GetAsset(GetAssetInput input);
        Task<AssetListDto> InsertOrUpdateAsset(AssetInputDto input);
        Task IncreaseAssetList(List<AssetInputDto> inputList, int index);
        //Task test(List<AssetInputDto> inputList, int index);
        Task DeleteAsset(DeleteAssetInput input);
        Task ReduceAssetList(List<AssetInputDto> inputList, int index);
        //Task DeleteListAssetReduced(List<AssetInputDto> inputList);
        Task<ListResultDto<AssetDto>> GetAssetReduced(int reduceId);
        Task<ListResultDto<SuggestionHandlingDetailDto>> SuggestionHandlingList(List<AssetSuggestionHandlingDto> inputList, int suggestionHandlingId, int index);
        Task<ListResultDto<AssetSuggestionHandlingDto>> GetSuggestionHandling(int suggestionHandlingId);
        Task DeleteSuggestionHandling(List<AssetSuggestionHandlingDto> inputList, int suggestionHandlingId);
    }
}
