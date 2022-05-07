using Abp.AutoMapper;
using Abp.Domain.Entities;
using AssetManagement.ReasonRuduces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManagement.ReasonReduces.DTO
{
    [AutoMapFrom(typeof(ReasonReduce))]
    public class ReasonReduceDto : Entity
    {
        public int? Id { get; set; }
        public const int maxLength = 32;
        [Required]
        [StringLength(maxLength)]
        public string ReasonReduceCode { get; set; }
        [Required]
        [StringLength(maxLength)]
        public string ReasonReduceName { get; set; }
    }
}
