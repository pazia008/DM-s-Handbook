using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DM_Handbook.Models
{
    public class UserProfiles
    {
        public class UserProfile
        {
            public int Id { get; set; }

            [Required]
            [MaxLength(50)]
            public string Userame { get; set; }

            [Required]
            [MaxLength(50)]
            public string Email { get; set; }

            public string FirebaseId { get; set; }

        }
    }
}
