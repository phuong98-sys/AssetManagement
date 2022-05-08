using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManagement.Departments.DTO
{
    [AutoMapFrom(typeof(Department))]
    public class DepartmentDto : CreationAuditedEntityDto<int?>
    {
        public int? Id { get; set; }
        public const int maxLength = 32;
        [Required]
        [StringLength(maxLength)]
        public string DepartmentCode { get; set; }
        [Required]
        [StringLength(maxLength)]
        public string DepartmentName { get; set; }
        public string? Description { get; set; }
        public string? Note { get; set; }
        public DateTime? CreationTime { get; set; }
        public string? LastModifierUserName { get; set; }
        public string? CreatorUserName { get; set; }
        public DateTime? LastModificationTime { get; set; }
    }
    [AutoMapTo(typeof(Department))]
    public class DepartmentInputDto : CreationAuditedEntityDto<int?>
    {
        public int? Id { get; set; }
        public const int maxLength = 32;
        [Required]
        [StringLength(maxLength)]
        public string DepartmentCode { get; set; }
        [Required]
        [StringLength(maxLength)]
        public string DepartmentName { get; set; }
        public string? Description { get; set; }
        public string? Note { get; set; }
        public DateTime? CreationTime { get; set; }
        public string? LastModifierUserName { get; set; }
        public string? CreatorUserName { get; set; }
        public DateTime? LastModificationTime { get; set; }
    }
}
