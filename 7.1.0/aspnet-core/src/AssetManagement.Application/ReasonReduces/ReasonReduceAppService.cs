using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using AssetManagement.ReasonReduces.DTO;
using AssetManagement.ReasonRuduces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManagement.ReasonReduces
{
    public class ReasonReduceAppService : AssetManagementAppServiceBase, IReasonReduceAppService
    {
        private readonly IRepository<ReasonReduce> _reasonReduceRepository;
        public ReasonReduceAppService(IRepository<ReasonReduce> reasonReduceRepository)
        {
            _reasonReduceRepository = reasonReduceRepository;
        }
        public async Task<ListResultDto<ReasonReduceDto>> GetReasonReduces()
        {
            try
            {
                var reasonReduces = await _reasonReduceRepository.GetAll().ToListAsync();
                var reasonReduceDtos = ObjectMapper.Map<List<ReasonReduceDto>>(reasonReduces);
                return new ListResultDto<ReasonReduceDto>(reasonReduceDtos);
            }
            catch (Exception e)
            {
                throw (e);

            }
        }
    }
    
       
    }
