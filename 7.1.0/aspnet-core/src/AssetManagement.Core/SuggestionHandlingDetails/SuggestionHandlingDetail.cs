using Abp.Domain.Entities.Auditing;
using AssetManagement.Assets;
using AssetManagement.SuggestionHandlings;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManagement.SuggestionHandlingDetails
{
    [Table("SuggestionHandlingDetail")]
    public class SuggestionHandlingDetail : FullAuditedEntity
    {   
        [ForeignKey(nameof(SuggestionHandlingId))]
        public SuggestionHandling SuggestionHandling { get; set; } 
        public int? SuggestionHandlingId { get; set; }
        [ForeignKey(nameof(AssetId))]
        public Asset Asset { get; set; }
        public int? AssetId { get; set; }
        public string? HandlingMethod { get; set; }
        public int? HandlingMethodId { get; set; }
        //public List<SuggestionHandling> SuggestionHandlings { get; set; }
        //public List<Asset> Assets { get; set; }
        //public SuggestionHandlingDetail()
        //{
        //    SuggestionHandlings = new List<SuggestionHandling>();
        //    Assets = new List<Asset>();
        //}
    }
}
