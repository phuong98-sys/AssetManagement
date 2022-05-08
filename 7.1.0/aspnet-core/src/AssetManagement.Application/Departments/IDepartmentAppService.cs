using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AssetManagement.Departments.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManagement.Departments
{
    public interface IDepartmentAppService : IApplicationService
    {
        Task<ListResultDto<DepartmentDto>> GetDepartments();
        Task<DepartmentDto> InsertOrUpdateDepartment(DepartmentInputDto input);
    }
}
