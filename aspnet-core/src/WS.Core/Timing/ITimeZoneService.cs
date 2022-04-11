﻿using System.Threading.Tasks;
using Abp.Configuration;

namespace WS.Timing
{
    public interface ITimeZoneService
    {
        Task<string> GetDefaultTimezoneAsync(SettingScopes scope, int? tenantId);
    }
}
