using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using AssetManagement.PlaneShops.DTO;

namespace AssetManagement.PlaneShops
{
    public class PlaneShopAppService : AssetManagementAppServiceBase, IPlaneShopAppService
    {
        private readonly IRepository<PlaneShop> _planeShop;
        public PlaneShopAppService(IRepository<PlaneShop> planeShop)
        {
            _planeShop = planeShop;
        }
        public async Task<ListResultDto<PlaneShopDto>> GetAll()
        {
            try
            {
                var planeShops = await _planeShop.GetAll().ToListAsync();
                var planeShopDtos = ObjectMapper.Map<List<PlaneShopDto>>(planeShops);
                return new ListResultDto<PlaneShopDto>(planeShopDtos);
            }
            catch (Exception e)
            {
                throw (e);

            }
        }
    }
}