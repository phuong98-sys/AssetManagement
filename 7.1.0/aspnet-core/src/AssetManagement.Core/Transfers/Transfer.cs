using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManagement.Transfers
{
    [Table("Transfer")]
    public class Transfer : FullAuditedEntity
    {
        public const int maxLength = 32;
        [Required]
        [StringLength(maxLength)]
        public string NumbersTransfer { get; set; }
        public DateTime? DateFound { get; set; }
        public string DepartmentName { get; set; }
        public string Content { get; set; }
        public string Approver { get; set; }
        public string ApprovalStatus { get; set; }
        public string UserCode { get; set; }
        public DateTime CreationTime { get; set; }
        public Transfer()
        {
        }
    }
}
