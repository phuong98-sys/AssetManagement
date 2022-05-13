using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.UI;
using AssetManagement.PlaneShops.DTO;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManagement.PlaneShops
{
    public class PlaneShopAppService : AssetManagementAppServiceBase, IPlaneShopAppService
    {
        private readonly IRepository<PlaneShop> _planeShopRepository;
        public PlaneShopAppService(IRepository<PlaneShop> planeShopRepository)
        {
            _planeShopRepository = planeShopRepository;
        }
        public async Task<ListResultDto<PlaneShopDto>> GetPlaneShops()
        {
            try
            {
                var planeShops = await _planeShopRepository.GetAll()
                    .Select(a => new PlaneShopDto
                    {
                        Id = a.Id,
                        PlanPeriod = a.PlanPeriod,
                        DateFound = a.DateFound,
                        Content = a.Content,
                        Approver = a.Approver,
                        ApprovalStatus = a.ApprovalStatus,
                        UserCode = a.UserCode,
                        CreationTime = a.CreationTime
                    }).ToListAsync();
                var planeShopDtos = ObjectMapper.Map<List<PlaneShopDto>>(planeShops);
                return new ListResultDto<PlaneShopDto>(planeShopDtos);
            }
            catch (Exception e)
            {
                throw (e);

            }
        }
        public async Task<PlaneShopListDto> InsertOrUpdatePlaneShop(PlaneShopInputDto input)
        {
            try
            {
                if (!input.Id.HasValue)
                {

                    var planeShop = ObjectMapper.Map<PlaneShop>(input);
                    await _planeShopRepository.InsertAsync(planeShop);
                    await CurrentUnitOfWork.SaveChangesAsync();
                    return ObjectMapper.Map<PlaneShopListDto>(planeShop);
                }
                else
                {


                    var planeShopForEdit = await _planeShopRepository.FirstOrDefaultAsync(x => x.Id == input.Id);
                    ObjectMapper.Map(input, planeShopForEdit);
                    return ObjectMapper.Map<PlaneShopListDto>(planeShopForEdit);
                }
                return null;

            }
            catch (Exception e)
            {
                throw (e);
            }

        }
        public PlaneShopDto GetPlaneShop(GetPlaneShopInput input)
        {
            try
            {
                var employee = _planeShopRepository.FirstOrDefault(x => x.Id == input.Id);
                var output = ObjectMapper.Map<PlaneShopDto>(employee);
                return output;
            }
            catch (Exception e)
            {
                throw (e);
            }

        }
        public async Task DeletePlaneShop(DeletePlaneShopInput input)
        {
            try
            {
                var task = _planeShopRepository.FirstOrDefault(x => x.Id == input.Id);
                if (task == null)
                {
                    throw new UserFriendlyException("No Data Found");
                }
                else
                {
                    _planeShopRepository.Delete(task);
                }
            }
            catch (Exception e)
            {
                throw (e);
            }

        }
    }
}