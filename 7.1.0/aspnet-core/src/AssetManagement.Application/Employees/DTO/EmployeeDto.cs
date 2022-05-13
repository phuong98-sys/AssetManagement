using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManagement.Employees.DTO
{
    [AutoMapFrom(typeof(Employee))]
    public class EmployeeDto : CreationAuditedEntityDto<int?>
    {
        public const int maxLength = 32;
        [Required]
        [StringLength(maxLength)]
        public string EmployeeCode { get; set; }
        [Required]
        [StringLength(maxLength)]
        public string EmployeeName { get; set; }
        public string? Address { get; set; }
        public string? Note { get; set; }
        public long? DepartmentId { get; set; }
        public string? DepartmentName { get; set; }
    }
}
