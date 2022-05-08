using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManagement.Departments
{
    [Table("Department")]
    public class Department : FullAuditedEntity
    {
        public const int maxLength = 32;
        [Required]
        [StringLength(maxLength)]
        public string DepartmentCode { get; set; }
        [Required]
        [StringLength(maxLength)]
        public string DepartmentName { get; set; }
        public string? Description { get; set; }
        public string? Note { get; set; }
    }
}
