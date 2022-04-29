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
    public interface IPlaneShopAppService : IApplicationService
    {
        Task<ListResultDto<PlaneShopDto>> GetAll();
    }
}