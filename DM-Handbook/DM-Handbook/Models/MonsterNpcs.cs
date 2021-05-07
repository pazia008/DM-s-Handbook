using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DM_Handbook.Models
{
    public class MonsterNpcs
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public int MonsterOrNpcTypeId { get; set; }

        [Required]
        [MaxLength(255)]
        public string? Name { get; set; }

        [Required]
        [MaxLength(255)]
        public string? Synopsis { get; set; }

        [Required]
        [MaxLength(255)]
        public string? Abilities { get; set; }

        public DateTime DateCreated { get; set; }

        public MonsterOrNpcType MonsterOrNpcTypes { get; set; }

        public AdventureMonsters AdventureMonsters { get; set; }

        

    }
}
