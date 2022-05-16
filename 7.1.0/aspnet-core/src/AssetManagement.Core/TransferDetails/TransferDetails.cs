using Abp.Domain.Entities.Auditing;
using AssetManagement.Assets;
using AssetManagement.Transfers;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManagement.TransferDetails
{
    [Table("TransferDetail")]
    public class TransferDetail : FullAuditedEntity
    {
        [ForeignKey(nameof(TransferId))]
        public Transfer Transfer { get; set; }
        public int? TransferId { get; set; }
        [ForeignKey(nameof(AssetId))]
        public Asset Asset { get; set; }
        public int? AssetId { get; set; }
        public string Describe { get; set; }
    }
}
