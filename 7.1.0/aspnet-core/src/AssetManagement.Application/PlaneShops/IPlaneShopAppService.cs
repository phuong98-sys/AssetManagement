using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using AssetManagement.PlaneShops.DTO;
using Abp.Application.Services;

namespace AssetManagement.PlaneShops
{
    public interface IPlaneShopAppService : IApplicationService
    {
        Task<ListResultDto<PlaneShopDto>> GetPlaneShops();
        PlaneShopDto GetPlaneShop(GetPlaneShopInput input);
        Task<PlaneShopListDto> InsertOrUpdatePlaneShop(PlaneShopInputDto input);
    }
}