using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Runtime.Session;
using Abp.UI;
using AssetManagement.Authorization.Users;
using AssetManagement.ReduceAssets;
using AssetManagement.ReduceAssets.DTO;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManagement.ReduceAssetsH
{
    public class ReduceAssetAppService : AssetManagementAppServiceBase, IReduceAssetAppService
    {
        private readonly IRepository<ReduceAsset> _reduceAssetRepository;
        private readonly IRepository<User, long> _userRepository;
        public ReduceAssetAppService(IRepository<ReduceAsset> reduceAssetRepository,
            IRepository<User, long> userRepository)
        {
            _reduceAssetRepository = reduceAssetRepository;
            _userRepository = userRepository;

        }
        public async Task<ListResultDto<ReduceAssetDto>> GetReduceAssets()
        {
            try
            {
                var query = _reduceAssetRepository.GetAll().Include(x => x.Assets);
                var queryLeftJoin = from q in query
                                    join u in _userRepository.GetAll() on q.CreatorUserId equals u.Id into ps
                                    from u in ps.DefaultIfEmpty()
                                    select new { query = q, CreatorUserName = u == null ? "" : u.Name };
                var reduceAssets = await queryLeftJoin

                    .Select(p => new ReduceAssetDto()
                    {
                        Id = p.query.Id,
                        ReduceAssetCode = p.query.ReduceAssetCode,
                        CreationTime = p.query.CreationTime,
                        ReduceAssetDate = p.query.ReduceAssetDate,
                        Note = p.query.Note,
                        TotalRecovery = (double)p.query.Assets.Sum(x => x.RecoverableValue),
                        CreatorUserId = p.query.CreatorUserId,
                        CreatorUserName = p.CreatorUserName,
                        LastModificationTime = p.query.LastModificationTime
                    })
                .ToListAsync();
                var reduceAssetsDtos = ObjectMapper.Map<List<ReduceAssetDto>>(reduceAssets);
                return new ListResultDto<ReduceAssetDto>(reduceAssetsDtos);
            }
            catch (Exception e)
            {
                throw (e);

            }
        }
        public async Task<ReduceAssetDto> InsertOrUpdateReduceAsset(ReduceAssetInputDto input)
        {
            try
            {
                if (!input.Id.HasValue)
                {
                    var reduceAsset = ObjectMapper.Map<ReduceAsset>(input);
                    reduceAsset.CreatorUserId = AbpSession.GetUserId();
                    await _reduceAssetRepository.InsertAsync(reduceAsset);
                    await CurrentUnitOfWork.SaveChangesAsync();
                    return ObjectMapper.Map<ReduceAssetDto>(reduceAsset);
                }
                else
                {
                    var reduceAsset = await _reduceAssetRepository.FirstOrDefaultAsync(x => x.Id == input.Id);
                    ObjectMapper.Map(input, reduceAsset);
                    return ObjectMapper.Map<ReduceAssetDto>(reduceAsset);
                }
                return null;

            }
            catch (Exception e)
            {
                throw (e);
            }

        }
        public ReduceAssetDto GetReduceAsset(GetReduceAssetInput input)
        {
            try
            {
                var reduceAsset = _reduceAssetRepository.FirstOrDefault(x => x.Id == input.Id);
                var output = ObjectMapper.Map<ReduceAssetDto>(reduceAsset);
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

        public async Task DeleteReduceAsset(DeleteReduceAssetInput input)
        {
            try
            {
                var reduceAsset = _reduceAssetRepository.GetAll().Include(x => x.Assets).Where(x => x.Id == input.Id).FirstOrDefault();
                if (reduceAsset == null)
                {
                    throw new UserFriendlyException("No Data Found");
                }
                //foreach (var asset in reduceAsset.Assets)
                //{
                //    asset.ReduceAssetId = null;
                //    asset.AmortizationValue = null;
                //    asset.CreationTime = null;
                //    asset.ReduceAssetDate = null;
                //}

                reduceAsset.Assets.ForEach(asset =>
                {
                    asset.ReduceAssetId = null;
                    //asset.AmortizationValue = null;
                    asset.ReduceAssetDate = null;
                    //asset.AmortizationValue = null;
                    //asset.NumberOfDayUsedAsset = null;
                    asset.AssetStatusId = 3;
                });
                await _reduceAssetRepository.DeleteAsync(reduceAsset);
            }
            catch (Exception e)
            {
                throw (e);
            }
        }
    }
}
