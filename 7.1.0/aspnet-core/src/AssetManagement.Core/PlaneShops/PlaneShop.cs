using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace AssetManagement.PlaneShops
{
    [Table("PlaneShop")]
    public class PlaneShop : FullAuditedEntity
    {
        public const int maxLength = 32;
        [Required]
        [StringLength(maxLength)]
        public string PlanPeriod { get; set; }
        public DateTime? DateFound { get; set; }
        public string Content { get; set; }
        public string Approver { get; set; }
        public string ApprovalStatus { get; set; }
        public string UserCode { get; set; }
        public DateTime CreationTime { get; set; }
        public PlaneShop()
        {
        }
    }
}
