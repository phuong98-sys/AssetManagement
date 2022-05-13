using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AssetManagement.Employees.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManagement.Employees
{
    public interface IEmployeeAppService : IApplicationService
    {
        Task<ListResultDto<EmployeeDto>> GetEmployees();
    }
}
