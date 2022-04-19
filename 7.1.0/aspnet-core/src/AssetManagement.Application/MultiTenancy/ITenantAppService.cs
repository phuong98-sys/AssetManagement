using Abp.Application.Services;
using AssetManagement.MultiTenancy.Dto;

namespace AssetManagement.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

