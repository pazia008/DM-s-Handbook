using System.Collections.Generic;
using DM_Handbook.Models;

namespace DM_Handbook.Repositories
{
    public interface ICampaignsRepository
    {
        List<Campaigns> GetAllByUserId(int userId);
        void Add(Campaigns campaigns);
    }
}