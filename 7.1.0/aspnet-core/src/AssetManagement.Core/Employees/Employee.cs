using Abp.Domain.Entities;
using AssetManagement.Assets;
using AssetManagement.Departments;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManagement.Employees
{
    [Table("Employee")]
    public class Employee: Entity
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
        [ForeignKey(nameof(DepartmentId))]
        public Department Department { get; set; }

        public int? DepartmentId { get; set; }

        public object ToListAsync()
        {
            throw new NotImplementedException();
        }
    }
}
