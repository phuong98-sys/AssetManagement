using Abp.Domain.Entities.Auditing;
using AssetManagement.Departments;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManagement.SuggestionHandlings
{
    [Table("SuggestionHandling")]
    public class SuggestionHandling : FullAuditedEntity
    {
        public const int maxLength = 32;
        [Required]
        [StringLength(maxLength)]
        public string SuggestionHandlingCode { get; set; }
        public string SuggestionHandlingName { get; set; }
        public DateTime SuggestionHandlingDate { get; set; }
        public DateTime ImplementationDate { get; set; }
        public string? Description { get; set; }
        public int SuggestionHandlingStatus { get; set; }
        public int? ApproverId { get; set; }
        public int? UserId { get; set; }
       
        [ForeignKey(nameof(DepartmentId))]
        public Department Department { get; set; } // them tu department table
        public int? DepartmentId { get; set; }
    }
}
