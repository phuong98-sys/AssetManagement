﻿using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using WS.MultiTenancy.Accounting.Dto;

namespace WS.MultiTenancy.Accounting
{
    public interface IInvoiceAppService
    {
        Task<InvoiceDto> GetInvoiceInfo(EntityDto<long> input);

        Task CreateInvoice(CreateInvoiceDto input);
    }
}
