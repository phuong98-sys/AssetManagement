using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using AssetManagement.Assets;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace AssetManagement.PlaneMaintains
{
    [Table("PlaneMaintain")]
    public class PlaneMaintain : FullAuditedEntity
    {
        public DateTime? ExpectedDate { get; set; }
        public double Estimates { get; set; }
        public string MaintenanceType { get; set; }
        public string Describe { get; set; }
       
        [ForeignKey(nameof(AssetId))]
        public Asset Asset { get; set; } // them tu Asset table
        public int? AssetId { get; set; }
        public string DepartmentName { get; set; }
        public DateTime CreationTime { get; set; }
        public PlaneMaintain()
        {
        }
    }
}
