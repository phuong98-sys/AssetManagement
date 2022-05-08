using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Runtime.Session;
using AssetManagement.Departments.DTO;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManagement.Departments
{
    public class DepartmentAppService : AssetManagementAppServiceBase, IDepartmentAppService
    {
        private readonly IRepository<Department> _departmentRepository;
        public DepartmentAppService(IRepository<Department> departmentRepository)
        {
            _departmentRepository = departmentRepository;
        }
        public async Task<ListResultDto<DepartmentDto>> GetDepartments()
        {
            try
            {
                var departments = await _departmentRepository.GetAll().ToListAsync();
                var departmentDtos = ObjectMapper.Map<List<DepartmentDto>>(departments);
                return new ListResultDto<DepartmentDto>(departmentDtos);
            }
            catch (Exception e)
            {
                throw (e);

            }
        }
        public async Task<DepartmentDto> InsertOrUpdateDepartment(DepartmentInputDto input)
        {
            try
            {
                
                if (input.Id == 0)
                {
                    input.CreatorUserId = AbpSession.GetUserId();
                    var department = ObjectMapper.Map<Department>(input);
                    await _departmentRepository.InsertAsync(department);
                    await CurrentUnitOfWork.SaveChangesAsync();
                    return ObjectMapper.Map<DepartmentDto>(department);
                }
                if (input.Id > 0)
                {
                    var department = await _departmentRepository.FirstOrDefaultAsync(x => x.Id == input.Id);
                    ObjectMapper.Map(input, department);
                    return ObjectMapper.Map<DepartmentDto>(department);
                }
                return null;

            }
            catch (Exception e)
            {
                throw (e);
            }

        }
    }
 
       
    }
