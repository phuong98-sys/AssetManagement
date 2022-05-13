using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using AssetManagement.Employees.DTO;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManagement.Employees
{
    public class EmployeeAppService : AssetManagementAppServiceBase, IEmployeeAppService
    {
        private readonly IRepository<Employee> _employeeRepository;
        public EmployeeAppService(IRepository<Employee> employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }
        public async Task<ListResultDto<EmployeeDto>> GetEmployees()
        {
            try
            {
                var employees = await _employeeRepository.GetAll().ToListAsync();
                var employeeDtos = ObjectMapper.Map<List<EmployeeDto>>(employees);
                return new ListResultDto<EmployeeDto>(employeeDtos);
            }
            catch (Exception e)
            {
                throw (e);

            }
        }
    }
}
