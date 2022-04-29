using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManagement.AssetStatuses
{   
    [Table("AssetStatus")]
    public class AssetStatus : Entity
    {
        public const int maxLength = 32;
        [Required]
        [StringLength(maxLength)]
        public string AssetStatusCode { get; set; }
        [Required]
        [StringLength(maxLength)]
        public string AssetStatusName { get; set; }
        public AssetStatus()
        {
           
        }
    }
}
