using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DM_Handbook.Models
{
    public class AdventureCampaign
    {
        
       public AdventureNotes Notes { get; set; }

       public Campaigns Campaigns { get; set; }
       public MonsterNpcs MonsterNpcs { get; set; }
            
    }
}
