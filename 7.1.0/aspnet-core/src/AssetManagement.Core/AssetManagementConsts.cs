using AssetManagement.Debugging;

namespace AssetManagement
{
    public class AssetManagementConsts
    {
        public const string LocalizationSourceName = "AssetManagement";

        public const string ConnectionStringName = "Default";

        public const bool MultiTenancyEnabled = true;


        /// <summary>
        /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
        /// </summary>
        public static readonly string DefaultPassPhrase =
            DebugHelper.IsDebug ? "gsKxGZ012HLL3MI5" : "87f9cfba865247a0bf86e45458a86660";
    }
}
