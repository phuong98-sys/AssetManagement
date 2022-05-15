using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Runtime.Session;
using Abp.UI;
using AssetManagement.Assets.DTO;
using AssetManagement.Authorization.Users;
using AssetManagement.IncreaseAssets.DTO;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManagement.IncreaseAssets
{
    public class IncreaseAssetAppService: AssetManagementAppServiceBase, IIncreaseAssetAppService
    {
        private readonly IRepository<IncreaseAsset> _increaseAssetRepository;
        private readonly IRepository<User, long> _userRepository;
        public IncreaseAssetAppService(IRepository<IncreaseAsset> increaseAssetRepository,
            IRepository<User, long> userRepository)
        {
            _increaseAssetRepository = increaseAssetRepository;
            _userRepository = userRepository;
        }
        public async Task<ListResultDto<IncreaseAssetDto>> GetIncreaseAssets()
        {
            try
            {
                var query =  _increaseAssetRepository.GetAll().Include(x => x.Assets);
                var queryLeftJoin = from q in query
                                    join u in _userRepository.GetAll() on q.CreatorUserId equals u.Id into ps
                                    from u in ps.DefaultIfEmpty()
                                    select new { query = q, CreatorUserName = u == null ? "" : u.Name };
                var increaseAssets = await queryLeftJoin
                    
                    .Select(p => new IncreaseAssetDto()
                {
                    Id = p.query.Id,
                    IncreaseAssetCode = p.query.IncreaseAssetCode,
                    CreationTime = p.query.CreationTime,
                    IncreaseAssetDate = p.query.IncreaseAssetDate,
                    Note = p.query.Note,
                    TotalAssetValue = p.query.Assets.Sum( x => x.OrginalPrice),
                    CreatorUserId = p.query.CreatorUserId,
                    CreatorUserName = p.CreatorUserName,
                    LastModificationTime = p.query.LastModificationTime
    })
                .ToListAsync();
                var increaseAssetsDtos= ObjectMapper.Map<List<IncreaseAssetDto>>(increaseAssets);
                return new ListResultDto<IncreaseAssetDto>(increaseAssetsDtos);
            }
            catch (Exception e)
            {
                throw (e);

            }
        }
        public async Task<IncreaseAssetDto> InsertOrUpdateIncreaseAsset(IncreaseAssetInputDto input)
        {
            try
            {
                if (!input.Id.HasValue)
                {
                    var increaseAsset = ObjectMapper.Map<IncreaseAsset>(input);
                    increaseAsset.CreatorUserId = AbpSession.GetUserId();
                    await _increaseAssetRepository.InsertAsync(increaseAsset);
                    await CurrentUnitOfWork.SaveChangesAsync();
                    return ObjectMapper.Map<IncreaseAssetDto>(increaseAsset);
                }
                else
                {
                    var increaseAsset = await _increaseAssetRepository.FirstOrDefaultAsync(x => x.Id == input.Id);
                    ObjectMapper.Map(input, increaseAsset);
                    return ObjectMapper.Map<IncreaseAssetDto>(increaseAsset);
                }
                return null;
               
            }
            catch (Exception e)
            {
                throw (e);
            }

        }
        public IncreaseAssetDto GetIncreaseAsset(GetIncreaseAssetInput input)
        {
            try
            {
                var increaseAsset = _increaseAssetRepository.FirstOrDefault(x => x.Id == input.Id);
                var output = ObjectMapper.Map<IncreaseAssetDto>(increaseAsset);
                return output;
            }
            catch (Exception e)
            {
                throw (e);
            }

        }
        //public async Task UpdateAsset(UpdateAssetDto input)
        //{
        //    try
        //    {
        //        var asset = await _assetRepository.FirstOrDefaultAsync(x => x.Id == input.Id);
        //        ObjectMapper.Map(input, asset);
        //    }
        //    catch (Exception e)
        //    {
        //        throw (e);
        //    }
        //}

        public async Task DeleteIncreaseAsset(DeleteIncreaseAssetInput input)
        {
            try
            {
                var increaseAsset = _increaseAssetRepository.GetAll().Include(x => x.Assets).Where(x => x.Id == input.Id).FirstOrDefault();
                if (increaseAsset == null)
                {
                    throw new UserFriendlyException("No Data Found");
                }
                //foreach (var asset in increaseAsset.Assets)
                //{
                //    asset.IncreaseAssetId = null;
                //    asset.AmortizationValue = null;
                //    asset.CreationTime = null;
                //    asset.IncreaseAssetDate = null;
                //}

                increaseAsset.Assets.ForEach(asset =>
                {
                    asset.IncreaseAssetId = null;
                    asset.MonthlyAmortizationValue = null;
                    asset.IncreaseAssetDate = null;
                    
                    asset.NumberOfDayUsedAsset = null;
                    asset.AssetStatusId = 1;
                });
                await _increaseAssetRepository.DeleteAsync(increaseAsset);
            }
            catch (Exception e)
            {
                throw (e);
            }
        }
    }
}
