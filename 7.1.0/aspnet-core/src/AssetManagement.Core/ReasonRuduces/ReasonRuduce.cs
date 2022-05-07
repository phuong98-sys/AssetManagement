using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManagement.ReasonRuduces
{
    [Table("ReasonReduce")]
    public class ReasonReduce : Entity
    {
        public const int maxLength = 32;
        [Required]
        [StringLength(maxLength)]
        public string ReasonReduceCode { get; set; }
        [Required]
        [StringLength(maxLength)]
        public string ReasonReduceName { get; set; }
        public ReasonReduce()
        {

        }
    }
}
