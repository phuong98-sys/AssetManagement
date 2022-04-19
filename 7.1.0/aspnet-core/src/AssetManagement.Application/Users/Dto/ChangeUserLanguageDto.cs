using System.ComponentModel.DataAnnotations;

namespace AssetManagement.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}