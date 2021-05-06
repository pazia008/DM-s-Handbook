using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DM_Handbook.Models
{
    public class AdventureNotes
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public int CampaignId { get; set; }

        [Required]
        [MaxLength(255)]
        public string? Synopsis { get; set; }

        public DateTime DateCreated { get; set; }
        public Campaigns Campaigns { get; set; }
        public List<MonsterNpcs> MonsterNpcs { get; set; }
      
    }
}
