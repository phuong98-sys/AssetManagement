using Abp.Domain.Entities.Auditing;
using AssetManagement.Assets;
using AssetManagement.Departments;
using AssetManagement.ProposeAssets;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManagement.ProposeAssetDetails
{
    [Table("ProposeAssetDetail")]
    public class ProposeAssetDetail : FullAuditedEntity
    {
        [ForeignKey(nameof(ProposeAssetId))]
        public ProposeAsset ProposeAsset { get; set; }
        public int? ProposeAssetId { get; set; }
        [ForeignKey(nameof(AssetId))]
        public Asset Asset { get; set; }
        public int? AssetId { get; set; }
        public string AssetName { get; set; }
        public string AssetTypeName { get; set; }
        public DateTime DateFound { get; set; }
        public int Quantity { get; set; }
        public string Describe { get; set; }
        public double Estimates { get; set; }
        [ForeignKey(nameof(DepartmentId))]
        public Department Department { get; set; }
        public string DepartmentName { get; set; }
        public int? DepartmentId { get; set; }
        public DateTime CreationTime { get; set; }
        public ProposeAssetDetail()
        {

        }
    }
}
